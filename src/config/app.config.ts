// Firebase Configuration
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Stripe Configuration
export const stripeConfig = {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
};

// Gemini AI Configuration
export const geminiConfig = {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
};

// App Configuration
export const appConfig = {
    name: 'Sunny Cafe',
    description: 'Fresh Drinks, Happy Moments',
    taxRate: 0.10, // 10% tax
    currency: 'USD',
    locale: 'en-US',

    // Business hours
    businessHours: {
        open: '08:00',
        close: '20:00',
    },

    // Inventory thresholds
    inventory: {
        lowStockThreshold: 10,
        criticalStockThreshold: 5,
    },

    // Loyalty program
    loyalty: {
        pointsPerDollar: 10,
        tiers: {
            bronze: { minPoints: 0, discount: 0 },
            silver: { minPoints: 500, discount: 0.05 },
            gold: { minPoints: 1500, discount: 0.10 },
        },
    },

    // Order settings
    orders: {
        minOrderAmount: 5,
        deliveryFee: 3.99,
        freeDeliveryThreshold: 25,
    },
};
