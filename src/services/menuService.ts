import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase.config';
import { MenuItem } from '../types/database.types';

const COLLECTION_NAME = 'menu_items';

export const menuService = {
    // Get all menu items
    async getAllItems(): Promise<MenuItem[]> {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    },

    // Get available menu items only
    async getAvailableItems(): Promise<MenuItem[]> {
        const q = query(collection(db, COLLECTION_NAME), where('available', '==', true));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    },

    // Get items by category
    async getItemsByCategory(category: string): Promise<MenuItem[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('category', '==', category),
            where('available', '==', true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    },

    // Get featured items
    async getFeaturedItems(): Promise<MenuItem[]> {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('featured', '==', true),
            where('available', '==', true),
            limit(6)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
    },

    // Get single item by ID
    async getItemById(id: string): Promise<MenuItem | null> {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as MenuItem;
        }
        return null;
    },

    // Search items
    async searchItems(searchTerm: string): Promise<MenuItem[]> {
        const allItems = await this.getAvailableItems();
        const lowerSearch = searchTerm.toLowerCase();

        return allItems.filter(item =>
            item.name.toLowerCase().includes(lowerSearch) ||
            item.description.toLowerCase().includes(lowerSearch) ||
            item.tags?.some(tag => tag.toLowerCase().includes(lowerSearch))
        );
    },

    // Add new menu item (Admin only)
    async addItem(itemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        const newItem = {
            ...itemData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), newItem);
        return docRef.id;
    },

    // Update menu item (Admin only)
    async updateItem(id: string, updates: Partial<MenuItem>): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: Timestamp.now(),
        });
    },

    // Delete menu item (Admin only)
    async deleteItem(id: string): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    },

    // Toggle item availability (Admin only)
    async toggleAvailability(id: string, available: boolean): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            available,
            updatedAt: Timestamp.now(),
        });
    },

    // Upload item image
    async uploadImage(file: File, itemId: string): Promise<string> {
        const storageRef = ref(storage, `menu_images/${itemId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    },
};
