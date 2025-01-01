import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedNav from '@/Components/AuthenticatedNav';
import Footer from '@/Components/Footer'
import Echo from 'laravel-echo';
import NotificationDropdown from '@/Components/NotificationDropdown';
import { showNotification } from '@/Components/Notifications';

export default function Layout({ children }) {
    const { auth, flash } = usePage().props;
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (auth.user && window.Echo) {
            const channel = window.Echo.private(`App.Models.User.${auth.user.id}`);
            
            channel.notification((notification) => {
                setNotifications(prev => [notification, ...prev]);
            });

            return () => {
                channel.stopListening('notification');
            };
        }
    }, [auth.user]);

    useEffect(() => {
        if (flash.success) {
            showNotification.success(flash.success);
        }
        if (flash.error) {
            showNotification.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            {auth?.user ? <AuthenticatedNav /> : <NavigationBar />}
            <main>{children}</main>
            {auth?.user ? <Footer /> : <Footer />}
        </div>
    );
}
