import { Timestamp } from 'firebase/firestore';

// ==================== User Types ====================

export interface Address {
    id: string;
    label: string; // 'Home', 'Work', etc.
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    phone?: string;
    photoURL?: string;
    addresses: Address[];
    loyaltyPoints: number;
    loyaltyTier: 'bronze' | 'silver' | 'gold';
    role: 'customer' | 'admin' | 'staff';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==================== Menu Types ====================

export interface MenuItemCustomization {
    sizes?: {
        name: string;
        priceModifier: number;
    }[];
    sugarLevels?: string[];
    milkTypes?: string[];
    addons?: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface Ingredient {
    id: string;
    quantity: number;
    unit: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'Hot' | 'Cold' | 'Specialty';
    image: string;
    available: boolean;
    featured: boolean;
    customizations?: MenuItemCustomization;
    ingredients?: Ingredient[];
    nutritionInfo?: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    tags?: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==================== Order Types ====================

export interface OrderItemCustomization {
    size?: string;
    sugarLevel?: string;
    milkType?: string;
    addons?: string[];
    specialInstructions?: string;
}

export interface OrderItem {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    customization?: OrderItemCustomization;
    subtotal: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'cash' | 'wallet';
export type OrderType = 'pickup' | 'delivery' | 'dine_in';

export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    discount: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    orderType: OrderType;
    deliveryAddress?: Address;
    tableNumber?: number;
    scheduledFor?: Timestamp;
    couponCode?: string;
    specialInstructions?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    completedAt?: Timestamp;
}

// ==================== Inventory Types ====================

export interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    unit: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    reorderPoint: number;
    costPerUnit: number;
    supplier?: string;
    lastRestocked: Timestamp;
    expiryDate?: Timestamp;
    category: 'ingredient' | 'packaging' | 'supplies';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface StockTransaction {
    id: string;
    inventoryItemId: string;
    type: 'restock' | 'usage' | 'waste' | 'adjustment';
    quantity: number;
    reason?: string;
    performedBy: string;
    createdAt: Timestamp;
}

// ==================== Analytics Types ====================

export interface DailyAnalytics {
    date: string; // YYYY-MM-DD
    revenue: number;
    orders: number;
    customers: number;
    averageOrderValue: number;
    topItems: {
        itemId: string;
        itemName: string;
        quantity: number;
        revenue: number;
    }[];
    peakHours: {
        hour: number;
        orders: number;
    }[];
    categoryBreakdown: {
        category: string;
        revenue: number;
        orders: number;
    }[];
}

// ==================== Coupon Types ====================

export type CouponType = 'percentage' | 'fixed' | 'free_delivery';

export interface Coupon {
    id: string;
    code: string;
    type: CouponType;
    value: number;
    description: string;
    minOrderAmount: number;
    maxDiscount?: number;
    validFrom: Timestamp;
    validUntil: Timestamp;
    usageCount: number;
    maxUsage?: number;
    maxUsagePerUser?: number;
    applicableCategories?: string[];
    active: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==================== Loyalty Types ====================

export interface LoyaltyTransaction {
    id: string;
    userId: string;
    type: 'earn' | 'redeem' | 'expire';
    points: number;
    orderId?: string;
    description: string;
    createdAt: Timestamp;
}

// ==================== Reservation Types ====================

export interface TableReservation {
    id: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    partySize: number;
    reservationDate: Timestamp;
    tableNumber?: number;
    status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
    specialRequests?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==================== Subscription Types ====================

export type SubscriptionPlan = 'daily' | 'weekly' | 'monthly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

export interface Subscription {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    menuItemId: string;
    customization?: OrderItemCustomization;
    deliveryAddress: Address;
    deliveryTime: string; // HH:mm
    deliveryDays?: number[]; // 0-6 (Sunday-Saturday)
    status: SubscriptionStatus;
    nextDelivery: Timestamp;
    startDate: Timestamp;
    endDate?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==================== Notification Types ====================

export type NotificationType = 'order_update' | 'promotion' | 'loyalty' | 'system';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    actionUrl?: string;
    createdAt: Timestamp;
}

// ==================== Review Types ====================

export interface Review {
    id: string;
    userId: string;
    orderId: string;
    menuItemId?: string;
    rating: number; // 1-5
    comment?: string;
    response?: {
        message: string;
        respondedBy: string;
        respondedAt: Timestamp;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
