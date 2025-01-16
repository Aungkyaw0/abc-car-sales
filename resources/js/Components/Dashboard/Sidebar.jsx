import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    TruckIcon, 
    UserGroupIcon,
    CalendarIcon,
    ChartBarIcon,
    CogIcon,
    PlusCircleIcon,
    CheckCircleIcon,
    ListBulletIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
    const { url } = usePage();

    const isCurrentRoute = (path) => {
        return url.startsWith(path);
    };

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: HomeIcon },
        { 
            name: 'Car Management',
            icon: TruckIcon,
            submenu: [
                { name: 'My Car Listings', href: '/dashboard/cars/my-listings', icon: ListBulletIcon },
                { name: 'Add New Car', href: '/cars/create', icon: PlusCircleIcon },
                { name: 'Sold Cars', href: '/dashboard/cars/sold', icon: CheckCircleIcon },
                { name: 'Bids', href: '/dashboard/bids' },
            ]
        },
        {
            name: 'Appointments',
            icon: CalendarIcon,
            submenu: [
                { name: 'Appointments', href: '/dashboard/appointments' },
            ]
        }
        
    ];

    return (
        <div className="h-screen w-72 bg-gray-900 fixed left-0 top-0 flex flex-col">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 px-4">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            ABC Cars
                        </Link>
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navigation.map((item) => !item.submenu ? (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                                    isCurrentRoute(item.href)
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                                        isCurrentRoute(item.href)
                                            ? 'text-white'
                                            : 'text-gray-300 group-hover:text-white'
                                    }`}
                                />
                                {item.name}
                            </Link>
                        ) : (
                            <div key={item.name} className="space-y-1">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    {item.name}
                                </div>
                                {item.submenu.map((subitem) => (
                                    <Link
                                        key={subitem.name}
                                        href={subitem.href}
                                        className={`group flex items-center pl-10 pr-2 py-2 text-medium rounded-lg transition-colors duration-200 ${
                                            isCurrentRoute(subitem.href.split('?')[0])
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        {subitem.icon && (
                                            <subitem.icon 
                                                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                                                    isCurrentRoute(subitem.href.split('?')[0])
                                                        ? 'text-white'
                                                        : 'text-gray-300 group-hover:text-white'
                                                }`}
                                            />
                                        )}
                                        {subitem.name}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
} 