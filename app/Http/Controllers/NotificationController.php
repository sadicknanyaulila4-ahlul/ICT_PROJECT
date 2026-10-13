<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function page(Request $request)
    {
        return Inertia::render('Notifications', [
            'users' => User::query()
                ->whereKeyNot($request->user()->id)
                ->orderBy('name')
                ->get(['id', 'name', 'role']),
        ]);
    }

    /**
     * Get all notifications for authenticated user
     */
    public function index(Request $request)
    {
        $userId = $request->user()?->id;
        $query = Notification::where('user_id', $userId);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $notifications = $query->with('sender:id,name')->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => Notification::where('user_id', $userId)
                ->where('status', 'Unread')
                ->count(),
        ]);
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'recipient_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id'),
                Rule::notIn([$request->user()->id]),
            ],
            'title' => 'required|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        $notification = Notification::create([
            'project_id' => null,
            'user_id' => $validated['recipient_id'],
            'sender_id' => $request->user()->id,
            'title' => $validated['title'],
            'message' => $validated['message'],
            'type' => 'User Message',
            'status' => 'Unread',
        ]);

        return response()->json([
            'message' => 'Notification sent successfully.',
            'notification' => $notification,
        ], 201);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Request $request, Notification $notification)
    {
        // Check if notification belongs to authenticated user
        if ($notification->user_id !== $request->user()?->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $notification->markAsRead();

        return response()->json([
            'message' => 'Notification marked as read',
            'notification' => $notification,
        ]);
    }
}
