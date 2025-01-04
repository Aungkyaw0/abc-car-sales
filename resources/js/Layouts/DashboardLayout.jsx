import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardNavbar from '@/Components/Dashboard/DashboardNavbar';
import FlashMessage from '@/Components/FlashMessage';

export default function DashboardLayout({ children, title, breadcrumbs = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const defaultBreadcrumbs = [
        { name: 'Dashboard', href: '/dashboard' },
        ...(title ? [{ name: title }] : []),
        ...(breadcrumbs || [])
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Navbar */}
                <DashboardNavbar 
                    user={usePage().props.auth.user}
                    breadcrumbs={defaultBreadcrumbs}
                    onMenuClick={() => setSidebarOpen(true)}
                    className="fixed top-0 right-0 left-0 lg:left-64"
                />

                {/* Main Content Area */}
                <main className="flex-1 mt-16">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>

            <FlashMessage />
        </div>
    );
} 