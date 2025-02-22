<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;    
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Traits\HandleLoginAttempts;
class AuthController extends Controller
{
    use HandleLoginAttempts;
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'profile_image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile-images', 'public');
            $validated['profile_image'] = $path;
        }

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->intended('/login')
            ->with('success', 'Registration successful! Please login to continue.');
    }

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if ($this->isLockedOut($user)) {
            $remainingTime = now()->diffInMinutes($user->locked_until);
            return back()->withErrors([
                'email' => "Account is locked. Please try again in {$remainingTime} minutes."
            ]);
        }

        if (Auth::attempt($credentials)) {
            $this->resetLoginAttempts($user);
            $request->session()->regenerate();

            return redirect()->intended('/')
                ->with('success', 'Welcome back!');
        }

        if ($user) {
            $this->incrementLoginAttempts($user);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}