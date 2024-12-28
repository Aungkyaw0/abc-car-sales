<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'condition',
        'transmission',
        'fuel_type',
        'description',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(CarImage::class);
    }

    public function primaryImage()
    {
        return $this->hasOne(CarImage::class)->where('is_primary', true);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }
} 