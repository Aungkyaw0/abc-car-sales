import { format, formatDistanceToNow as fdn } from 'date-fns';

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
};

export const formatDistanceToNow = (date) => {
    return fdn(date, { addSuffix: true });
};

export const formatDate = (date, pattern = 'MMM d, yyyy') => {
    return format(new Date(date), pattern);
}; 