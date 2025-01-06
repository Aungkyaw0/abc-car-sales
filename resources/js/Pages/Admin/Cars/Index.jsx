import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatCurrency } from '@/utils/format';
import Pagination from '@/Components/Pagination';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CarManagement({ cars }) {
    const [deletingCar, setDeletingCar] = useState(null);

    const handleDelete = () => {
        router.delete(`/admin/cars/${deletingCar.id}`, {
            onSuccess: () => {
                setDeletingCar(null);
            },
        });
    };

    return (
        <AdminLayout title="Car Management">
            <Head title="Car Management" />

            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 rounded-xl border-b border-gray-200 bg flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">All Car Listings</h2>
                    <div className="flex gap-4">
                        <select className="rounded-md border-gray-300">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="sold">Sold</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="grid divide-y">
                    {cars.data.map((car) => (
                        <div key={car.id} className="p-6">
                            <div className="flex items-start gap-6">
                                {/* Car Image */}
                                <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                        src={`/storage/${car.images[0]?.image_path}`}
                                        alt={car.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Car Details */}
                                <div className="flex-grow">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{car.title}</h3>
                                            <p className="text-gray-500">Posted by: {car.user.name}</p>
                                            <p className="text-lg font-semibold text-blue-600 mt-2">
                                                {formatCurrency(car.price)}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/admin/cars/${car.id}/edit`}
                                                className="inline-flex items-center px-4 py-1 bg-blue-50 border border-transparent 
                                                rounded-md font-semibold text-sm text-blue-700 hover:bg-blue-100 
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                                transition-all duration-150 ease-in-out transform hover:scale-105 
                                                shadow-sm hover:shadow-md"
                                            >
                                                <PencilSquareIcon className="w-4 h-4 mr-2" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeletingCar(car)}
                                                className="inline-flex items-center px-4 py-2 bg-red-50 border border-transparent 
                                                rounded-md font-semibold text-sm text-red-700 hover:bg-red-100 
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                                                transition-all duration-150 ease-in-out transform hover:scale-105 
                                                shadow-sm hover:shadow-md"
                                            >
                                                <TrashIcon className="w-4 h-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex-shrink-0">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        car.status === 'active' ? 'bg-green-100 text-green-800' :
                                        car.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 py-4 border-t">
                    <Pagination links={cars.links} />
                </div>
            </div>

            <DeleteConfirmationModal
                show={!!deletingCar}
                onClose={() => setDeletingCar(null)}
                onConfirm={handleDelete}
                title="Delete Car Listing"
                message="Are you sure you want to delete this car listing? This action cannot be undone."
            />
        </AdminLayout>
    );
} 