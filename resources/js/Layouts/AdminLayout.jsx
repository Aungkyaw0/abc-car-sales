import React from 'react';
import AdminNavbar from '@/Components/Admin/AdminNavbar';
import AdminSidebar from '@/Components/Admin/AdminSidebar';

export default function AdminLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar title={title} />
            
            <div className="flex pt-6">
                <AdminSidebar />
                
                {/* Main Content */}
                <div className="flex-1 lg:pl-64">
                    <main className="pt-16 px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
} 

AdminLayout.layout = page => page; 