import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    UsersIcon, 
    TruckIcon, 
    UserCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function AdminSidebar() {
    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
        { name: 'User Management', href: '/admin/users', icon: UsersIcon },
        { name: 'Car Management', href: '/admin/cars', icon: TruckIcon },
        { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
    ];

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            <div className="flex flex-col flex-grow bg-indigo-900 pt-16 pb-4 overflow-y-auto">
                <div className="flex items-center text-center justify-center flex-shrink-0 px-4 p-5">
                    <span className="text-2xl font-bold text-white">ABC Admin</span>
                </div>
                <nav className=" flex-1 flex flex-col divide-y divide-blue-800">
                    <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`${
                                    url.startsWith(item.href)
                                        ? 'bg-blue-800 text-white'
                                        : 'text-blue-100 hover:bg-blue-800'
                                } group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md`}
                            >
                                <item.icon className="mr-4 flex-shrink-0 h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
} 