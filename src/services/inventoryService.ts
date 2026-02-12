import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    Timestamp,
    onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { InventoryItem, StockTransaction } from '../types/database.types';
import { appConfig } from '../config/app.config';

const INVENTORY_COLLECTION = 'inventory';
const TRANSACTIONS_COLLECTION = 'stock_transactions';

export const inventoryService = {
    // Get all inventory items
    async getAllItems(): Promise<InventoryItem[]> {
        const querySnapshot = await getDocs(collection(db, INVENTORY_COLLECTION));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem));
    },

    // Get low stock items
    async getLowStockItems(): Promise<InventoryItem[]> {
        const allItems = await this.getAllItems();
        return allItems.filter(item => item.currentStock <= item.minStock);
    },

    // Get critical stock items
    async getCriticalStockItems(): Promise<InventoryItem[]> {
        const allItems = await this.getAllItems();
        return allItems.filter(item => item.currentStock <= appConfig.inventory.criticalStockThreshold);
    },

    // Get item by ID
    async getItemById(id: string): Promise<InventoryItem | null> {
        const docRef = doc(db, INVENTORY_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as InventoryItem;
        }
        return null;
    },

    // Add new inventory item
    async addItem(itemData: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const newItem = {
            ...itemData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, INVENTORY_COLLECTION), newItem);
        return docRef.id;
    },

    // Update inventory item
    async updateItem(id: string, updates: Partial<InventoryItem>): Promise<void> {
        const docRef = doc(db, INVENTORY_COLLECTION, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: Timestamp.now(),
        });
    },

    // Restock item
    async restockItem(id: string, quantity: number, performedBy: string): Promise<void> {
        const item = await this.getItemById(id);
        if (!item) throw new Error('Item not found');

        const newStock = item.currentStock + quantity;

        // Update inventory
        await this.updateItem(id, {
            currentStock: newStock,
            lastRestocked: Timestamp.now(),
        });

        // Record transaction
        await this.recordTransaction({
            inventoryItemId: id,
            type: 'restock',
            quantity,
            reason: 'Manual restock',
            performedBy,
        });
    },

    // Deduct stock (when order is placed)
    async deductStock(id: string, quantity: number, orderId: string): Promise<void> {
        const item = await this.getItemById(id);
        if (!item) throw new Error('Item not found');

        const newStock = Math.max(0, item.currentStock - quantity);

        await this.updateItem(id, {
            currentStock: newStock,
        });

        await this.recordTransaction({
            inventoryItemId: id,
            type: 'usage',
            quantity: -quantity,
            reason: `Order ${orderId}`,
            performedBy: 'system',
        });
    },

    // Record waste
    async recordWaste(id: string, quantity: number, reason: string, performedBy: string): Promise<void> {
        const item = await this.getItemById(id);
        if (!item) throw new Error('Item not found');

        const newStock = Math.max(0, item.currentStock - quantity);

        await this.updateItem(id, {
            currentStock: newStock,
        });

        await this.recordTransaction({
            inventoryItemId: id,
            type: 'waste',
            quantity: -quantity,
            reason,
            performedBy,
        });
    },

    // Record stock transaction
    async recordTransaction(transactionData: Omit<StockTransaction, 'id' | 'createdAt'>): Promise<string> {
        const transaction = {
            ...transactionData,
            createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), transaction);
        return docRef.id;
    },

    // Get transactions for an item
    async getItemTransactions(inventoryItemId: string, limitCount: number = 50): Promise<StockTransaction[]> {
        const q = query(
            collection(db, TRANSACTIONS_COLLECTION),
            where('inventoryItemId', '==', inventoryItemId)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StockTransaction));
    },

    // Subscribe to inventory updates (real-time)
    subscribeToInventory(callback: (items: InventoryItem[]) => void): () => void {
        const unsubscribe = onSnapshot(collection(db, INVENTORY_COLLECTION), (querySnapshot) => {
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem));
            callback(items);
        });

        return unsubscribe;
    },

    // Subscribe to low stock alerts (real-time)
    subscribeToLowStockAlerts(callback: (items: InventoryItem[]) => void): () => void {
        const unsubscribe = onSnapshot(collection(db, INVENTORY_COLLECTION), (querySnapshot) => {
            const items = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem))
                .filter(item => item.currentStock <= item.minStock);
            callback(items);
        });

        return unsubscribe;
    },

    // Check if item needs reorder
    needsReorder(item: InventoryItem): boolean {
        return item.currentStock <= item.reorderPoint;
    },

    // Get reorder suggestions
    async getReorderSuggestions(): Promise<InventoryItem[]> {
        const allItems = await this.getAllItems();
        return allItems.filter(item => this.needsReorder(item));
    },
};
