import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatCard from '@/Components/Dashboard/StatCard';
import RecentListings from '@/Components/Dashboard/RecentListings';
import BidActivityChart from '@/Components/Dashboard/BidActivityChart';
import { Link } from '@inertiajs/react';
import { formatCurrency } from '@/utils/format';

export default function Index({ stats = {}, bidActivity = [], myListings = [], myBids = [] }) {
    return (
        <DashboardLayout title="Overview">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="My Active Listings" 
                    value={stats.myActiveListings || 0} 
                    change={stats.listingsChange || 0}
                    icon="car"
                    className="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard 
                    title="My Total Bids" 
                    value={stats.myTotalBids || 0} 
                    change={stats.bidsChange || 0}
                    icon="chart"
                    className="bg-gradient-to-br from-green-500 to-green-600"
                />
                <StatCard 
                    title="Sold Cars" 
                    value={stats.soldCars || 0} 
                    change={stats.soldCarsChange || 0}
                    icon="currency"
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600"
                />
            </div>

            {/* Charts Grid */}
            <div className="mb-8">
                <BidActivityChart data={bidActivity} />
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentListings 
                    listings={myListings} 
                    title="My Recent Listings"
                    viewAllLink="/dashboard/cars/my-listings"
                />
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">My Recent Bids</h2>
                        <Link 
                            href="/dashboard/bids" 
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {myBids.map((bid) => (
                            <Link 
                                key={bid.id} 
                                href={`/cars/${bid.car.id}`}
                                className="block group"
                            >
                                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">
                                            {bid.car.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Bid Amount: {formatCurrency(bid.amount)}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Ensure layout is not wrapped again
Index.layout = page => page; 