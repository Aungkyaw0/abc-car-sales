<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->dateTime('appointment_date');
            $table->string('status')->default('pending'); // pending, accepted, rejected
            $table->text('notes')->nullable(); // Buyer's message/notes
            $table->text('response_message')->nullable(); // Seller's response message
            $table->timestamps();

            // Prevent duplicate appointments
            $table->unique(['car_id', 'appointment_date']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}; 