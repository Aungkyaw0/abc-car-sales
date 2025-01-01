import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function usePollingWithCache(url, interval = 5000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cache = useRef(new Map());
    const lastFetchTime = useRef(0);

    useEffect(() => {
        let mounted = true;
        let timeoutId = null;

        const fetchData = async () => {
            const now = Date.now();
            if (now - lastFetchTime.current < interval && cache.current.has(url)) {
                return;
            }

            try {
                const response = await axios.get(url);
                if (mounted) {
                    setData(response.data);
                    cache.current.set(url, response.data);
                    lastFetchTime.current = now;
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