export class AppError extends Error {
    constructor(
        public message: string,
        public code: string = 'UNKNOWN_ERROR',
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class AuthError extends AppError {
    constructor(message: string) {
        super(message, 'AUTH_ERROR', 401);
        this.name = 'AuthError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}

export class PaymentError extends AppError {
    constructor(message: string) {
        super(message, 'PAYMENT_ERROR', 402);
        this.name = 'PaymentError';
    }
}

// Error handler
export const handleError = (error: unknown): string => {
    console.error('Error:', error);

    if (error instanceof AppError) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
};

// Log error (in production, this would send to error tracking service)
export const logError = (error: unknown, context?: Record<string, any>): void => {
    console.error('Error logged:', {
        error,
        context,
        timestamp: new Date().toISOString(),
    });

    // In production, send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error, { extra: context });
};

// Firebase error handler
export const handleFirebaseError = (error: any): string => {
    const errorCode = error.code || '';

    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use a stronger password.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'permission-denied':
            return 'You do not have permission to perform this action.';
        case 'not-found':
            return 'The requested resource was not found.';
        case 'already-exists':
            return 'This resource already exists.';
        case 'resource-exhausted':
            return 'Resource limit exceeded. Please try again later.';
        case 'unauthenticated':
            return 'Please sign in to continue.';
        default:
            return error.message || 'An error occurred. Please try again.';
    }
};

// Stripe error handler
export const handleStripeError = (error: any): string => {
    const errorType = error.type || '';

    switch (errorType) {
        case 'card_error':
            return error.message || 'Your card was declined.';
        case 'validation_error':
            return 'Invalid payment information.';
        case 'api_error':
            return 'Payment processing error. Please try again.';
        case 'authentication_error':
            return 'Payment authentication failed.';
        case 'rate_limit_error':
            return 'Too many requests. Please try again later.';
        default:
            return 'Payment failed. Please try again.';
    }
};
