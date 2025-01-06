import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatCurrency } from '@/utils/format';
import FeaturesSelection from '@/Components/Cars/FeaturesSelection';
import ImageUpload from '@/Components/Cars/ImageUpload';

export default function Edit({ car }) {
    const { data, setData, put, processing, errors } = useForm({
        title: car.title,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        condition: car.condition,
        transmission: car.transmission,
        fuel_type: car.fuel_type,
        description: car.description,
        status: car.status,
        features: car.features,
        images: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/cars/${car.id}`);
    };

    return (
        <AdminLayout title="Edit Car Listing">
            <Head title={`Edit - ${car.title}`} />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Edit Car Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Make</label>
                            <input
                                type="text"
                                value={data.make}
                                onChange={e => setData('make', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
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
                                className="mt-1 block w-full rounded-md border-gray-300"
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
                                className="mt-1 block w-full rounded-md border-gray-300"
                                placeholder="e.g., 2020"
                            />
                            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
                                placeholder="e.g., 25000"
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                            <input
                                type="number"
                                value={data.mileage}
                                onChange={e => setData('mileage', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
                                placeholder="e.g., 50000"
                            />
                            {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Condition</label>
                            <select
                                value={data.condition}
                                onChange={e => setData('condition', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
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
                                className="mt-1 block w-full rounded-md border-gray-300"
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
                                className="mt-1 block w-full rounded-md border-gray-300"
                            >
                                <option value="">Select Fuel Type</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="electric">Electric</option>
                            </select>
                            {errors.fuel_type && <p className="mt-1 text-sm text-red-600">{errors.fuel_type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300"
                            >
                                <option value="active">Active</option>
                                <option value="sold">Sold</option>
                                <option value="pending">Pending</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300"
                            placeholder="Enter car description..."
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Features Section */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <FeaturesSelection
                            selectedFeatures={data.features}
                            onFeaturesChange={(features) => setData('features', features)}
                            error={errors.features}
                        />
                    </div>

                    {/* Current Images */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {car.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={`Car image ${index + 1}`}
                                        className="rounded-lg w-full h-48 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* New Images Upload */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <ImageUpload
                            onImagesSelected={(files) => setData('images', files)}
                            error={errors.images}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
} 