<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@abc-cars.com',
            'password' => Hash::make('13321983'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
} 