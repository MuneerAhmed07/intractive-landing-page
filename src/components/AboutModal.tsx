import React from 'react';
import { X, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { lineupImg } from '../data/flavors';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onExploreProducts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-[#161214] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close about dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E29578]">
            Brand Heritage
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white uppercase">
            About Power Crunch
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Born from an obsession with culinary craftsmanship and athletic performance. We eliminated the grainy, chalky texture of traditional protein shakes to create a canned drink that rivals the finest artisan milkshakes.
          </p>
        </div>

        {/* Lineup image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 my-6 shadow-xl">
          <img
            src={lineupImg}
            alt="Power Crunch Chocolate and Berry cans side by side"
            referrerPolicy="no-referrer"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-mono text-white/90">
              Hand-formulated with Grass-Fed Dairy & Natural Botanical Flavors
            </span>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-[#E29578] font-bold text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Zero Chalk
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Proprietary micro-filtration delivers an ultra-silky mouthfeel that feels like melted ice cream.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-[#FF6492] font-bold text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Clean Fuel
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              24g cold-processed whey isolate with zero artificial dyes, no sucralose, and only natural sweetness.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Ready Anywhere
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Infinitely recyclable slim aluminum cans that cool down in ice water in under 4 minutes.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onExploreProducts();
          }}
          className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors shadow-lg"
        >
          Explore All Flavors
        </button>
      </div>
    </div>
  );
};
