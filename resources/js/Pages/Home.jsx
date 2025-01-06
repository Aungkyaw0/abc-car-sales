import React from 'react';
import NavigationBar from '../Components/NavigationBar';
import { Link } from '@inertiajs/react';
import Footer from '../Components/Footer';
import HowItWorks from '@/Components/Home/HowItWorks';
import WhyChooseUs from '@/Components/Home/WhyChooseUs';
import FeaturedCars from '@/Components/Home/FeaturedCars';


function Home({ featuredCars }) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="relative pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 h-[650px] bg-[url('/images/hero-car.png')] bg-cover bg-top">
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
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
            <FeaturedCars cars={featuredCars} />
            {/* Why Choose Us Section */}
            <HowItWorks />
            <WhyChooseUs />

            

            
        </div>
    );
}
export default Home;
