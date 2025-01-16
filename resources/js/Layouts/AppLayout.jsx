import { Toaster } from 'react-hot-toast';

export default function AppLayout({ children }) {
    return (
        <>
            {children}
            <Toaster position="top-right" />
        </>
    );
} 