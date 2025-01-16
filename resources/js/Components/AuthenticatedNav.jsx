import React, { useState, useEffect, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';

export default function AuthenticatedNav() {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md' : 'bg-slate-900'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            ABC Cars
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/about" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Contact Us
                        </Link>
                        <Link 
                            href="/car/lists" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Car Listing
                        </Link>
                        <Link 
                            href="/sell-car" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Sell Cars
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className={`transition-colors duration-200 ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            } font-medium`}
                        >
                            Dashboard
                        </Link>
                        <Menu as="div" className="relative ml-3">
                            <Menu.Button className="flex items-center space-x-3 focus:outline-none">
                            <Link 
                                href="/dashboard" 
                                className={` flex flex-row gap-2 justify-center items-center transition-colors duration-200 ${
                                    scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                                } font-medium`}
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                                    {auth.user.profile_image ? (
                                        <img 
                                            src={`/storage/${auth.user.profile_image}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    )  : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {auth.user.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* {console.log(auth.user)} */}
                                </div>
                                <div className={`font-medium ${
                                    scrolled ? 'text-gray-700' : 'text-white'
                                }`}>
                                    
                                    {auth.user.name}
                                </div>

                            </Link>
                                
                            </Menu.Button>

                            
                        </Menu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${
                                scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-primary'
                            }`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-100 rounded-md">
                        <Link 
                            href="/" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/about" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/contact" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Contact Us
                        </Link>
                        <Link 
                            href="/cars" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Car Listing
                        </Link>
                        <Link 
                            href="/sell-car" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Sell Cars
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button"
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 