import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/Layout';
import { formatCurrency, formatNumber } from '@/utils/format';

export default function Index({ cars, filters, makes }) {
    const { data, setData, get, processing } = useForm({
        make: filters.make || '',
        model: filters.model || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        min_year: filters.min_year || '',
        max_year: filters.max_year || '',
        transmission: filters.transmission || '',
        fuel_type: filters.fuel_type || '',
    });

    const handleFilter = (e) => {
        setData(e.target.name, e.target.value);
        get('/cars/lists', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Browse Cars" />

            {/* Hero Section with Search */}
            <section className="relative pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 h-[400px] bg-[url('/images/car-list-hero.png')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/70"></div>
                </div>

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Find Your Dream Car
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                            Browse through our extensive collection of quality used cars
                        </p>
                    </div>
                </div>

                {/* Search Filters Section */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-12">
                    <div className="bg-white rounded-xl shadow-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select
                                name="make"
                                value={data.make}
                                onChange={handleFilter}
                                className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Make</option>
                                {makes.map(make => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>

                            <select
                                name="model"
                                value={data.model}
                                onChange={handleFilter}
                                className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Model</option>
                                {/* Add models based on selected make */}
                            </select>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="min_price"
                                    placeholder="Min Price"
                                    value={data.min_price}
                                    onChange={handleFilter}
                                    className="w-1/2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    name="max_price"
                                    placeholder="Max Price"
                                    value={data.max_price}
                                    onChange={handleFilter}
                                    className="w-1/2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <button 
                                className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200"
                                onClick={() => get('/cars/lists')}
                                disabled={processing}
                            >
                                Search Cars
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {cars.data.map((car) => (
                            <Link
                                key={car.id}
                                href={`/cars/${car.id}`}
                                className="group h-full"
                            >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                    <div className="aspect-w-16 aspect-h-9 relative">
                                        <img
                                            src={`/storage/${car.images[0]?.image_path}`}
                                            alt={car.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{car.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <span>{car.year}</span>
                                            <span>•</span>
                                            <span>{formatNumber(car.mileage)} km</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-xl font-bold text-primary">
                                                {formatCurrency(car.price)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {car.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {cars.links && (
                        <div className="mt-8">
                            {/* Add pagination component here */}
                        </div>
                    )}
                </div>
            </section>
            </>
    );
} 