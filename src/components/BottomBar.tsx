import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Flavor } from '../types';

interface BottomBarProps {
  currentFlavor: Flavor;
  onToggleFlavor: () => void;
  onSelectFlavor: (flavor: Flavor) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  currentFlavor,
  onToggleFlavor,
  onSelectFlavor,
}) => {
  return (
    <footer className="relative z-40 w-full py-4 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Quick Indicator Left */}
      <div className="hidden lg:flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
        <span className="w-2 h-2 rounded-full bg-white/40 animate-ping" />
        <span>Crafted with Organic Whole Milk Cream & Natural Extract</span>
      </div>

      {/* Center Flavor Navigation Box */}
      <div className="flex items-center gap-4 bg-black/40 border border-white/15 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-2xl">
        {/* Left Arrow Button */}
        <button
          onClick={onToggleFlavor}
          className="group p-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Previous flavor"
          title="Previous flavor"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Center Text & Flavor Selector Buttons */}
        <div className="flex items-center gap-3 px-2">
          <span className="font-display text-xs sm:text-sm font-black tracking-widest uppercase text-white/90 select-none">
            Choose Your Flavor
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => onSelectFlavor('chocolate')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                currentFlavor === 'chocolate'
                  ? 'bg-[#E29578] text-black shadow-md shadow-[#E29578]/30 scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              Chocolate
            </button>
            <button
              onClick={() => onSelectFlavor('berry')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                currentFlavor === 'berry'
                  ? 'bg-[#FF6492] text-white shadow-md shadow-[#FF6492]/40 scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              Berry
            </button>
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={onToggleFlavor}
          className="group p-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-300 hover:scale-110 active:scale-90"
          aria-label="Next flavor"
          title="Next flavor"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Right Micro Note */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-white/60">
        <span>Use [ ← / → ] keys to switch</span>
      </div>
    </footer>
  );
};
