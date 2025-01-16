import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AppointmentCard from '@/Components/Dashboard/Appointments/AppointmentCard';
import { Tab } from '@headlessui/react';

export default function Index({ requestedAppointments, myAppointments }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleStatusUpdate = (appointmentId, status) => {
        // Show a modal to get response message
        const responseMessage = prompt('Add a response message (optional):');
        console.log("Response :: " + responseMessage)
        router.put(`/appointments/${appointmentId}/status`, {
            status,
            response_message: responseMessage
        }, {
            preserveScroll: true
        });
    };

    return (
        <DashboardLayout title="Appointments">
            <Head title="Appointments" />

            <div className="max-w-7xl mx-auto">
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
                        <Tab
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                ${selected
                                    ? 'bg-white text-blue-700 shadow'
                                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                                }`
                            }
                        >
                            Requested Appointments
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                ${selected
                                    ? 'bg-white text-blue-700 shadow'
                                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                                }`
                            }
                        >
                            My Appointments
                        </Tab>
                    </Tab.List>

                    <Tab.Panels>
                        <Tab.Panel className="space-y-6">
                            {requestedAppointments.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No appointment requests yet.</p>
                                </div>
                            ) : (
                                requestedAppointments.map(appointment => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onStatusUpdate={handleStatusUpdate}
                                        isSeller={true}
                                    />
                                ))
                            )}
                        </Tab.Panel>

                        <Tab.Panel className="space-y-6">
                            {myAppointments.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">You haven't made any appointments yet.</p>
                                </div>
                            ) : (
                                myAppointments.map(appointment => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        isSeller={false}
                                    />
                                ))
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DashboardLayout>
    );
} 

Index.layout = page => page; 