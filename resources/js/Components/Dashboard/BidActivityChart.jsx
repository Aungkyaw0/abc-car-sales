import React from 'react';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    Bar,
    ResponsiveContainer
} from 'recharts';

export default function BidActivityChart({ data }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bid Activity</h2>
            <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip 
                            labelFormatter={(value) => `Bids: ${value}`}
                        />
                        <Bar dataKey="count" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 