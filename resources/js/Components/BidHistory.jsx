import { formatCurrency } from '@/utils';
import { format } from 'date-fns';
import LoadingSpinner from '@/Components/LoadingSpinner';
import BidHistorySkeleton from './BidHistorySkeleton';

export default function BidHistory({ bids, loading = false }) {
    if (loading) {
        return <BidHistorySkeleton />;
    }

    const getBidStatusStyle = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return styles[status] || styles.pending;
    };

    return (
        <div className="space-y-4" role="region" aria-label="Bid History">
            <h3 className="font-semibold text-gray-900" id="bid-history-title">Bid History</h3>
            <div className="space-y-2" aria-labelledby="bid-history-title">
                {bids.length > 0 ? (
                    bids.map((bid) => (
                        <div 
                            key={bid.id} 
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            role="article"
                            aria-label={`Bid by ${bid.user.name}`}
                        >
                            <div className="space-y-1">
                                <p className="font-medium text-gray-900">
                                    {formatCurrency(bid.amount)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {format(new Date(bid.created_at), 'MMM d, yyyy h:mm a')}
                                </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBidStatusStyle(bid.status)}`}>
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4" role="status">No bids yet</p>
                )}
            </div>
        </div>
    );
} 