import React from 'react';
import { Head, useForm } from '@inertiajs/react';

import ImageUpload from '@/Components/Cars/ImageUpload';
import FeaturesSelection from '@/Components/Cars/FeaturesSelection';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { formatCurrency } from '@/utils/format';
import Pagination from '@/Components/Pagination';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        condition: '',
        transmission: '',
        fuel_type: '',
        description: '',
        images: [],
        features: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/cars');
    };

    

    return (
        <DashboardLayout title="Add New Car">
            <Head title="Sell Your Car" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 pt-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
                            <h2 className="text-3xl font-bold text-white mb-2">List Your Car for Sale</h2>
                            <p className="text-blue-100">Fill in the details below to list your car</p>
                        </div>


                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Form Sections */}
                                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Basic Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Title Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., 2020 Toyota Camry SE"
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                        </div>

                                        {/* Make Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                                            <input
                                                type="text"
                                                value={data.make}
                                                onChange={e => setData('make', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., Toyota"
                                            />
                                            {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                                        </div>

                                        {/* Model Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                            <input
                                                type="text"
                                                value={data.model}
                                                onChange={e => setData('model', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., Camry"
                                            />
                                            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                                        </div>

                                        {/* Year Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                            <input
                                                type="number"
                                                value={data.year}
                                                onChange={e => setData('year', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., 2020"
                                            />
                                            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                                        </div>

                                        {/* Price Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                            <input
                                                type="number"
                                                value={data.price}
                                                onChange={e => setData('price', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., 25000"
                                            />
                                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                        </div>

                                        {/* Mileage Input */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                                            <input
                                                type="number"
                                                value={data.mileage}
                                                onChange={e => setData('mileage', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="e.g., 50000"
                                            />
                                            {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
                                        </div>

                                        {/* Condition Select */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                                            <select
                                                value={data.condition}
                                                onChange={e => setData('condition', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select Condition</option>
                                                <option value="new">New</option>
                                                <option value="used">Used</option>
                                            </select>
                                            {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                                        </div>

                                        {/* Transmission Select */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                                            <select
                                                value={data.transmission}
                                                onChange={e => setData('transmission', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select Transmission</option>
                                                <option value="automatic">Automatic</option>
                                                <option value="manual">Manual</option>
                                            </select>
                                            {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission}</p>}
                                        </div>

                                        {/* Fuel Type Select */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                            <select
                                                value={data.fuel_type}
                                                onChange={e => setData('fuel_type', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select Fuel Type</option>
                                                <option value="petrol">Petrol</option>
                                                <option value="diesel">Diesel</option>
                                                <option value="electric">Electric</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                            {errors.fuel_type && <p className="mt-1 text-sm text-red-600">{errors.fuel_type}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Description
                                    </h3>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Describe your car's condition, history, and special features..."
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Features Section with enhanced styling */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <FeaturesSelection
                                        selectedFeatures={data.features}
                                        onFeaturesChange={(features) => setData('features', features)}
                                        error={errors.features}
                                    />
                                </div>

                                {/* Image Upload Section */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Car Images
                                    </h3>
                                    <ImageUpload
                                        onImagesSelected={(files) => setData('images', files)}
                                        error={errors.images}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
                                        font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 
                                        focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 
                                        transform transition-all duration-200 hover:scale-105 
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {processing ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Listing...
                                            </span>
                                        ) : (
                                            'List Your Car'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 