import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import InputError from '@/Components/InputError';

export default function AppointmentBooking({ carId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_date: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/cars/${carId}/appointments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Schedule Test Drive
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Preferred Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            value={data.appointment_date}
                            onChange={e => setData('appointment_date', e.target.value)}
                            min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        <InputError message={errors.appointment_date} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Notes (Optional)
                        </label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Any specific questions or requests..."
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {processing ? 'Requesting...' : 'Request Test Drive'}
                    </button>
                </div>
            </form>
        </div>
    );
} 