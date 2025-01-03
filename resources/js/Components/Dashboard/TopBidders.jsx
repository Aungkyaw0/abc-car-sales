import React from 'react';
import { formatCurrency } from '@/utils/format';

export default function TopBidders({ bidders }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Bidders</h2>
            
            <div className="space-y-4">
                {bidders.map((bidder, index) => (
                    <div 
                        key={bidder.id}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                    ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                                      index === 1 ? 'bg-gray-100 text-gray-800' :
                                      index === 2 ? 'bg-orange-100 text-orange-800' :
                                      'bg-blue-100 text-blue-800'}
                                `}>
                                    #{index + 1}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {bidder.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {bidder.total_bids} bids
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {formatCurrency(bidder.total_amount)}
                            </p>
                            <p className="text-xs text-gray-500">
                                avg: {formatCurrency(bidder.average_bid)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 