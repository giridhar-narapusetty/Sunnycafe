import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '../types/database.types';

interface CartItemCustomization {
    size?: string;
    sugarLevel?: string;
    milkType?: string;
    addons?: string[];
    specialInstructions?: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
    customization?: CartItemCustomization;
    itemTotal: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem, customization?: CartItemCustomization) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sunny-cafe-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sunny-cafe-cart', JSON.stringify(cart));
    }, [cart]);

    const calculateItemTotal = (item: MenuItem, quantity: number, customization?: CartItemCustomization): number => {
        let total = item.price * quantity;

        // Add customization costs
        if (customization) {
            // Size modifier
            if (customization.size && item.customizations?.sizes) {
                const sizeOption = item.customizations.sizes.find(s => s.name === customization.size);
                if (sizeOption) {
                    total += sizeOption.priceModifier * quantity;
                }
            }

            // Addons
            if (customization.addons && item.customizations?.addons) {
                customization.addons.forEach(addonName => {
                    const addon = item.customizations?.addons?.find(a => a.name === addonName);
                    if (addon) {
                        total += addon.price * quantity;
                    }
                });
            }
        }

        return total;
    };

    const addToCart = (item: MenuItem, customization?: CartItemCustomization) => {
        setCart(prevCart => {
            // Check if item with same customization exists
            const existingItemIndex = prevCart.findIndex(
                cartItem =>
                    cartItem.id === item.id &&
                    JSON.stringify(cartItem.customization) === JSON.stringify(customization)
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
                const updatedCart = [...prevCart];
                const newQuantity = updatedCart[existingItemIndex].quantity + 1;
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: newQuantity,
                    itemTotal: calculateItemTotal(item, newQuantity, customization),
                };
                return updatedCart;
            } else {
                // Add new item
                const newCartItem: CartItem = {
                    ...item,
                    quantity: 1,
                    customization,
                    itemTotal: calculateItemTotal(item, 1, customization),
                };
                return [...prevCart, newCartItem];
            }
        });
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prevCart =>
            prevCart
                .map(item => {
                    if (item.id === itemId) {
                        const newQuantity = Math.max(1, item.quantity + delta);
                        return {
                            ...item,
                            quantity: newQuantity,
                            itemTotal: calculateItemTotal(item, newQuantity, item.customization),
                        };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (itemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.itemTotal, 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value: CartContextType = {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
