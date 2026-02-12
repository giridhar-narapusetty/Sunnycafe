import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    onSnapshot,
    limit as firestoreLimit,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Order, OrderStatus, OrderItem } from '../types/database.types';

const COLLECTION_NAME = 'orders';

export const orderService = {
    // Create new order
    async createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<string> {
        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const newOrder: Omit<Order, 'id'> = {
            ...orderData,
            orderNumber,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), newOrder);
        return docRef.id;
    },

    // Get order by ID
    async getOrderById(id: string): Promise<Order | null> {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Order;
        }
        return null;
    },

    // Get user orders
    async getUserOrders(userId: string, limitCount: number = 20): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            firestoreLimit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Get all orders (Admin only)
    async getAllOrders(limitCount: number = 50): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('createdAt', 'desc'),
            firestoreLimit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Get orders by status (Admin only)
    async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('status', '==', status),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Get pending orders (Admin only)
    async getPendingOrders(): Promise<Order[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('status', 'in', ['pending', 'confirmed', 'preparing']),
            orderBy('createdAt', 'asc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Update order status
    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, orderId);
        const updates: Partial<Order> = {
            status,
            updatedAt: Timestamp.now(),
        };

        if (status === 'delivered') {
            updates.completedAt = Timestamp.now();
        }

        await updateDoc(docRef, updates);
    },

    // Update payment status
    async updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, orderId);
        await updateDoc(docRef, {
            paymentStatus,
            updatedAt: Timestamp.now(),
        });
    },

    // Cancel order
    async cancelOrder(orderId: string, reason?: string): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, orderId);
        await updateDoc(docRef, {
            status: 'cancelled',
            specialInstructions: reason ? `Cancelled: ${reason}` : 'Cancelled by user',
            updatedAt: Timestamp.now(),
        });
    },

    // Listen to order updates (real-time)
    subscribeToOrder(orderId: string, callback: (order: Order | null) => void): () => void {
        const docRef = doc(db, COLLECTION_NAME, orderId);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback({ id: docSnap.id, ...docSnap.data() } as Order);
            } else {
                callback(null);
            }
        });

        return unsubscribe;
    },

    // Listen to user orders (real-time)
    subscribeToUserOrders(userId: string, callback: (orders: Order[]) => void): () => void {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            firestoreLimit(20)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            callback(orders);
        });

        return unsubscribe;
    },

    // Listen to pending orders (Admin - real-time)
    subscribeToPendingOrders(callback: (orders: Order[]) => void): () => void {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('status', 'in', ['pending', 'confirmed', 'preparing']),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            callback(orders);
        });

        return unsubscribe;
    },

    // Get order statistics (Admin only)
    async getOrderStats(startDate: Date, endDate: Date) {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('createdAt', '>=', Timestamp.fromDate(startDate)),
            where('createdAt', '<=', Timestamp.fromDate(endDate))
        );

        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

        const stats = {
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
            averageOrderValue: 0,
            completedOrders: orders.filter(o => o.status === 'delivered').length,
            cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
        };

        stats.averageOrderValue = stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0;

        return stats;
    },
};
