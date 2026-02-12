
import React, { useState } from 'react';
import { Menu, X, Sun, ShoppingCart } from 'lucide-react';
import { Page } from '../App';

interface NavbarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; page: Page }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Menu', page: 'menu' },
    { name: 'Bill', page: 'bill' },
    { name: 'About Us', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: Page) => {
    onPageChange(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-amber-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="bg-yellow-400 p-2 rounded-full transition-transform group-hover:rotate-12">
              <Sun className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-amber-900 leading-none block">Sunny Cafe</span>
              <span className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">Fresh Drinks, Happy Moments</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePage === link.page 
                    ? 'text-amber-900 bg-amber-50' 
                    : 'text-amber-700 hover:text-yellow-600 hover:bg-amber-50/50'
                }`}
              >
                {link.name}
                {link.page === 'bill' && cartCount > 0 && (
                  <span className="ml-2 bg-yellow-400 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {cartCount > 0 && activePage !== 'bill' && (
              <button onClick={() => handleLinkClick('bill')} className="relative p-2 text-amber-900">
                <ShoppingCart size={24} />
                <span className="absolute top-0 right-0 bg-yellow-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 hover:text-yellow-600 transition-colors p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 py-6 px-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page)}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-lg transition-colors ${
                activePage === link.page 
                  ? 'bg-yellow-400 text-white' 
                  : 'text-amber-900 active:bg-amber-50'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
