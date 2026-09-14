<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        ]);
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
