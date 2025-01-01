import { useEffect, useState } from 'react';

export default function LiveAnnouncer() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        window.announce = (text) => {
            setMessage(text);
            setTimeout(() => setMessage(''), 1000);
        };
        return () => {
            window.announce = null;
        };
    }, []);

    return (
        <div 
            role="status"
            aria-live="polite"
            className="sr-only"
        >
            {message}
        </div>
    );
} 