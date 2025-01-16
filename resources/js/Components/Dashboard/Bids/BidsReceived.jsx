import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { formatCurrency } from '@/utils/format';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function BidsReceived({ bids }) {
    const { post, processing } = useForm();

    const handleBidAction = (bidId, action) => {
        post(`/bids/${bidId}/${action}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Bid ${action}ed successfully`);
            },
            onError: () => {
                toast.error(`Failed to ${action} bid`);
            }
        });
    };

    return (
        <div className="divide-y divide-gray-200">
            {bids.length > 0 ? (
                bids.map((bid) => (
                    <div key={bid.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-6">
                            {/* Car Image */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                <img
                                    src={`/storage/${bid.car.images[0]?.image_path}`}
                                    alt={bid.car.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Bid Details */}
                            <div className="flex-grow">
                                <Link 
                                    href={`/cars/${bid.car.id}`}
                                    className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                                >
                                    {bid.car.title}
                                </Link>
                                <div className="mt-1 text-sm text-gray-500">
                                    Bid by {bid.user.name}
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className="text-lg font-medium text-gray-900">
                                        Bid Amount: {formatCurrency(bid.amount)}
                                    </span>
                                    {bid.status === 'pending' ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleBidAction(bid.id, 'accept')}
                                                disabled={processing}
                                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleBidAction(bid.id, 'reject')}
                                                disabled={processing}
                                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                        </span>
                                    )}
                                </div>
                                {bid.note && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Note: {bid.note}
                                    </p>
                                )}
                            </div>

                            {/* Timestamp */}
                            <div className="flex-shrink-0 text-sm text-gray-500">
                                {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-6 text-center text-gray-500">
                    You haven't received any bids yet.
                </div>
            )}
        </div>
    );
} 