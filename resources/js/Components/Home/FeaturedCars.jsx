import React from 'react';
import { Link } from '@inertiajs/react';
import { formatCurrency } from '@/utils/format';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function FeaturedCars({ cars }) {
    return (
        <section className="py-16 bg-gray-50">
            <AnimatedSection>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
                        <p className="mt-4 text-lg text-gray-600">Discover our hand-picked selection of premium vehicles</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/cars/${car.id}`} className="group">
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img 
                                                src={car.images[0]?.image_path ? `/storage/${car.images[0].image_path}` : '/images/car-placeholder.png'} 
                                                alt={car.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{car.title}</h3>
                                            <p className="mt-2 text-2xl font-bold text-blue-600">{formatCurrency(car.price)}</p>
                                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                                <span>{car.year}</span>
                                                <span>{car.mileage} km</span>
                                                <span>{car.transmission}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
} 