import React from 'react';
import { showNotification } from './Notifications';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
        showNotification.error('Something went wrong. Please try again later.');
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center py-4">
                    <p className="text-red-600">Something went wrong. Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 