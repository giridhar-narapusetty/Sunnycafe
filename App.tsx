
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import BillSection from './components/BillSection';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import { Coffee } from 'lucide-react';
import { MenuItem, CartItem } from './types';

export type Page = 'home' | 'menu' | 'bill' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Persistent cart in local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('sunny-cafe-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('sunny-cafe-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={setCurrentPage} />;
      case 'menu':
        return <MenuSection onAddToCart={addToCart} />;
      case 'bill':
        return (
          <BillSection 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200 flex flex-col">
      <Navbar 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />

      <main className="flex-grow pt-20">
        <div key={currentPage} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderPage()}
        </div>
      </main>

      {/* Persistence Floating Cart (Only if items in cart and NOT on bill page) */}
      {cart.length > 0 && currentPage !== 'bill' && (
        <button 
          onClick={() => setCurrentPage('bill')}
          className="fixed bottom-8 right-8 z-[100] bg-amber-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 active:scale-95"
        >
          <div className="relative">
            <Coffee size={28} />
            <span className="absolute -top-3 -right-3 bg-yellow-400 text-amber-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-sm ring-2 ring-amber-900">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <span className="font-bold pr-2">Checkout</span>
        </button>
      )}

      {/* Shared Footer */}
      <footer className="bg-amber-50 py-12 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} Sunny Cafe. Designed for Happiness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
