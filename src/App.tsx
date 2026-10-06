/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Flavor, CanSize } from './types';
import { FLAVORS } from './data/flavors';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BottomBar } from './components/BottomBar';
import { OrderDrawer } from './components/OrderDrawer';
import { ProductsModal } from './components/ProductsModal';
import { ContactModal } from './components/ContactModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [currentFlavor, setCurrentFlavor] = useState<Flavor>('chocolate');
  const [direction, setDirection] = useState<number>(1); // 1 = forward/right, -1 = backward/left
  const [selectedSize, setSelectedSize] = useState<CanSize>('330ml');
  const [activeTab, setActiveTab] = useState<'products' | 'contact' | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Wheel and touch gesture refs for swipe effect on scrolling
  const isScrollingRef = useRef(false);
  const wheelDeltaAccumulator = useRef(0);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Subtle sensory sound effect generator using Web Audio API
  const playSwoosh = useCallback((freq = 440) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled]);

  const toggleFlavor = useCallback((targetDir?: number) => {
    const newDir = targetDir !== undefined ? targetDir : 1;
    setDirection(newDir);
    setCurrentFlavor((prev) => {
      const next = prev === 'chocolate' ? 'berry' : 'chocolate';
      playSwoosh(next === 'berry' ? 520 : 380);
      return next;
    });
  }, [playSwoosh]);

  const selectFlavor = useCallback((flavor: Flavor) => {
    if (flavor !== currentFlavor) {
      setDirection(flavor === 'berry' ? 1 : -1);
      setCurrentFlavor(flavor);
      playSwoosh(flavor === 'berry' ? 520 : 380);
    }
  }, [currentFlavor, playSwoosh]);

  // Swipe Effect on Scrolling (Mouse Wheel & Trackpad)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ignore wheel events if a modal or order drawer is open
      if (isOrderDrawerOpen || isAboutModalOpen || activeTab !== null) {
        return;
      }

      // Check if user is scrolling inside an element that has vertical overflow
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.overflow-y-auto')) {
        return;
      }

      wheelDeltaAccumulator.current += e.deltaY + e.deltaX;

      // Threshold to prevent micro-jitters
      if (Math.abs(wheelDeltaAccumulator.current) > 30 && !isScrollingRef.current) {
        isScrollingRef.current = true;
        const dir = wheelDeltaAccumulator.current > 0 ? 1 : -1;
        toggleFlavor(dir);
        wheelDeltaAccumulator.current = 0;

        // Cooldown period for smooth swipe settling
        setTimeout(() => {
          isScrollingRef.current = false;
          wheelDeltaAccumulator.current = 0;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isOrderDrawerOpen, isAboutModalOpen, activeTab, toggleFlavor]);

  // Touch Swipe Handlers for Mobile & Tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isOrderDrawerOpen || isAboutModalOpen || activeTab !== null) return;
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || isOrderDrawerOpen || isAboutModalOpen || activeTab !== null) {
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;
    touchStartPos.current = null;

    // Minimum swipe threshold
    if (Math.abs(deltaX) > 35 || Math.abs(deltaY) > 35) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe (left = forward, right = backward)
        const dir = deltaX < 0 ? 1 : -1;
        toggleFlavor(dir);
      } else {
        // Vertical swipe (up = forward, down = backward)
        const dir = deltaY < 0 ? 1 : -1;
        toggleFlavor(dir);
      }
    }
  };

  // Keyboard navigation support: Left / Right / Up / Down arrows toggle flavors
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        toggleFlavor(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        toggleFlavor(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFlavor]);

  const handleTabClick = (tab: 'products' | 'contact') => {
    setActiveTab(tab);
    playSwoosh(480);
  };

  const handleRightCtaClick = () => {
    setIsOrderDrawerOpen(true);
    playSwoosh(560);
  };

  const currentConfig = FLAVORS[currentFlavor];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden transition-colors duration-700 ease-out select-none"
    >
      {/* Dynamic Background Gradient with smooth crossfade */}
      <motion.div
        key={`bg-${currentFlavor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 pointer-events-none -z-20"
        style={{
          background: currentConfig.bgGradient,
        }}
      />

      {/* Ambient background depth vignette & subtle particle sheen */}
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none -z-10 mix-blend-multiply opacity-70" />

      {/* Decorative floating organic light patches */}
      <div
        className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentConfig.accentColor }}
      />
      <div
        className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentConfig.accentColor }}
      />

      {/* 1. Navigation Header */}
      <Header
        currentFlavor={currentFlavor}
        activeTab={activeTab}
        onSelectTab={handleTabClick}
        onOpenOrder={() => {
          setIsOrderDrawerOpen(true);
          playSwoosh(540);
        }}
        onOpenAbout={() => {
          setIsAboutModalOpen(true);
          playSwoosh(460);
        }}
        onOpenProducts={() => {
          setActiveTab('products');
          playSwoosh(480);
        }}
      />

      {/* 2. Hero Layout & Theme Switching Mechanics with Swipe Effect */}
      <main className="relative flex-1 flex flex-col justify-center overflow-hidden">
        <HeroSection
          currentFlavor={currentFlavor}
          direction={direction}
          selectedSize={selectedSize}
          onSelectSize={(size) => {
            setSelectedSize(size);
            playSwoosh(420);
          }}
          onRightCtaClick={handleRightCtaClick}
          onToggleFlavor={() => toggleFlavor(1)}
        />
      </main>

      {/* 3. Bottom Interactive Toolbar & Flavor Switcher */}
      <BottomBar
        currentFlavor={currentFlavor}
        onToggleFlavor={() => toggleFlavor(1)}
        onSelectFlavor={selectFlavor}
      />

      {/* Floating Sound Feedback Toggle (Discreet bottom-left) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/50 hover:text-white backdrop-blur-md transition-all duration-200"
          title={soundEnabled ? 'Mute sound effects' : 'Enable audio feedback'}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable audio feedback'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Interactive Overlays & Modals */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        initialFlavor={currentFlavor}
        initialSize={selectedSize}
      />

      <ProductsModal
        isOpen={activeTab === 'products'}
        onClose={() => setActiveTab(null)}
        onSelectFlavor={(f) => {
          selectFlavor(f);
        }}
        onOrderNow={(f) => {
          selectFlavor(f);
          setIsOrderDrawerOpen(true);
        }}
      />

      <ContactModal
        isOpen={activeTab === 'contact'}
        onClose={() => setActiveTab(null)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onExploreProducts={() => {
          setActiveTab('products');
        }}
      />
    </div>
  );
}
