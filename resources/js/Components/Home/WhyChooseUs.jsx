import React from 'react';
import { ShieldCheckIcon, TruckIcon, CurrencyDollarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function WhyChooseUs() {
    const features = [
        {
            title: 'Verified Sellers',
            description: 'All our sellers are verified to ensure safe transactions',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Quality Cars',
            description: 'Wide selection of thoroughly inspected used cars',
            icon: TruckIcon,
        },
        {
            title: 'Best Prices',
            description: 'Competitive prices and transparent bidding system',
            icon: CurrencyDollarIcon,
        },
        {
            title: 'Direct Communication',
            description: 'Connect directly with sellers through our platform',
            icon: ChatBubbleLeftRightIcon,
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Why Choose ABC Car Sales</h2>
                    <p className="mt-4 text-lg text-blue-100">The trusted platform for buying and selling used cars</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                <feature.icon className="w-8 h-8 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-blue-100">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 