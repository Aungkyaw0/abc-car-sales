import React from 'react';
import { Menu } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationDropdown({ notifications }) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                <BellIcon className="h-6 w-6 text-gray-600" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                        No new notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <Menu.Item key={notification.id}>
                            <div className="px-4 py-3 hover:bg-gray-50">
                                <p className={`text-sm ${
                                    notification.type === 'error' ? 'text-red-600' : 'text-gray-900'
                                }`}>
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </p>
                            </div>
                        </Menu.Item>
                    ))
                )}
            </Menu.Items>
        </Menu>
    );
} 