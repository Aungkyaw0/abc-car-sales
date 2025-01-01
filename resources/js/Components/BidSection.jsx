import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { formatCurrency } from '@/utils/index';
import { usePolling } from '@/hooks/usePolling';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { showNotification } from './Notifications';
import BidHistory from '@/Components/BidHistory';
import toast from 'react-hot-toast';

export default function BidSection({ car, currentHighestBid, userBids: initialBids }) {
    const [showBidHistory, setShowBidHistory] = useState(false);
    const { data: latestBids, loading } = usePolling(`/cars/${car.id}/bids`);
    const [bids, setBids] = useState(initialBids);
    const amountInputRef = useRef(null);
    
    useEffect(() => {
        if (latestBids) {
            setBids(latestBids);
        }
    }, [latestBids]);

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        note: ''
    });

    const minimumBid = useMemo(() => {
        return currentHighestBid 
            ? currentHighestBid.amount + 1 
            : Math.floor(car.price * 0.8);
    }, [currentHighestBid, car.price]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (Number(data.amount) < minimumBid) {
            showNotification.error(`Minimum bid amount is ${formatCurrency(minimumBid)}`);
            return;
        }

        post(`/cars/${car.id}/bids`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    const handleError = (error) => {
        showNotification.error(error);
        amountInputRef.current?.focus();
    };

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit(e);
        }
    }, [handleSubmit]);

    return (
        <div className="bg-white rounded-xl p-6 shadow-md space-y-6" role="region" aria-label="Place Bid">
            {/* Current Price and Highest Bid */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Asking Price</span>
                    <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(car.price)}
                    </span>
                </div>
                {currentHighestBid && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Highest Bid</span>
                        <span className="text-xl font-semibold text-green-600">
                            {formatCurrency(currentHighestBid.amount)}
                        </span>
                    </div>
                )}
            </div>

            {/* Bid Form */}
            <form 
                onSubmit={handleSubmit} 
                onKeyDown={handleKeyPress}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Bid Amount
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true">$</span>
                        <input
                            id="bid-amount"
                            ref={amountInputRef}
                            type="number"
                            value={data.amount}
                            onChange={e => setData('amount', e.target.value)}
                            className="pl-8 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter amount"
                            min={minimumBid}
                            aria-describedby={errors.amount ? "amount-error" : undefined}
                            required
                        />
                    </div>
                    {errors.amount && (
                        <p id="amount-error" className="mt-1 text-sm text-red-600" role="alert">{errors.amount}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note (Optional)
                    </label>
                    <textarea
                        value={data.note}
                        onChange={e => setData('note', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        placeholder="Add a note to your bid..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                    hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Placing Bid...' : 'Place Bid'}
                </button>
            </form>

            {/* Bid History Toggle */}
            <button
                onClick={() => setShowBidHistory(!showBidHistory)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg 
                hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
            >
                {showBidHistory ? 'Hide Bid History' : 'Show Bid History'}
            </button>

            {/* Bid History */}
            {showBidHistory && <BidHistory bids={bids} loading={loading} />}
        </div>
    );
} 