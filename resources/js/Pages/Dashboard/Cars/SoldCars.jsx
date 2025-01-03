import React from 'react';
import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { formatCurrency } from '@/utils/format';
import Pagination from '@/Components/Pagination';

export default function SoldCars({ cars }) {
    return (
        <DashboardLayout title="Sold Cars">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Sold Cars</h1>
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
                                                {car.acceptedBid && (
                                                    <>
                                                        <span>•</span>
                                                        <span>Sold for {formatCurrency(car.acceptedBid.amount)}</span>
                                                    </>
                                                )}
                                            </div>
                                            {car.acceptedBid && (
                                                <div className="text-sm text-gray-600">
                                                    <p>Sold to: {car.acceptedBid.user.name}</p>
                                                    <p>Sale Date: {new Date(car.acceptedBid.updated_at).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link
                                                href={`/dashboard/cars/${car.id}`}
                                                className="text-blue-600 hover:text-blue-700"
                                            >
                                                View Details
                                            </Link>
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
                        <p>You haven't sold any cars yet.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
} 

SoldCars.layout = page => page; 