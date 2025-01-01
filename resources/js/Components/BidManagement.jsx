import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { formatCurrency, formatDistanceToNow } from '@/utils/index';
import { usePolling } from '@/hooks/usePolling';
import axios from 'axios';
import { showNotification } from './Notifications';
import LoadingSpinner from '@/Components/LoadingSpinner';

export default function BidManagement({ car, initialBids = [] }) {
    const { data: latestBids, loading, error } = usePolling(`/cars/${car.id}/bids`, 3000);
    const [bids, setBids] = useState(initialBids || []);
    const [optimisticBids, setOptimisticBids] = useState(initialBids || []);
    const { post, processing } = useForm();

    useEffect(() => {
        if (latestBids) {
            setBids(latestBids);
            setOptimisticBids(latestBids);
        }
    }, [latestBids]);

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-red-600 text-center">Failed to load bids. Please refresh the page.</p>
            </div>
        );
    }

    if (loading && !bids.length) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <LoadingSpinner />
            </div>
        );
    }

    const handleBidAction = (bidId, action) => {
        // Optimistic update
        setOptimisticBids(currentBids => 
            currentBids.map(bid => 
                bid.id === bidId ? { ...bid, status: action === 'accept' ? 'accepted' : 'rejected' } : bid
            )
        );

        post(`/bids/${bidId}/${action}`, {
            preserveScroll: true,
            onSuccess: () => {
                showNotification.success(`Bid ${action}ed successfully`);
                // Server update will come through polling
            },
            onError: () => {
                showNotification.error(`Failed to ${action} bid`);
                // Revert optimistic update
                setOptimisticBids(bids);
            }
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Bids</h2>
            
            <div className="space-y-4">
                {optimisticBids.length > 0 ? (
                    optimisticBids.map((bid) => (
                        <div 
                            key={bid.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {formatCurrency(bid.amount)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        by {bid.user.name} • {formatDistanceToNow(new Date(bid.created_at))}
                                    </p>
                                    {bid.note && (
                                        <p className="text-sm text-gray-600 mt-2">{bid.note}</p>
                                    )}
                                </div>
                                
                                {bid.status === 'pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleBidAction(bid.id, 'accept')}
                                            disabled={processing}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleBidAction(bid.id, 'reject')}
                                            disabled={processing}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">No bids received yet</p>
                )}
            </div>
        </div>
    );
} 