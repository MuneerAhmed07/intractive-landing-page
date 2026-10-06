import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeftRight, MousePointerClick } from 'lucide-react';
import { Flavor, CanSize } from '../types';
import { FLAVORS, SIZES } from '../data/flavors';
import { SocialIcons } from './SocialIcons';

interface HeroSectionProps {
  currentFlavor: Flavor;
  direction: number;
  selectedSize: CanSize;
  onSelectSize: (size: CanSize) => void;
  onRightCtaClick: () => void;
  onToggleFlavor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentFlavor,
  direction,
  selectedSize,
  onSelectSize,
  onRightCtaClick,
  onToggleFlavor,
}) => {
  const flavor = FLAVORS[currentFlavor];

  // Motion variants for swipe effect
  const textVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 50,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: -dir * 50,
      filter: 'blur(4px)',
    }),
  };

  const bgTextVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 120,
      scale: 0.92,
      filter: 'blur(8px)',
    }),
    center: {
      opacity: 0.85,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: -dir * 120,
      scale: 1.05,
      filter: 'blur(8px)',
    }),
  };

  const canVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 160,
      y: 15,
      rotate: dir * 9,
      scale: 0.85,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: -dir * 160,
      y: -15,
      rotate: -dir * 9,
      scale: 0.85,
      filter: 'blur(4px)',
    }),
  };

  return (
    <section className="relative flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center min-h-[calc(100vh-140px)] py-6 select-none overflow-hidden">
      
      {/* Huge Bold Background Typography - Strictly contained with space on left & right */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-6 sm:px-12 md:px-16 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`bg-text-${flavor.largeText}`}
            custom={direction}
            variants={bgTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center select-none"
          >
            <h2 className="font-display font-black tracking-tight uppercase text-white/85 text-[clamp(2.5rem,7vw,6.5rem)] sm:text-[clamp(3.5rem,8vw,7.8rem)] md:text-[clamp(4.2rem,8.5vw,8.8rem)] max-w-5xl mx-auto drop-shadow-2xl leading-none">
              {flavor.largeText}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3-Column Responsive Grid Layout: Left Content | Center Can | Right Controls */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
        
        {/* LEFT COLUMN: Sub-header, Body text, Social icons (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1 space-y-6 lg:space-y-12">
          {/* Animated Sub-header & Body with Directional Swipe */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={flavor.id}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: flavor.accentColor }}
                />
                <span>Signature Edition · 24g Protein</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                {flavor.title}
              </h1>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                {flavor.description}
              </p>

              {/* Natural Specs */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/75">
                <span>{flavor.specs.protein} Protein</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>{flavor.specs.calories}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>{flavor.specs.sugars} Natural Sugar</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Social Icons at bottom-left */}
          <div className="pt-2">
            <SocialIcons />
          </div>
        </div>

        {/* CENTER COLUMN: 3D Product Render Can with Levitation & Rim Glow (lg:col-span-4) */}
        <div className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 my-4 lg:my-0 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          
          {/* Ambient Rim Glow behind Can */}
          <motion.div
            animate={{
              background: `radial-gradient(circle, ${flavor.glowColor} 0%, rgba(0,0,0,0) 70%)`,
              scale: [1, 1.08, 1],
            }}
            transition={{
              scale: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
              background: { duration: 0.6 },
            }}
            className="absolute w-72 sm:w-88 h-72 sm:h-88 rounded-full blur-2xl pointer-events-none -z-10"
          />

          {/* 3D Product Render Can with Splashes & Cookies / Berries */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`can-${flavor.id}`}
              custom={direction}
              variants={canVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[320px] sm:max-w-[390px] lg:max-w-[440px] flex items-center justify-center"
            >
              {/* Floating Levitation Loop Wrapper */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                }}
                className="relative group cursor-pointer"
                onClick={onRightCtaClick}
                title={`Click to order ${flavor.name} edition`}
              >
                {/* 3D Beverage Can Image */}
                <img
                  src={flavor.image}
                  alt={flavor.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] rounded-2xl filter saturate-[1.08] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Can Reflection & Gloss Line */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/10" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Scroll / Swipe Gesture Cue floating under can */}
          <div className="absolute -bottom-2 sm:bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
            <button
              onClick={onToggleFlavor}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono tracking-wider uppercase text-white/60 hover:text-white transition-all shadow-lg hover:scale-105"
              title="Click or scroll to swipe flavor"
            >
              <ArrowLeftRight className="w-3 h-3 text-white/70 group-hover:scale-110 transition-transform" />
              <span>Scroll or swipe to switch</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Size Controls & Explore/Order Button (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end order-3 space-y-6 lg:space-y-12">
          
          {/* Semi-transparent dark pill container titled "Choose your size" */}
          <div className="w-full sm:w-auto bg-black/45 border border-white/15 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/70 px-1">
              <span>Choose your size</span>
              <span className="font-mono text-[11px] text-white/50">
                {SIZES.find((s) => s.id === selectedSize)?.serves}
              </span>
            </div>

            {/* Size Options Pill Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
              {SIZES.map((size) => {
                const isActive = selectedSize === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => onSelectSize(size.id)}
                    className={`relative py-2 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-black shadow-lg shadow-white/20 scale-100'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>

            {/* Selected Size Specs snippet */}
            <div className="flex items-center justify-between px-1 text-xs text-white/60 font-mono">
              <span>Unit Price</span>
              <span className="font-bold text-white tabular-nums">
                ${SIZES.find((s) => s.id === selectedSize)?.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Bottom Right CTA: "Explore More" (Chocolate) / "Order Berry" (Berry) */}
          <div className="w-full sm:w-auto flex justify-start lg:justify-end">
            <button
              onClick={onRightCtaClick}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-white shadow-2xl hover:bg-neutral-100 hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={flavor.rightCta}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {flavor.rightCta}
                </motion.span>
              </AnimatePresence>

              {/* Circular arrow icon */}
              <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 text-black" />
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
