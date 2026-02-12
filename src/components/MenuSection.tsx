
import React from 'react';
import { Plus } from 'lucide-react';
import { MENU_ITEMS, CATEGORY_ICONS } from '../constants/index.tsx';
import { MenuItem } from '../types/index';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  return (
    <div className="py-24 bg-amber-50/30 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif font-bold text-amber-900 mb-6">Our Full Menu</h2>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-amber-700 text-xl max-w-2xl mx-auto">
            Explore our handcrafted selection of drinks and treats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-amber-100"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 text-amber-900 font-bold text-xs shadow-md uppercase tracking-widest">
                  {CATEGORY_ICONS[item.category]}
                  {item.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-amber-900 group-hover:text-yellow-600 transition-colors">{item.name}</h3>
                  <span className="text-xl font-black text-amber-900">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-amber-600 text-sm mb-8 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full bg-amber-50 hover:bg-yellow-400 text-amber-900 hover:text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-amber-100 hover:border-yellow-400"
                >
                  <Plus size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
