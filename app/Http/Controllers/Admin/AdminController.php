<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Traits\HandleLoginAttempts;

class AdminController extends Controller
{
    use HandleLoginAttempts;

    public function loginForm()
    {
        return Inertia::render('Admin/Login');
    }

    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_cars' => Car::count(),
            'active_listings' => Car::where('status', 'active')->count(),
            'total_admins' => User::where('role', 'admin')->count(),
            
            'cars_by_make' => Car::select('make', DB::raw('count(*) as count'))
                ->groupBy('make')
                ->orderByDesc('count')
                ->limit(5)
                ->get(),
                
            'monthly_listings' => Car::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('count(*) as count')
            )
                ->groupBy('month')
                ->orderBy('month')
                ->limit(6)
                ->get(),
                
            'price_ranges' => [
                'budget' => Car::where('price', '<', 10000)->count(),
                'mid_range' => Car::whereBetween('price', [10000, 30000])->count(),
                'luxury' => Car::where('price', '>', 30000)->count(),
            ],
                
            'status_distribution' => Car::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->get()
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
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
            $user = Auth::user();
            
            if ($user->role !== 'admin') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'These credentials do not have admin access.',
                ]);
            }

            $this->resetLoginAttempts($user);
            $request->session()->regenerate();
            return redirect()->intended('/admin/dashboard');
        }

        if ($user) {
            $this->incrementLoginAttempts($user);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
} 