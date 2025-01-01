import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationDropdown({ notifications }) {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        setUnreadCount(notifications.filter(n => !n.read_at).length);
    }, [notifications]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    href={`/cars/${notification.data.car_id}`}
                                    className={`block px-4 py-3 hover:bg-gray-50 ${
                                        !notification.read_at ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <p className="text-sm text-gray-900">
                                        New bid of ${notification.data.amount} by {notification.data.bidder_name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">
                                No notifications
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 