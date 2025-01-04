import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Dashboard/StatCard';

export default function Dashboard({ stats }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Users" 
                    value={stats.total_users}
                    icon="users"
                    className="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard 
                    title="Total Cars" 
                    value={stats.total_cars}
                    icon="car"
                    className="bg-gradient-to-br from-green-500 to-green-600"
                />
                <StatCard 
                    title="Active Listings" 
                    value={stats.active_listings}
                    icon="chart"
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600"
                />
                <StatCard 
                    title="Total Admins" 
                    value={stats.total_admins}
                    icon="shield"
                    className="bg-gradient-to-br from-purple-500 to-purple-600"
                />
            </div>

            {/* Add more dashboard sections here */}
        </AdminLayout>
    );
} 