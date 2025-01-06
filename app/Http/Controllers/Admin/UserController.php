<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::query()
                ->latest()
                ->paginate(7)
                ->through(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'address' => $user->address,
                    'role' => $user->role,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at
                ])
                ->withQueryString()
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'role' => 'required|in:user,admin',
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        // Delete related records first
        $user->cars()->delete();
        $user->bids()->delete();
        
        // Finally delete the user
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully');
    }
} 