import { Link, usePage } from "@inertiajs/react";
import React from 'react';
import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedNav from '@/Components/AuthenticatedNav';
import Footer from '@/Components/Footer'
export default function Layout({ children }) {
    const { auth } = usePage().props;
    
    return (
        <div className="min-h-screen bg-gray-100">
            {auth?.user ? <AuthenticatedNav /> : <NavigationBar />}
            <main>{children}</main>
            {auth?.user ? <Footer /> : <Footer />}
        </div>
    );
}
