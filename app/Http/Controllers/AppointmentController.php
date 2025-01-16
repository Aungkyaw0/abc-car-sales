<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $requestedAppointments = Appointment::with(['car.images', 'buyer'])
            ->where('seller_id', $user->id)
            ->latest()
            ->get();

        $myAppointments = Appointment::with(['car.images', 'seller'])
            ->where('buyer_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Appointments/Index', [
            'requestedAppointments' => $requestedAppointments,
            'myAppointments' => $myAppointments
        ]);
    }

    public function store(Request $request, Car $car)
    {
        $validated = $request->validate([
            'appointment_date' => ['required', 'date', 'after:now'],
            'notes' => ['nullable', 'string', 'max:500']
        ]);

        // Check for existing appointments at the same time
        $existingAppointment = Appointment::where('car_id', $car->id)
            ->where('appointment_date', $validated['appointment_date'])
            ->exists();

        if ($existingAppointment) {
            return back()->withErrors([
                'appointment_date' => 'This time slot is already booked.'
            ]);
        }

        Appointment::create([
            'car_id' => $car->id,
            'buyer_id' => auth()->id(),
            'seller_id' => $car->user_id,
            'appointment_date' => $validated['appointment_date'],
            'notes' => $validated['notes'],
            'status' => 'pending'
        ]);

        return back()->with('success', 'Test drive appointment requested successfully.');
    }

    public function updateStatus(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:accepted,rejected'],
            'response_message' => ['nullable', 'string', 'max:500']
        ]);

        $appointment->update($validated);

        return back()->with('success', 'Appointment status updated successfully.');
    }

    public function requested()
    {
        $requestedAppointments = Appointment::with(['car.images', 'buyer'])
            ->where('seller_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Appointments/Index', [
            'requestedAppointments' => $requestedAppointments,
            'myAppointments' => []
        ]);
    }

    public function myAppointments()
    {
        $myAppointments = Appointment::with(['car.images', 'seller'])
            ->where('buyer_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Appointments/Index', [
            'requestedAppointments' => [],
            'myAppointments' => $myAppointments
        ]);
    }
} 