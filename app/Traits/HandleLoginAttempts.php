<?php

namespace App\Traits;

use Carbon\Carbon;

trait HandleLoginAttempts
{
    protected function incrementLoginAttempts($user)
    {
        $user->increment('failed_login_attempts');
        
        if ($user->failed_login_attempts >= 5) {
            $user->update([
                'locked_until' => now()->addMinutes(5),
                'failed_login_attempts' => 0
            ]);
        }
    }

    protected function resetLoginAttempts($user)
    {
        $user->update([
            'failed_login_attempts' => 0,
            'locked_until' => null
        ]);
    }

    protected function isLockedOut($user)
    {
        if ($user && $user->locked_until && now()->lt($user->locked_until)) {
            return true;
        }
        return false;
    }
} 