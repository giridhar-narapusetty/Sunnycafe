import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Phone validation
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

// Password validation
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number');

// Name validation
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long');

// Address validation
export const addressSchema = z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country is required'),
});

// Coupon code validation
export const couponCodeSchema = z.string().min(3, 'Invalid coupon code').max(20, 'Invalid coupon code');

// Sanitize HTML to prevent XSS
export const sanitizeHTML = (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
};

// Validate email
export const isValidEmail = (email: string): boolean => {
    try {
        emailSchema.parse(email);
        return true;
    } catch {
        return false;
    }
};

// Validate phone
export const isValidPhone = (phone: string): boolean => {
    try {
        phoneSchema.parse(phone);
        return true;
    } catch {
        return false;
    }
};

// Validate password
export const isValidPassword = (password: string): boolean => {
    try {
        passwordSchema.parse(password);
        return true;
    } catch {
        return false;
    }
};

// Get password strength
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 8) return 'weak';

    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 12) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
};

// Validate credit card number (basic Luhn algorithm)
export const isValidCardNumber = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

// Validate expiry date
export const isValidExpiryDate = (month: string, year: string): boolean => {
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
};
