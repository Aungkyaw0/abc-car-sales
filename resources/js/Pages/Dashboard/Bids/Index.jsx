import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import BidsPlaced from '@/Components/Dashboard/Bids/BidsPlaced';
import BidsReceived from '@/Components/Dashboard/Bids/BidsReceived';
import { Tab } from '@headlessui/react';
import { CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Index({ bidsPlaced, bidsReceived }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const stats = {
        totalBidsPlaced: bidsPlaced.length,
        totalBidsReceived: bidsReceived.length,
        activeBidsPlaced: bidsPlaced.filter(bid => bid.status === 'pending').length,
        activeBidsReceived: bidsReceived.filter(bid => bid.status === 'pending').length,
    };

    return (
        <DashboardLayout>
            <Head title="My Bids" />
            
            <div className="flex-1">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-50">
                                        <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Bids Placed</p>
                                        <h3 className="text-xl font-bold text-gray-900">{stats.totalBidsPlaced}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-50">
                                        <ClockIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Active Bids Placed</p>
                                        <h3 className="text-xl font-bold text-gray-900">{stats.activeBidsPlaced}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-50">
                                        <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Bids Received</p>
                                        <h3 className="text-xl font-bold text-gray-900">{stats.totalBidsReceived}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-yellow-50">
                                        <ClockIcon className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Active Bids Received</p>
                                        <h3 className="text-xl font-bold text-gray-900">{stats.activeBidsReceived}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                                <Tab.List className="flex border-b border-gray-200">
                                    <Tab className={({ selected }) => `
                                        flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none
                                        ${selected 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-700'
                                        }
                                    `}>
                                        Bids Placed
                                    </Tab>
                                    <Tab className={({ selected }) => `
                                        flex-1 py-4 px-6 text-sm font-medium text-center focus:outline-none
                                        ${selected 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-700'
                                        }
                                    `}>
                                        Bids Received
                                    </Tab>
                                </Tab.List>

                                <Tab.Panels>
                                    <Tab.Panel>
                                        <BidsPlaced bids={bidsPlaced} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <BidsReceived bids={bidsReceived} />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 