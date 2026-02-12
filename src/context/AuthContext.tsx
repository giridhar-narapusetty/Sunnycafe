import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import { User } from '../types/database.types';

interface AuthContextType {
    currentUser: FirebaseUser | null;
    userData: User | null;
    loading: boolean;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from Firestore
    const fetchUserData = async (uid: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data() as User);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Sign up with email and password
    const signup = async (email: string, password: string, displayName: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, { displayName });

        // Create user document in Firestore
        const newUser: User = {
            uid: user.uid,
            email: user.email!,
            displayName,
            addresses: [],
            loyaltyPoints: 0,
            loyaltyTier: 'bronze',
            role: 'customer',
            createdAt: new Date() as any,
            updatedAt: new Date() as any,
        };

        await setDoc(doc(db, 'users', user.uid), newUser);
        setUserData(newUser);
    };

    // Login with email and password
    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Login with Google
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if user document exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            // Create new user document
            const newUser: User = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || 'User',
                photoURL: user.photoURL || undefined,
                addresses: [],
                loyaltyPoints: 0,
                loyaltyTier: 'bronze',
                role: 'customer',
                createdAt: new Date() as any,
                updatedAt: new Date() as any,
            };

            await setDoc(doc(db, 'users', user.uid), newUser);
            setUserData(newUser);
        }
    };

    // Logout
    const logout = async () => {
        await signOut(auth);
        setUserData(null);
    };

    // Reset password
    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    // Update user profile
    const updateUserProfile = async (data: Partial<User>) => {
        if (!currentUser) throw new Error('No user logged in');

        await updateDoc(doc(db, 'users', currentUser.uid), {
            ...data,
            updatedAt: new Date(),
        });

        await fetchUserData(currentUser.uid);
    };

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserData(user.uid);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        userData,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
