import React from 'react';
import { Link } from '@inertiajs/react';
import { formatCurrency } from '@/utils/format';

export default function RecentListings({ listings }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Listings</h2>
                <Link 
                    href="/cars" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    View all
                </Link>
            </div>
            
            <div className="space-y-4">
                {listings.map((listing) => (
                    <Link 
                        key={listing.id} 
                        href={`/cars/${listing.id}`}
                        className="block group"
                    >
                        <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                <img 
                                    src={`/storage/${listing.images[0]?.image_path}`}
                                    alt={listing.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <div className="flex-grow min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {listing.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {listing.make} {listing.model} • {listing.year}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <p className="text-sm font-medium text-blue-600">
                                    {formatCurrency(listing.price)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 