import React from 'react';
import { CurrencyDollarIcon, UserGroupIcon, ChartBarIcon, TruckIcon } from '@heroicons/react/24/outline';

const icons = {
    currency: CurrencyDollarIcon,
    users: UserGroupIcon,
    chart: ChartBarIcon,
    car: TruckIcon
};

export default function StatCard({ title, value, change, icon }) {
    const Icon = icons[icon];
    const isPositive = change >= 0;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {typeof value === 'number' && icon === 'currency' ? `$${value.toLocaleString()}` : value.toLocaleString()}
                    </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                </div>
            </div>
            <div className="mt-4">
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-600 ml-2">from last month</span>
            </div>
        </div>
    );
} 