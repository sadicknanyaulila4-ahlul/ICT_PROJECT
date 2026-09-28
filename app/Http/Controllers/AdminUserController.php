<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    private const ROLES = ['admin', 'analyst', 'supervisor', 'manager', 'dict'];

    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::query()->select('id', 'name', 'email', 'role', 'created_at')->latest()->get(),
            'roles' => self::ROLES,
            'projects' => Project::query()
                ->with(['supervisor:id,name,email', 'analyst:id,name,email'])
                ->select('id', 'name', 'phase', 'status', 'supervisor_id', 'assigned_analyst_id')
                ->latest()
                ->get(),
            'supervisors' => User::query()->where('role', 'supervisor')->select('id', 'name', 'email')->orderBy('name')->get(),
            'analysts' => User::query()->where('role', 'analyst')->select('id', 'name', 'email')->orderBy('name')->get(),
        ]);
    }

    public function assignSupervisor(Request $request, Project $project)
    {
        $data = $request->validate(['supervisor_id' => ['required', 'exists:users,id']]);
        abort_unless(User::whereKey($data['supervisor_id'])->where('role', 'supervisor')->exists(), 422, 'The selected user must have the supervisor role.');

        $project->update(['supervisor_id' => $data['supervisor_id']]);

        return back()->with('success', 'Project Supervisor assigned successfully.');
    }

    public function assignAnalyst(Request $request, Project $project)
    {
        $data = $request->validate(['assigned_analyst_id' => ['required', 'exists:users,id']]);
        abort_unless(User::whereKey($data['assigned_analyst_id'])->where('role', 'analyst')->exists(), 422, 'The selected user must have the analyst role.');

        $project->update(['assigned_analyst_id' => $data['assigned_analyst_id'], 'status' => 'Ongoing']);

        return back()->with('success', 'Project Analyst assigned successfully.');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', 'in:admin,analyst,supervisor,manager,dict'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create($data);

        return back()->with('success', 'User account created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'role' => ['required', 'in:admin,analyst,supervisor,manager,dict'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if (blank($data['password'])) {
            unset($data['password']);
        }

        if ($user->id === $request->user()?->id && ($data['role'] ?? $user->role) !== 'admin') {
            return back()->withErrors(['role' => 'You cannot remove your own administrator role.']);
        }

        $user->update($data);

        return back()->with('success', 'User account updated successfully.');
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->id === $request->user()?->id) {
            return back()->withErrors(['user' => 'You cannot delete your own administrator account.']);
        }

        $user->delete();

        return back()->with('success', 'User account removed successfully.');
    }
}
