<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminAuthController extends Controller
{
    public function login(Request $request) {
        // Validate login request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // Attempt to log in the admin
        if (Auth::attempt($credentials)) {
            // Authentication passed
            $user = Auth::user();
            $token = $user->createToken('AdminToken')->plainTextToken;
            
            return response()->json(['token' => $token], 200);
        } else {
            // Authentication failed
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
    public function logout(Request $request) {
        // Revoke current user's token
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
