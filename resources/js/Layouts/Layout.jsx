import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedNav from '@/Components/AuthenticatedNav';
import Footer from '@/Components/Footer';
import NotificationDropdown from '@/Components/NotificationDropdown';
import { showNotification } from '@/Components/Notifications';

export default function Layout({ children }) {
    const { auth, flash } = usePage().props;
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev].slice(0, 5));
    };

    useEffect(() => {
        if (flash.success) {
            showNotification.success(flash.success);
            addNotification({
                id: Date.now(),
                type: 'success',
                message: flash.success,
                timestamp: new Date()
            });
        }
        if (flash.error) {
            showNotification.error(flash.error);
            addNotification({
                id: Date.now(),
                type: 'error',
                message: flash.error,
                timestamp: new Date()
            });
        }
    }, [flash]);

    const renderNavigation = () => {
        if (!auth?.user) {
            return <NavigationBar />;
        }
        if (auth.user.role === 'admin') {
            return null;
        }
        return <AuthenticatedNav notifications={notifications} />;
    };

    const renderFooter = () => {
        if (!auth?.user || auth.user.role === 'user') {
            return <Footer />;
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {renderNavigation()}
            <main>{children}</main>
            {renderFooter()}
        </div>
    );
}
