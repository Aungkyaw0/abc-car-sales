import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import ProfileModal from './ProfileModal';

export default function DashboardNavbar({ breadcrumbs = [] }) {
    const { auth } = usePage().props;
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        <>
            <nav className="bg-gray-800 border-b border-gray-200 z-10 ps-11 w-full shadow-lg ">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Breadcrumb */}
                        <div className="flex">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    {breadcrumbs.map((item, index) => (
                                        <li key={index} className="inline-flex items-center">
                                            {index !== 0 && (
                                                <svg className="w-6 h-6 text-gray-100" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="text-sm font-medium text-gray-100 hover:text-gray-700"
                                                >
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-100">
                                                    {item.name}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>

                        {/* User Menu */}
                        <Menu as="div" className="relative">
                            <Menu.Button as="button" className="flex items-center space-x-3 hover:bg-gray-700 rounded-full py-2 px-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                                    {auth.user.profile_image ? (
                                        <img 
                                            src={`/storage/${auth.user.profile_image}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {auth.user.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="hidden md:flex md:items-center">
                                    <span className="text-sm font-medium text-gray-100">{auth.user.name}</span>
                                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
                                </div>
                            </Menu.Button>

                            <Transition
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setIsProfileModalOpen(true)}
                                                className={`${
                                                    active ? 'bg-gray-100' : ''
                                                } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
                                            >
                                                <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                Manage Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className={`${
                                                    active ? 'bg-gray-100' : ''
                                                } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
                                            >
                                                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                                Logout
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </nav>

            <ProfileModal 
                isOpen={isProfileModalOpen}
                closeModal={() => setIsProfileModalOpen(false)}
                user={auth.user}
            />
        </>
    );
} 