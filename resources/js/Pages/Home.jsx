import React from 'react';
import NavigationBar from '../Components/NavigationBar';
import { Link } from '@inertiajs/react';
import Footer from '../Components/Footer';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="relative pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 h-[600px] bg-[url('/images/hero-car.png')] bg-cover bg-top">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/70"></div>
                </div>

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-64">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                            Find Your Perfect Car
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Discover an extensive collection of quality used cars at competitive prices.
                            Your dream car is just a few clicks away.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/cars"
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full 
                                text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Browse Cars
                            </Link>
                            <Link
                                href="/sell-car"
                                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full 
                                text-white hover:bg-white hover:text-blue-900 transition-colors duration-200"
                            >
                                Sell Your Car
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                    <div className="bg-white rounded-xl shadow-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <option>Select Make</option>
                                {/* Add car makes */}
                            </select>
                            <select className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <option>Select Model</option>
                                {/* Add car models */}
                            </select>
                            <select className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <option>Price Range</option>
                                {/* Add price ranges */}
                            </select>
                            <button className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-200">
                                Search Cars
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cars</h2>
                        <p className="text-gray-600">Explore our hand-picked selection of premium vehicles</p>
                    </div>

                    {/* Featured Cars Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Sample Car Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48">
                                <img
                                    src="/images/sample-car.png"
                                    alt="Car"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Featured
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">2020 BMW 3 Series</h3>
                                <p className="text-gray-600 mb-4">Automatic • Petrol • 25,000 km</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600">$35,000</span>
                                    <Link
                                        href="/car-details"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Add more car cards here */}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ABC Car Sales?</h2>
                        <p className="text-gray-600">We provide the best car buying experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
                            <p className="text-gray-600">All our cars undergo rigorous quality checks</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
                            <p className="text-gray-600">Competitive prices on all our vehicles</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Professional support team at your service</p>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default Home;