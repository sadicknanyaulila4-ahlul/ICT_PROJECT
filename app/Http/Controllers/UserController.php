<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get authenticated user profile
     */
    public function profile(Request $request)
    {
        $user = $request->user()->load('roles');

        return response()->json([
            'user' => $user,
            'roles' => $user->roles->pluck('name'),
        ]);
    }
}
