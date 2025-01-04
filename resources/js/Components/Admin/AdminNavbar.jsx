import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import AdminSidebar from '@/Components/Admin/AdminSidebar';

export default function AdminNavbar({ title, breadcrumbs = [] }) {
    const { auth } = usePage().props;
    const defaultBreadcrumbs = [
        { name: 'Admin', href: '/admin/dashboard' },
        ...(title ? [{ name: title }] : []),
        ...(breadcrumbs || [])
    ];

    return (
        <>
        <nav className="bg-white border-b border-gray-200 fixed w-full z-40 top-0 h-16 mb-60">
            <div className="max-w-full h-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-full justify-between items-center">
                    {/* Left side */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 
                            hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 
                            focus:ring-inset focus:ring-blue-500"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        
                        {/* Breadcrumbs */}
                        <nav className="hidden sm:flex ml-4" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-4">
                                {defaultBreadcrumbs.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        {index !== 0 && (
                                            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                            </svg>
                                        )}
                                        <div className={`flex items-center ${index !== 0 ? 'ml-4' : ''}`}>
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                                >
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-700">
                                                    {item.name}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-6">
                        {/* Notifications */}
                        <button
                            type="button"
                            className="relative rounded-full p-1.5 text-gray-400 hover:bg-gray-100 
                            hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                            focus:ring-offset-2"
                        >
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 
                            flex items-center justify-center">
                                <span className="text-xs text-white">3</span>
                            </span>
                            <BellIcon className="h-6 w-6" />
                        </button>

                        {/* User Menu */}
                        <div className="relative flex items-center">
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-medium text-gray-700">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Administrator
                                    </span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <UserCircleIcon className="h-6 w-6 text-gray-600" />
                                </div>
                                <Link 
                                    href="/logout" 
                                    method="post" 
                                    as="button"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-700 
                                    hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-150"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <AdminSidebar />
        </>
    );
}

AdminNavbar.layout = page => page; 