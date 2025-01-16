import React from 'react';
import { Link } from '@inertiajs/react';
import { formatCurrency } from '@/utils/format';
import { formatDistanceToNow } from 'date-fns';

export default function BidsPlaced({ bids }) {
    const getBidStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
                                    Listed by {bid.car.user.name}
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className="text-lg font-medium text-gray-900">
                                        Your Bid: {formatCurrency(bid.amount)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBidStatusColor(bid.status)}`}>
                                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                    </span>
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
                    You haven't placed any bids yet.
                </div>
            )}
        </div>
    );
} 