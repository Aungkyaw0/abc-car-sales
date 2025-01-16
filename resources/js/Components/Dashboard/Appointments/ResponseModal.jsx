import React from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-hot-toast';

export default function ResponseModal({ isOpen, closeModal, appointment, action }) {
    console.log("Action :: " + action);
    const { data, setData, put, processing } = useForm({
        status: action,
        response_message: '',
    });

    // Update form data when action prop changes
    React.useEffect(() => {
        setData('status', action);
    }, [action]);

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/appointments/${appointment.id}/status`, data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Appointment status updated successfully');
                closeModal();
            },
            onError: (errors) => {
                toast.error('Something went wrong. Please try again.');
            }
        });
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="relative bg-white rounded-lg max-w-md w-full p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {action === 'accepted' ? 'Accept' : 'Reject'} Appointment
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Response Message (Optional)
                            </label>
                            <textarea
                                value={data.response_message}
                                onChange={e => setData('response_message', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows="3"
                                placeholder="Enter your response message..."
                            ></textarea>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    action === 'accepted'
                                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                }`}
                            >
                                {processing ? 'Processing...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 