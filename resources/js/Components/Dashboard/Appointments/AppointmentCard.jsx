import React, { useState } from 'react';
import { format } from 'date-fns';
import ResponseModal from './ResponseModal';

export default function AppointmentCard({ appointment, onStatusUpdate, isSeller }) {
    const [showResponseModal, setShowResponseModal] = useState({
        show: false,
        action: null
    });

    console.log("PPPPP: " +showResponseModal.action);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <img 
                            src={`/storage/${appointment.car.images[0]?.image_path}`}
                            alt={appointment.car.title}
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            {appointment.car.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {format(new Date(appointment.appointment_date), 'PPP p')}
                        </p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status]}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">
                        {isSeller ? 'Buyer' : 'Seller'}: {isSeller ? appointment.buyer.name : appointment.seller.name}
                    </p>
                    {appointment.notes && (
                        <p className="mb-2">Notes: {appointment.notes}</p>
                    )}
                    {appointment.response_message && (
                        <p className="mb-2">Response: {appointment.response_message}</p>
                    )}
                </div>

                {isSeller && appointment.status === 'pending' && (
                    <div className="mt-4 flex space-x-3">
                        <button
                            onClick={() => setShowResponseModal({ show: true, action: 'accepted' })}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => setShowResponseModal({ show: true, action: 'rejected' })}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Reject
                        </button>
                    </div>
                )}

                <ResponseModal 
                    isOpen={showResponseModal.show}
                    closeModal={() => setShowResponseModal({ show: false, action: null })}
                    appointment={appointment}
                    action={showResponseModal.action}
                />
            </div>
        </div>
    );
} 