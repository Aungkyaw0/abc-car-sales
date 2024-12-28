import React, { useState } from 'react';
import NavigationBar from '../Components/NavigationBar';
import { Link } from '@inertiajs/react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="relative pt-20">
                <div className="absolute inset-0 h-[300px] bg-[url('/images/contact-hero.png')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/70"></div>
                </div>
                <div className="relative max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                    <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                        We're here to help and answer any questions you might have
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative -mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Information Cards */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                {/* Visit Us */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                                            <p className="text-gray-600">123 Car Street, Singapore 123456</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Call Us */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                            <p className="text-gray-600">(65) 1234-5678</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Us */}
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                                            <p className="text-gray-600">info@abccarsales.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monday - Friday</span>
                                        <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Saturday</span>
                                        <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sunday</span>
                                        <span className="text-gray-900 font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                                            transition-colors duration-200 font-medium focus:outline-none focus:ring-2 
                                            focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7258670338497!2d103.8516!3d1.2839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDIuMCJOIDEwM8KwNTEnMDUuOCJF!5e0!3m2!1sen!2ssg!4v1234567890!5m2!1sen!2ssg"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}