<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = ['name', 'category'];

    public function cars()
    {
        return $this->belongsToMany(Car::class);
    }
} 