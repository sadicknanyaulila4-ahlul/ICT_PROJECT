<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $tickets = SupportTicket::with(['user', 'replier'])
                ->latest()
                ->get();

            return Inertia::render('Support', [
                'tickets' => $tickets,
                'isAdmin' => true,
            ]);
        }

        $tickets = SupportTicket::where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Support', [
            'tickets' => $tickets,
            'isAdmin' => false,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // Admin haandiki challenge - ana reply tu
        if ($user->role === 'admin') {
            return back()->withErrors(['message' => 'Admin huwezi kuandika changamoto. Unaweza tu kujibu changamoto za watumiaji.']);
        }

        // Users wote lazima watumie active email
        if (empty($user->email) || ! filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
            return back()->withErrors(['email' => 'Tumia active email sahihi ili kutuma changamoto. Sasisha profile yako kwanza.']);
        }

        $validated = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'priority' => ['required', 'in:Low,Normal,High,Urgent'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        SupportTicket::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'category' => $validated['category'],
            'priority' => $validated['priority'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'Open',
        ]);

        return back()->with('success', 'Changamoto yako imetumwa kwenye Support Desk.');
    }

    public function reply(Request $request, SupportTicket $ticket)
    {
        $user = $request->user();

        abort_unless($user->role === 'admin', 403, 'Only admin can reply.');

        $validated = $request->validate([
            'admin_reply' => ['required', 'string', 'max:5000'],
            'status' => ['nullable', 'in:Open,In Progress,Resolved,Closed'],
        ]);

        $ticket->update([
            'admin_reply' => $validated['admin_reply'],
            'status' => $validated['status'] ?? 'Resolved',
            'replied_by' => $user->id,
            'replied_at' => now(),
        ]);

        // Mjulishe user kupitia notifications - isiharibu reply hata notification ikifeli
        if ($ticket->user_id) {
            try {
                Notification::create([
                    'user_id' => $ticket->user_id,
                    'project_id' => null,
                    'title' => 'Support Desk: Jibu la changamoto yako',
                    'message' => "Admin amejibu changamoto '{$ticket->subject}': {$validated['admin_reply']}",
                    'type' => 'Status Update',
                    'status' => 'Unread',
                    'action_url' => '/support',
                ]);
            } catch (\Throwable $e) {
                \Log::warning('Support reply notification failed: '.$e->getMessage());
            }
        }

        return back()->with('success', 'Jibu limetumwa kwa user.');
    }

    /**
     * Need Help ya wageni (kabla ya login) - inaingia kama challenge kwa admin.
     */
    public function needHelp()
    {
        return Inertia::render('Auth/NeedHelp');
    }

    public function submitNeedHelp(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $ticket = SupportTicket::create([
            'user_id' => null,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'category' => 'Login / Account (Need Help)',
            'priority' => 'High',
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'Open',
            'is_need_help' => true,
        ]);

        // Taarifa kwa admin wote kama notification - isiharibu submit hata ikifeli
        try {
            $admins = User::where('role', 'admin')->get();
            foreach ($admins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'project_id' => null,
                    'title' => 'Need Help: changamoto mpya',
                    'message' => "Mgeni {$ticket->name} ({$ticket->email}): {$ticket->subject}",
                    'type' => 'Status Update',
                    'status' => 'Unread',
                    'action_url' => '/support',
                ]);
            }
        } catch (\Throwable $e) {
            \Log::warning('Need-help notification failed: '.$e->getMessage());
        }

        return back()->with('success', 'Taarifa yako imetumwa kwa administrator. Tafadhali subiri jibu kupitia email yako.');
    }
}
