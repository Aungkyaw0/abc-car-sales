import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { formatCurrency, formatNumber } from '@/utils/format';
import Features from '@/Components/Cars/Features';
import BidSection from '@/Components/BidSection';
import BidManagement from '@/Components/BidManagement';
import { Toaster } from 'react-hot-toast';
import LiveAnnouncer from '@/Components/LiveAnnouncer';

export default function Show({ car, seller, similarCars, auth }) {
    const [activeImage, setActiveImage] = useState(car.images[0]?.image_path);

    return (
        <DashboardLayout title={car.title}>
            <Toaster />
            <Head title={car.title} />
            <LiveAnnouncer />

            <div className="py-6">
                {/* Rest of the content remains the same as Cars/Show.jsx */}
                {/* Just remove the Breadcrumb component since we're in dashboard */}
            </div>
        </DashboardLayout>
    );
} 