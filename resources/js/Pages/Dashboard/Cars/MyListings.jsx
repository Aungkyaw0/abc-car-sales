import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { formatCurrency } from '@/utils/format';
import Pagination from '@/Components/Pagination';
import EditCarModal from '@/Components/Cars/EditCarModal';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';

export default function MyListings({ cars }) {
    const [editingCar, setEditingCar] = useState(null);
    const [deletingCar, setDeletingCar] = useState(null);

    const handleDelete = () => {
        router.delete(`/dashboard/cars/${deletingCar.id}`, {
            onSuccess: () => setDeletingCar(null),
        });
    };

    return (
        <DashboardLayout title="My Car Listings">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">My Car Listings</h1>
                <Link
                    href="/dashboard/cars/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add New Car
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
                {cars.data.length > 0 ? (
                    <>
                        <div className="grid divide-y">
                            {cars.data.map((car) => (
                                <div key={car.id} className="p-6">
                                    <div className="flex items-start gap-6">
                                        <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={`/storage/${car.images[0]?.image_path}`}
                                                alt={car.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                                {car.title}
                                            </h2>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                <span>{car.year}</span>
                                                <span>•</span>
                                                <span>{car.make} {car.model}</span>
                                                <span>•</span>
                                                <span>{formatCurrency(car.price)}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    href={`/cars/${car.id}`}
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => setEditingCar(car)}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeletingCar(car)}
                                                    className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
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
                    </>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        <p>You don't have any active car listings.</p>
                        <Link
                            href="/cars/create"
                            className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                        >
                            Post your first car
                        </Link>
                    </div>
                )}
            </div>

            <EditCarModal 
                car={editingCar}
                show={!!editingCar}
                onClose={() => setEditingCar(null)}
            />

            <DeleteConfirmationModal
                show={!!deletingCar}
                onClose={() => setDeletingCar(null)}
                onConfirm={handleDelete}
                title="Delete Car Listing"
                message="Are you sure you want to delete this car listing? This action cannot be undone and will remove all associated data including bids and features."
            />
        </DashboardLayout>
    );
} 

MyListings.layout = page => page; 