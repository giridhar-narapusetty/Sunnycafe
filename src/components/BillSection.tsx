
import React, { useState } from 'react';
import { Trash2, Receipt, Minus, Plus, RefreshCw, User, Sun, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types/index';

interface BillSectionProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const BillSection: React.FC<BillSectionProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleGenerateBill = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    setShowReceipt(true);
  };

  if (cart.length === 0 && !showReceipt) {
    return (
      <div className="py-32 text-center animate-in fade-in duration-500">
        <div className="inline-flex p-6 bg-amber-50 rounded-full text-amber-300 mb-6">
          <Receipt size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-amber-900 mb-4">Your Cart is Empty</h2>
        <p className="text-amber-600 mb-8">It looks like you haven't added any sunshine to your order yet.</p>
        <button
          onClick={() => window.location.reload()} // Quick hack to trigger nav or just let user click nav
          className="bg-yellow-400 text-white px-8 py-4 rounded-2xl font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-100"
        >
          Browse Our Menu
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-[3rem] p-8 md:p-12 border border-amber-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold text-amber-900">Checkout</h2>
              <p className="text-amber-600 font-medium mt-1">Review items and finalize your sunny order</p>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
            >
              <RefreshCw size={18} />
              Clear Cart
            </button>
          </div>

          <div className="space-y-10">
            <div className="relative">
              <label className="block text-amber-900 font-black mb-3 ml-1 text-xs uppercase tracking-[0.2em]">
                Customer Information
              </label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="What's your name?"
                  className="w-full bg-white border-2 border-amber-100 rounded-[1.5rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 outline-none transition-all text-amber-900 font-bold"
                />
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-amber-50">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-6 border-b border-amber-50 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-amber-900">{item.name}</h4>
                      <p className="text-sm text-amber-500">${item.price.toFixed(2)} / unit</p>
                    </div>

                    <div className="flex items-center gap-4 bg-amber-50 rounded-xl px-2 py-1 mx-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white rounded-lg text-amber-700 transition-all active:scale-90"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-black text-amber-900 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white rounded-lg text-amber-700 transition-all active:scale-90"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="w-24 text-right font-black text-xl text-amber-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-6 p-2 text-amber-200 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}

                <div className="pt-8 mt-4 border-t-2 border-dashed border-amber-100 space-y-3">
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>Service Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-3xl font-serif font-black text-amber-900 pt-4">
                    <span>Order Total</span>
                    <span className="text-yellow-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateBill}
              className="w-full bg-amber-900 hover:bg-black text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-amber-100 text-lg"
            >
              <Receipt size={24} />
              Finalize Order & Print Bill
            </button>
          </div>
        </div>
      </div>

      {showReceipt && (
        <div className="fixed inset-0 z-[60] bg-amber-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 relative animate-in zoom-in duration-300 shadow-2xl">
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-8 right-8 text-amber-200 hover:text-amber-900 transition-colors"
            >
              <Plus className="rotate-45" size={32} />
            </button>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                <Sun size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-amber-900">Receipt</h3>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Sunny Cafe • Fresh Daily</p>
            </div>

            <div className="space-y-4 text-amber-900 border-y border-amber-50 py-8 mb-8">
              <div className="flex justify-between">
                <span className="text-sm opacity-50 font-bold uppercase tracking-widest">Customer</span>
                <span className="font-black text-lg">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm opacity-50 font-bold uppercase tracking-widest">Order Date</span>
                <span className="font-bold">{new Date().toLocaleDateString()}</span>
              </div>

              <div className="py-6 space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-medium">{item.name} <span className="text-amber-400">×{item.quantity}</span></span>
                    <span className="font-black">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-amber-100 pt-6 space-y-2">
                <div className="flex justify-between text-xl font-black pt-2">
                  <span>Paid Total</span>
                  <span className="text-yellow-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-amber-600 font-bold italic mb-8">"Sunshine in every sip!"</p>
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full py-4 bg-yellow-400 text-white rounded-2xl font-black hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-100"
              >
                Download PDF Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillSection;
