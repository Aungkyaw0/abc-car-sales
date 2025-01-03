import React from 'react';
import { MagnifyingGlassIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            title: 'Browse Cars',
            description: 'Search through our extensive collection of quality used cars',
            icon: MagnifyingGlassIcon,
        },
        {
            title: 'Place Your Bid',
            description: 'Found your dream car? Place your bid and negotiate the price',
            icon: CurrencyDollarIcon,
        },
        {
            title: 'Connect with Seller',
            description: 'Get in touch with the seller and finalize your purchase',
            icon: UserGroupIcon,
        },
    ];

    return (
        <section className="py-16 bg-white">
            <AnimatedSection>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                        <p className="mt-4 text-lg text-gray-600">Simple steps to find and buy your perfect car</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <step.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
} 