import { loadStripe, Stripe } from '@stripe/stripe-js';
import { stripeConfig } from '../config/app.config';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(stripeConfig.publishableKey);
    }
    return stripePromise;
};

export interface PaymentIntent {
    clientSecret: string;
    amount: number;
    currency: string;
}

export const paymentService = {
    // Create payment intent (this would typically call a backend API)
    async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<PaymentIntent> {
        // In production, this should call your backend API which creates the payment intent
        // For now, this is a placeholder that would need to be implemented with Firebase Functions

        try {
            // TODO: Replace with actual Firebase Function call
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(amount * 100), // Convert to cents
                    currency,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Payment intent creation error:', error);
            throw error;
        }
    },

    // Confirm payment
    async confirmPayment(clientSecret: string, paymentMethodId: string): Promise<boolean> {
        const stripe = await getStripe();
        if (!stripe) throw new Error('Stripe not loaded');

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodId,
            });

            if (error) {
                console.error('Payment confirmation error:', error);
                return false;
            }

            return paymentIntent?.status === 'succeeded';
        } catch (error) {
            console.error('Payment error:', error);
            return false;
        }
    },

    // Process refund (Admin only - would call backend)
    async processRefund(paymentIntentId: string, amount?: number): Promise<boolean> {
        try {
            // TODO: Replace with actual Firebase Function call
            const response = await fetch('/api/refund-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentIntentId,
                    amount: amount ? Math.round(amount * 100) : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to process refund');
            }

            return true;
        } catch (error) {
            console.error('Refund error:', error);
            return false;
        }
    },
};

// Note: The actual Stripe payment processing requires a backend (Firebase Functions)
// This is a client-side wrapper that would communicate with those functions
