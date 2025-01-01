import toast from 'react-hot-toast';

export const showNotification = {
    success: (message) => {
        toast.dismiss();
        toast.success(message, {
            duration: 5000,
            position: 'bottom-center',
            style: {
                background: '#10B981',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
            },
            id: 'unique-success',
        });
    },
    error: (message) => {
        toast.dismiss();
        toast.error(message, {
            duration: 5000,
            position: 'bottom-center',
            style: {
                background: '#EF4444',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
            },
            id: 'unique-error',
        });
    }
}; 