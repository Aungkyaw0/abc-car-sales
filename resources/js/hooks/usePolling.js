import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePolling(url, interval = 5000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        let timeoutId = null;

        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    },
                    withCredentials: true
                });
                
                if (mounted) {
                    setData(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(err);
                    setLoading(false);
                }
            }

            if (mounted) {
                timeoutId = setTimeout(fetchData, interval);
            }
        };

        fetchData();

        return () => {
            mounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [url, interval]);

    return { data, loading, error };
} 