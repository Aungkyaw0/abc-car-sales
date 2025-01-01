import { Line } from 'react-chartjs-2';
import { formatCurrency } from '@/utils/index';
export default function BidAnalytics({ bids }) {
    const bidData = {
        labels: bids.map(bid => new Date(bid.created_at).toLocaleDateString()),
        datasets: [{
            label: 'Bid Amounts',
            data: bids.map(bid => bid.amount),
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.1
        }]
    };

    const highestBid = Math.max(...bids.map(bid => bid.amount));
    const averageBid = bids.reduce((acc, bid) => acc + bid.amount, 0) / bids.length;
    const totalBids = bids.length;

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Bid Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600">Highest Bid</p>
                    <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(highestBid)}
                    </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600">Average Bid</p>
                    <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(averageBid)}
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-600">Total Bids</p>
                    <p className="text-2xl font-bold text-purple-900">
                        {totalBids}
                    </p>
                </div>
            </div>

            <div className="h-64">
                <Line data={bidData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => formatCurrency(value)
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
} 