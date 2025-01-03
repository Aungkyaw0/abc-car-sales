import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import ImageUpload from '@/Components/Cars/ImageUpload';
import FeaturesSelection from '@/Components/Cars/FeaturesSelection';

export default function EditCarModal({ car, show, onClose }) {
    if (!car) return null;

    const { data, setData, put, processing, errors, reset } = useForm({
        title: car.title || '',
        make: car.make || '',
        model: car.model || '',
        year: car.year || '',
        price: car.price || '',
        mileage: car.mileage || '',
        condition: car.condition || '',
        transmission: car.transmission || '',
        fuel_type: car.fuel_type || '',
        description: car.description || '',
        features: car.features?.map(f => f.id) || [],
        images: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/dashboard/cars/${car.id}`, {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="4xl">
            <div className="max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                    <div className="space-y-6">
                        {/* Header with close button */}
                        <div className="flex items-center justify-between pb-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Edit Car Details</h2>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Existing input fields with updated responsive classes */}
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., 2020 Toyota Camry SE"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Make, Model, Year in one row */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Make</label>
                                    <input
                                        type="text"
                                        value={data.make}
                                        onChange={e => setData('make', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., Toyota"
                                    />
                                    {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Model</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={e => setData('model', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., Camry"
                                    />
                                    {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <input
                                        type="number"
                                        value={data.year}
                                        onChange={e => setData('year', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., 2020"
                                    />
                                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                                </div>

                                {/* Price and Mileage in one row */}
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., 25000"
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                                    <input
                                        type="number"
                                        value={data.mileage}
                                        onChange={e => setData('mileage', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="e.g., 50000"
                                    />
                                    {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
                                </div>

                                {/* Condition, Transmission, Fuel Type in one row */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                                    <select
                                        value={data.condition}
                                        onChange={e => setData('condition', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select Condition</option>
                                        <option value="new">New</option>
                                        <option value="used">Used</option>
                                    </select>
                                    {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                                    <select
                                        value={data.transmission}
                                        onChange={e => setData('transmission', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select Transmission</option>
                                        <option value="automatic">Automatic</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                    {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                                    <select
                                        value={data.fuel_type}
                                        onChange={e => setData('fuel_type', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

                        {/* Description */}
                        <div className="bg-white rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                                Description
                            </h3>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Features
                            </h3>
                            <FeaturesSelection
                                selectedFeatures={data.features}
                                onFeaturesChange={(features) => setData('features', features)}
                                error={errors.features}
                            />
                        </div>

                        {/* Images */}
                        <div className="bg-white rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Images
                            </h3>
                            <ImageUpload
                                onImagesSelected={(files) => setData('images', files)}
                                error={errors.images}
                                existingImages={car?.images || []}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-3 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Update Car'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
} 