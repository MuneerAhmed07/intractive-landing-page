import React from 'react';
import { ArrowUpRight, Sparkles, Menu, X } from 'lucide-react';
import { Flavor } from '../types';

interface HeaderProps {
  currentFlavor: Flavor;
  activeTab: 'products' | 'contact' | null;
  onSelectTab: (tab: 'products' | 'contact') => void;
  onOpenOrder: () => void;
  onOpenAbout: () => void;
  onOpenProducts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentFlavor,
  activeTab,
  onSelectTab,
  onOpenOrder,
  onOpenAbout,
  onOpenProducts,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="relative z-50 w-full pt-5 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Power Crunch Home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${
                currentFlavor === 'chocolate' ? 'bg-[#D4A373]' : 'bg-[#FF6492]'
              }`} />
            </span>
            <span className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-white uppercase drop-shadow-sm">
              Power <span className={currentFlavor === 'chocolate' ? 'text-[#E29578]' : 'text-[#FF7FA8]'}>Crunch</span>
            </span>
          </a>
        </div>

        {/* Sub-Navigation Pill (Center Floating) */}
        <div className="hidden md:flex items-center">
          <div className="inline-flex items-center p-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-xl shadow-2xl transition-all">
            <button
              onClick={() => onSelectTab('products')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeTab === 'products'
                  ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onSelectTab('contact')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeTab === 'contact'
                  ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Right: Navigation Links & Place Order CTA */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium text-white/80">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={onOpenProducts}
              className="hover:text-white transition-colors duration-200"
            >
              Products
            </button>
            <button
              onClick={onOpenAbout}
              className="hover:text-white transition-colors duration-200"
            >
              About us
            </button>
          </nav>

          <button
            onClick={onOpenOrder}
            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white shadow-xl hover:bg-amber-100 hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <span>Place Order</span>
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenOrder}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white"
          >
            Order ➔
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 border border-white/20 text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pill for Mobile (Floating under bar) */}
      <div className="md:hidden flex justify-center mt-3">
        <div className="inline-flex items-center p-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-xl">
          <button
            onClick={() => onSelectTab('products')}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'products'
                ? 'bg-white text-black'
                : 'text-white/80'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
              activeTab === 'contact'
                ? 'bg-white text-black'
                : 'text-white/80'
            }`}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-6 right-6 mt-2 p-5 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 z-50">
          <nav className="flex flex-col gap-3 text-sm font-medium text-white/90">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-1 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProducts();
              }}
              className="text-left py-1 hover:text-white"
            >
              Products
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left py-1 hover:text-white"
            >
              About us
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectTab('contact');
              }}
              className="text-left py-1 hover:text-white"
            >
              Contact Us
            </button>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white flex items-center justify-center gap-2"
          >
            <span>Place Order</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
