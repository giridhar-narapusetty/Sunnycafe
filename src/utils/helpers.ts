import { appConfig } from '../config/app.config';

// Format currency
export const formatCurrency = (amount: number, currency: string = appConfig.currency): string => {
    return new Intl.NumberFormat(appConfig.locale, {
        style: 'currency',
        currency,
    }).format(amount);
};

// Format date
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    switch (format) {
        case 'short':
            return new Intl.DateTimeFormat(appConfig.locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).format(dateObj);
        case 'long':
            return new Intl.DateTimeFormat(appConfig.locale, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }).format(dateObj);
        case 'time':
            return new Intl.DateTimeFormat(appConfig.locale, {
                hour: 'numeric',
                minute: 'numeric',
            }).format(dateObj);
        default:
            return dateObj.toLocaleDateString();
    }
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(dateObj, 'short');
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
};

// Capitalize first letter
export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Generate random ID
export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

// Group array by key
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((result, item) => {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {} as Record<string, T[]>);
};

// Sort array by key
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

// Calculate tax
export const calculateTax = (subtotal: number, taxRate: number = appConfig.taxRate): number => {
    return subtotal * taxRate;
};

// Calculate discount
export const calculateDiscount = (
    subtotal: number,
    discountType: 'percentage' | 'fixed',
    discountValue: number
): number => {
    if (discountType === 'percentage') {
        return subtotal * (discountValue / 100);
    }
    return Math.min(discountValue, subtotal);
};

// Check if business is open
export const isBusinessOpen = (): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [openHour, openMinute] = appConfig.businessHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = appConfig.businessHours.close.split(':').map(Number);

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    return currentTime >= openTime && currentTime < closeTime;
};

// Get business hours status
export const getBusinessHoursStatus = (): { isOpen: boolean; message: string } => {
    const isOpen = isBusinessOpen();

    if (isOpen) {
        return {
            isOpen: true,
            message: `Open until ${appConfig.businessHours.close}`,
        };
    }

    return {
        isOpen: false,
        message: `Opens at ${appConfig.businessHours.open}`,
    };
};
