import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import NavigationBar from '@/Components/NavigationBar';
// import {route} from 'ziggy-js';

export default function Register() {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        address: '',
        profile_image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('profile_image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500">
            <NavigationBar />
            
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center">
                        {/* Left Side - Welcome Message (3 columns wide) */}
                        <div className="hidden md:flex flex-col justify-between p-8 rounded-3xl bg-[url('/images/signup-hero.png')] bg-cover bg-center h-full md:col-span-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg text-center">
                                    Welcome to ABC Car Sales
                                </h1>
                                <p className="text-lg text-gray-200 mb-6 drop-shadow-md text-center">
                                    Your trusted partner in finding the perfect vehicle since 2010
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-300 drop-shadow">www.abccarsales.com</p>
                            </div>
                        </div>

                        {/* Right Side - Form (2 columns wide) */}
                        <div className="bg-white p-8 rounded-3xl shadow-2xl md:col-span-3">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Profile Image Upload */}
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Profile Picture (Optional)
                                    </label>
                                    <div className="mt-2">
                                        <div className="relative inline-block group">
                                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-gray-50">
                                                        <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 w-32 h-32 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                accept="image/*"
                                            />
                                        </div>
                                        <InputError message={errors.profile_image} className="mt-2" />
                                    </div>
                                </div>

                                {/* Input Fields - Updated Styling */}
                                <div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="Email Address"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        id="phone_number"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        placeholder="Phone Number (Optional)"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                    />
                                    <InputError message={errors.phone_number} className="mt-2" />
                                </div>

                                <div>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        placeholder="Address (Optional)"
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                                    ></textarea>
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 px-4 rounded-xl text-white font-medium
                                        bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                                        transition-all duration-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>

                                {/* Social Login Divider */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link href={'/login'} className="font-medium text-purple-600 hover:text-purple-500">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}