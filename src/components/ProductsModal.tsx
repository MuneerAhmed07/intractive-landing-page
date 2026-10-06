import React from 'react';
import { X, Check, Droplets, Zap, Shield, Sparkles } from 'lucide-react';
import { Flavor } from '../types';
import { FLAVORS, lineupImg } from '../data/flavors';

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFlavor: (flavor: Flavor) => void;
  onOrderNow: (flavor: Flavor) => void;
}

export const ProductsModal: React.FC<ProductsModalProps> = ({
  isOpen,
  onClose,
  onSelectFlavor,
  onOrderNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-[#171415] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
            The Power Crunch Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Flavor Architecture & Nutrition
          </h2>
          <p className="text-white/70 text-sm max-w-xl">
            Engineered with grass-fed organic milk cream and ultra-purified whey isolate. Zero chalky aftertaste, full velvet texture.
          </p>
        </div>

        {/* Flavor Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {(['chocolate', 'berry'] as Flavor[]).map((fId) => {
            const item = FLAVORS[fId];
            return (
              <div
                key={fId}
                className="relative rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-white/25 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      {item.name} Edition
                    </span>
                    <span className="text-xs font-mono text-white/50">{item.tagline}</span>
                  </div>

                  <div className="h-44 flex items-center justify-center overflow-hidden my-2">
                    <img
                      src={item.image}
                      alt={item.altText}
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mt-3">{item.title}</h3>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.description}</p>

                  {/* Tasting Notes */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-2">
                      Key Tasting Notes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="text-xs text-white/90 bg-white/10 px-2.5 py-1 rounded-lg"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectFlavor(fId);
                      onClose();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    View in Hero
                  </button>
                  <button
                    onClick={() => {
                      onOrderNow(fId);
                      onClose();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg"
                  >
                    Order {item.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Universal Standards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div>
            <div className="text-lg font-extrabold text-white font-display">24g</div>
            <div className="text-[11px] uppercase tracking-wider text-white/50">Whey Isolate</div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-display">1-2g</div>
            <div className="text-[11px] uppercase tracking-wider text-white/50">Natural Sugars</div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-display">95mg</div>
            <div className="text-[11px] uppercase tracking-wider text-white/50">Green Tea Caffeine</div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-white font-display">0g</div>
            <div className="text-[11px] uppercase tracking-wider text-white/50">Artificial Syrups</div>
          </div>
        </div>
      </div>
    </div>
  );
};
