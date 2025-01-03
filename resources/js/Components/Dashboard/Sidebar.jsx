import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    HomeIcon,
    TruckIcon,
    ChartBarIcon,
    CogIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    ListBulletIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ user }) {
    const [isCarMenuOpen, setIsCarMenuOpen] = useState(false);

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: HomeIcon },
        {
            name: 'Car Management',
            icon: TruckIcon,
            children: [
                { name: 'My Car Listings', href: '/dashboard/cars/my-listings', icon: ListBulletIcon },
                { name: 'Add New Car', href: '/cars/create', icon: PlusCircleIcon },
                { name: 'Sold Cars', href: '/dashboard/cars/sold', icon: CheckCircleIcon },
            ]
        },
        { name: 'My Bids', href: '/dashboard/bids', icon: ChartBarIcon },
        { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
    ];

    return (
        <div className="h-screen w-64 bg-gray-900 fixed left-0 top-0 flex flex-col">
            <div className="px-6 py-8">
                <Link href="/" className="text-2xl font-bold text-white flex items-center">
                    <span className="text-blue-500">ABC</span>
                    <span className="ml-2">Dashboard</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => (
                    item.children ? (
                        <div key={item.name}>
                            <button
                                onClick={() => setIsCarMenuOpen(!isCarMenuOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                            >
                                <div className="flex items-center">
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </div>
                                <ChevronDownIcon 
                                    className={`w-4 h-4 transition-transform duration-200 ${isCarMenuOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {isCarMenuOpen && (
                                <div className="pl-6 mt-2 space-y-2">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className="flex items-center px-4 py-2 text-md text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                                        >
                                            <child.icon className="w-5 h-5 mr-2" />
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200
                                ${window.location.pathname === item.href ? 'bg-gray-800 text-white' : ''}`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    )
                ))}
            </nav>
        </div>
    );
} 