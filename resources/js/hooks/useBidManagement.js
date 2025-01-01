import { useState, useCallback } from 'react';
import { useForm } from '@inertiajs/react';
import { showNotification } from '@/Components/Notifications';

export function useBidManagement(car, initialBids) {
    const [bids, setBids] = useState(initialBids);
    const { post, processing } = useForm();

    const handleBidAction = useCallback((bidId, action) => {
        window.announce(`Processing ${action} bid`);
        
        post(`/bids/${bidId}/${action}`, {
            preserveScroll: true,
            onSuccess: () => {
                showNotification.success(`Bid ${action}ed 
                    successfully`);
                window.announce(`Bid successfully ${action}ed`);
            },
            onError: () => {
                showNotification.error(`Failed to ${action} bid`);
                window.announce(`Failed to ${action} bid`);
            }
        });
    }, [post]);

    return {
        bids,
        setBids,
        handleBidAction,
        processing
    };
} 