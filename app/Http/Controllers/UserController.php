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
        $user = $request->user();

        return response()->json([
            'user' => $user,
            'roles' => $user ? [$user->role] : [],
        ]);
    }
}
