import React from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardNavbar from '@/Components/Dashboard/DashboardNavbar';
import FlashMessage from '@/Components/FlashMessage';

export default function DashboardLayout({ children, title, breadcrumbs = [] }) {
    const defaultBreadcrumbs = [
        { name: 'Dashboard', href: '/dashboard' },
        ...(title ? [{ name: title }] : []),
        ...(breadcrumbs || [])
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar className="fixed inset-y-0 left-0 w-64" />

                <div className="flex-1 ml-64">
                    <DashboardNavbar 
                        user={usePage().props.auth.user}
                        breadcrumbs={defaultBreadcrumbs}
                    />
                    
                    <main className="p-8 pt-24">
                        {children}
                    </main>
                </div>
            </div>
            <FlashMessage />
        </div>
    );
} 