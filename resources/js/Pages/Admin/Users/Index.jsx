import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatDate } from '@/utils/format';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
import UserDetailsModal from '@/Components/Admin/UserDetailsModal';
import Pagination from '@/Components/Pagination';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function UserManagement({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const handleDelete = () => {
        router.delete(`/admin/users/${deletingUser.id}`, {
            onSuccess: () => setDeletingUser(null),
        });
    };

    return (
        <AdminLayout title="User Management">
            <Head title="User Management" />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Registered Users</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <span className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium text-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.email_verified_at 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {user.email_verified_at ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <button 
                                                onClick={() => setSelectedUser(user)}
                                                className="inline-flex items-center px-3 py-2 border border-blue-600 
                                                rounded-md text-sm font-medium text-blue-600 bg-white 
                                                hover:bg-blue-50 focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-blue-500 
                                                transition-colors duration-150"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => setDeletingUser(user)}
                                                className="inline-flex items-center px-3 py-2 border 
                                                border-red-600 rounded-md text-sm font-medium 
                                                text-red-600 bg-white hover:bg-red-50 
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 
                                                focus:ring-red-500 transition-colors duration-150"
                                            >
                                                <TrashIcon className="w-4 h-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                    <Pagination links={users.links} />
                    {console.log(users.links)}
                </div>
            </div>

            <UserDetailsModal
                user={selectedUser}
                show={!!selectedUser}
                onClose={() => setSelectedUser(null)}
            />

            <DeleteConfirmationModal
                show={!!deletingUser}
                onClose={() => setDeletingUser(null)}
                onConfirm={handleDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone and will remove all associated data including car listings and bids."
            />
        </AdminLayout>
    );
} 