<?php

namespace App\Notifications;

use App\Models\Bid;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewBidNotification extends Notification
{
    use Queueable;

    protected $bid;

    public function __construct(Bid $bid)
    {
        $this->bid = $bid;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Bid on Your Car')
            ->line('A new bid has been placed on your car: ' . $this->bid->car->title)
            ->line('Bid Amount: $' . number_format($this->bid->amount, 2))
            ->line('Bidder: ' . $this->bid->user->name)
            ->action('View Bid', url('/cars/' . $this->bid->car_id))
            ->line('Thank you for using ABC Car Sales!');
    }

    public function toArray($notifiable)
    {
        return [
            'bid_id' => $this->bid->id,
            'car_id' => $this->bid->car_id,
            'amount' => $this->bid->amount,
            'bidder_name' => $this->bid->user->name,
        ];
    }
} 