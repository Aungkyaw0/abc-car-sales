import React, { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Dashboard/StatCard';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register ChartJS components including Filler
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard({ stats }) {
    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        }
    };

    // Bar chart specific options
    const barOptions = {
        ...defaultChartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        }
    };

    // Line chart specific options
    const lineOptions = {
        ...defaultChartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    // Pie chart specific options
    const pieOptions = {
        ...defaultChartOptions,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    const carsByMakeData = useMemo(() => ({
        labels: stats.cars_by_make?.map(item => item.make) || [],
        datasets: [{
            label: 'Number of Cars',
            data: stats.cars_by_make?.map(item => item.count) || [],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            borderWidth: 1
        }]
    }), [stats.cars_by_make]);

    const monthlyListingsData = useMemo(() => ({
        labels: stats.monthly_listings?.map(item => item.month) || [],
        datasets: [{
            label: 'New Listings',
            data: stats.monthly_listings?.map(item => item.count) || [],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
        }]
    }), [stats.monthly_listings]);

    const priceRangeData = useMemo(() => ({
        labels: ['Budget', 'Mid Range', 'Luxury'],
        datasets: [{
            data: [
                stats.price_ranges?.budget || 0,
                stats.price_ranges?.mid_range || 0,
                stats.price_ranges?.luxury || 0
            ],
            backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6']
        }]
    }), [stats.price_ranges]);

    const statusDistributionData = useMemo(() => ({
        labels: stats.status_distribution?.map(item => item.status) || [],
        datasets: [{
            data: stats.status_distribution?.map(item => item.count) || [],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B']
        }]
    }), [stats.status_distribution]);

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Popular Car Makes</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={carsByMakeData} options={barOptions} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Monthly Listings Trend</h3>
                    <div style={{ height: '300px' }}>
                        <Line data={monthlyListingsData} options={lineOptions} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Price Range Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={priceRangeData} options={pieOptions} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Listing Status Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={statusDistributionData} options={pieOptions} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 