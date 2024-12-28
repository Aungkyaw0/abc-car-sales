import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/Layout';
import { formatCurrency, formatNumber } from '@/utils/format';
import Features from '@/Components/Cars/Features';

export default function Show({ car, seller, similarCars }) {
    const [activeImage, setActiveImage] = useState(car.images[0]?.image_path);

    return (
        <>
            <Head title={car.title} />

            <div className="py-12 pt-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Left Column - Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={`/storage/${activeImage}`}
                                    alt={car.title}
                                    className="rounded-lg object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {car.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setActiveImage(image.image_path)}
                                        className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
                                            activeImage === image.image_path ? 'ring-2 ring-primary ring-offset-2' : ''
                                        }`}
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{car.description}</p>
                            </div>

                            <div className="space-y-8">
                            {/* ... existing code ... */}
                            
                            {/* Features Section */}
                            <Features features={car.features} />
                            
                            {/* ... rest of the code ... */}
                            </div>

                        </div>

                        {/* Right Column - Car Details */}
                        <div className="space-y-8">
                            {/* Title and Price */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
                                <p className="text-3xl font-bold text-primary">
                                    {formatCurrency(car.price)}
                                </p>
                            </div>

                            {/* Specifications Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Make</p>
                                    <p className="font-semibold text-gray-900">{car.make}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Model</p>
                                    <p className="font-semibold text-gray-900">{car.model}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Year</p>
                                    <p className="font-semibold text-gray-900">{car.year}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Mileage</p>
                                    <p className="font-semibold text-gray-900">{formatNumber(car.mileage)} km</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Transmission</p>
                                    <p className="font-semibold text-gray-900 capitalize">{car.transmission}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-primary mb-1">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Fuel Type</p>
                                    <p className="font-semibold text-gray-900 capitalize">{car.fuel_type}</p>
                                </div>
                            </div>

                            
                            

                            {/* Seller Information */}
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-primary rounded-full p-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Seller Information</h2>
                                        <p className="text-gray-500">Contact the seller for more details</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="flex items-center text-gray-600">
                                        <span className="font-medium mr-2">Name:</span> {seller.name}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <span className="font-medium mr-2">Member Since:</span> {seller.joined}
                                    </p>
                                    <button className="w-full mt-4 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 font-semibold flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span>Contact Seller</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar Cars Section */}
                    {similarCars.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Similar Cars</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {similarCars.map((similarCar) => (
                                    <a
                                        key={similarCar.id}
                                        href={`/cars/${similarCar.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    src={`/storage/${similarCar.images[0]?.image_path}`}
                                                    alt={similarCar.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg mb-2 text-gray-900">{similarCar.title}</h3>
                                                <p className="text-primary font-bold text-xl">
                                                    {formatCurrency(similarCar.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 