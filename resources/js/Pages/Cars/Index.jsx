import React, { useCallback } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/Layout';
import { formatCurrency, formatNumber } from '@/utils/format';
import Breadcrumb from '@/Components/Breadcrumb';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';

export default function Index({ cars, filters, makes }) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        make: filters.make || '',
        model: filters.model || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        min_year: filters.min_year || '',
        max_year: filters.max_year || '',
        transmission: filters.transmission || '',
        fuel_type: filters.fuel_type || '',
    });

    const debouncedSearch = useCallback(
        debounce((query) => {
            get('/car/lists', {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300),
        []
    );

    const handleFilter = (e) => {
        const { name, value } = e.target;

        // First update the local state
        setData(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            };

            // Then immediately make the API call with the updated data
            if (name === 'make') {
                router.get('/car/lists', updatedData, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
            }

            return updatedData;
        });
    };

    const breadcrumbItems = [
        { name: 'Browse Cars' }
    ];

    const searchYears = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => 1990 + i).reverse();

    const priceRanges = [
        { min: 0, max: 10000, label: 'Under $10,000' },
        { min: 10000, max: 20000, label: '$10,000 - $20,000' },
        { min: 20000, max: 30000, label: '$20,000 - $30,000' },
        { min: 30000, max: 50000, label: '$30,000 - $50,000' },
        { min: 50000, max: null, label: 'Over $50,000' }
    ];

    return (
        <>
            <Head title="Browse Cars" />

            {/* Hero Section with Search */}
            <section className="relative pt-20">
                {/* Background Image with Overlay */}
                <Breadcrumb items={breadcrumbItems} />
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-5">
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
                                onClick={() => get('/car/lists')}
                                disabled={processing}
                            >
                                Search Cars
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="Search cars..."
                                            value={data.search}
                                            onChange={handleFilter}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Make Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                                        <select
                                            name="make"
                                            value={data.make}
                                            onChange={handleFilter}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">All Makes</option>
                                            {makes.map(make => (
                                                <option key={make} value={make}>{make}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Model Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                                        <select
                                            name="model"
                                            value={data.model}
                                            onChange={handleFilter}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">All Models</option>
                                            {/* Add models based on selected make */}
                                        </select>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                        <select
                                            name="price_range"
                                            value={data.price_range}
                                            onChange={handleFilter}
                                            className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Any Price</option>
                                            {priceRanges.map((range, index) => (
                                                <option key={index} value={`${range.min}-${range.max}`}>
                                                    {range.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Year Range Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Year</label>
                                        <div className="flex gap-2">
                                            <select
                                                name="min_year"
                                                value={data.min_year}
                                                onChange={handleFilter}
                                                className="w-1/2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">From</option>
                                                {searchYears.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            <select
                                                name="max_year"
                                                value={data.max_year}
                                                onChange={handleFilter}
                                                className="w-1/2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">To</option>
                                                {searchYears.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Clear Filters Button */}
                                    <button
                                        onClick={() => {
                                            setData({
                                                search: '',
                                                make: '',
                                                model: '',
                                                price_range: '',
                                                min_year: '',
                                                max_year: '',
                                                min_price: '',
                                                max_price: '',
                                                transmission: '',
                                                fuel_type: '',
                                            });
                                            get('/car/lists');
                                        }}
                                        className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cars Grid - Update the existing grid */}
                        <div className="lg:w-3/4">
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
                            
                            {/* Pagination
                            {cars.links && (
                                <div className="mt-8">
                                    <Pagination links={cars.links} />
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </section>
            </>
    );
} 