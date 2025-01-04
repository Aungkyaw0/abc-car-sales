import React from 'react';
import { 
    UserGroupIcon, 
    TruckIcon, 
    ChartBarIcon, 
    ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const icons = {
    users: UserGroupIcon,
    car: TruckIcon,
    chart: ChartBarIcon,
    shield: ShieldCheckIcon
};

export default function StatCard({ title, value, icon, className = '' }) {
    const IconComponent = icons[icon];

    return (
        <div className={`rounded-xl p-6 text-white ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-80">{title}</p>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
                {IconComponent && (
                    <IconComponent className="w-8 h-8 opacity-80" />
                )}
            </div>
        </div>
    );
} 