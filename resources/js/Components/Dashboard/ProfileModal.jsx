import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import InputError from '@/Components/InputError';

export default function ProfileModal({ isOpen, closeModal }) {
    const { auth } = usePage().props;
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone_number: auth.user.phone_number || '',
        address: auth.user.address || '',
        profile_image: null,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    useEffect(() => {
        // Set initial image preview if user has a profile image
        if (auth.user.profile_image) {
            setImagePreview(`/storage/${auth.user.profile_image}`);
        }
    }, [auth.user.profile_image]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/profile/update', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                reset('current_password', 'new_password', 'new_password_confirmation');
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_image', file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 top-0 pr-4 pt-4">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        onClick={closeModal}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="mt-3 sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Edit Profile
                                    </Dialog.Title>
                                    <div className="mt-6">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Profile Image Section */}
                                            <div className="flex items-center space-x-6">
                                                {/* Profile Image Preview */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                                                        {imagePreview ? (
                                                            <img
                                                                src={imagePreview}
                                                                alt="Profile Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                                <span className="text-xl font-medium text-gray-600">
                                                                    {data.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* File Input */}
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Profile Image
                                                    </label>
                                                    <input
                                                        type="file"
                                                        onChange={handleImageChange}
                                                        className="mt-1 block w-full text-sm text-gray-500
                                                            file:mr-4 file:py-2 file:px-4
                                                            file:rounded-md file:border-0
                                                            file:text-sm file:font-semibold
                                                            file:bg-blue-50 file:text-blue-700
                                                            hover:file:bg-blue-100"
                                                    />
                                                    <InputError message={errors.profile_image} className="mt-2" />
                                                </div>
                                            </div>

                                            {/* Basic Information */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.phone_number}
                                                        onChange={e => setData('phone_number', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.phone_number} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Address
                                                    </label>
                                                    <textarea
                                                        value={data.address}
                                                        onChange={e => setData('address', e.target.value)}
                                                        rows={3}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.address} className="mt-2" />
                                                </div>
                                            </div>

                                            {/* Password Change Section */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={data.current_password}
                                                        onChange={e => setData('current_password', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.current_password} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={data.new_password}
                                                        onChange={e => setData('new_password', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                    <InputError message={errors.new_password} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={data.new_password_confirmation}
                                                        onChange={e => setData('new_password_confirmation', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    type="button"
                                                    className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    {processing ? 'Saving...' : 'Save Changes'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
} 