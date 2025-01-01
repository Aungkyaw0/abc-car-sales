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

    const STATUS_AVAILABLE = 'available';
    const STATUS_SOLD = 'sold';

    public function isAvailable()
    {
        return $this->status === self::STATUS_AVAILABLE;
    }

    public function markAsSold()
    {
        $this->update(['status' => self::STATUS_SOLD]);
    }

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

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function latestBid()
    {
        return $this->hasOne(Bid::class)->latestOfMany();
    }

    public function highestBid()
    {
        return $this->hasOne(Bid::class)->ofMany('amount', 'max');
    }
} 