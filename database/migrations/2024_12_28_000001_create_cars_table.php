<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->decimal('price', 10, 2);
            $table->integer('mileage');
            $table->enum('condition', ['new', 'used']);
            $table->enum('transmission', ['automatic', 'manual']);
            $table->enum('fuel_type', ['petrol', 'diesel', 'electric', 'hybrid']);
            $table->text('description');
            $table->enum('status', ['active', 'sold', 'draft'])->default('active');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cars');
    }
}; 