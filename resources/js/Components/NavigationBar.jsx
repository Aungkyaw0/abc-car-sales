import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link 
                            href="/"
                            className={`text-2xl font-extrabold ${scrolled ? 'text-gray-800' : 'text-white'}`}
                        >
                            <span className="text-primary">ABC</span> Car Sales
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link
                            href="/"
                            className={`transition-colors duration-200 ${
                                scrolled 
                                    ? 'text-gray-600 hover:text-primary' 
                                    : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/car/lists"
                            className={`transition-colors duration-200 ${
                                scrolled 
                                    ? 'text-gray-600 hover:text-primary' 
                                    : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Car Listings
                        </Link>
                        <Link
                            href="/about"
                            className={`transition-colors duration-200 ${
                                scrolled 
                                    ? 'text-gray-600 hover:text-primary' 
                                    : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className={`transition-colors duration-200 ${
                                scrolled 
                                    ? 'text-gray-600 hover:text-primary' 
                                    : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/register"
                            className="ml-4 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${
                                scrolled ? 'text-gray-600' : 'text-white'
                            } hover:text-primary focus:outline-none`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                } md:hidden absolute top-20 inset-x-0 transition transform origin-top-right duration-200 ease-out`}
            >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5 space-y-6">
                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/cars"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Car Listings
                            </Link>
                            <Link
                                href="/about"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/register"
                                className="block w-full text-center px-6 py-3 text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;