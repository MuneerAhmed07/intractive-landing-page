import React, { useState } from 'react';

export const SocialIcons: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClick = (platform: string, handle: string) => {
    setToastMessage(`Opened @${handle} on ${platform}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* TikTok */}
      <button
        onClick={() => handleClick('TikTok', 'powercrunch.beverage')}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Power Crunch on TikTok"
        title="TikTok: @powercrunch.beverage"
      >
        <svg
          className="w-5 h-5 fill-white group-hover:fill-amber-200 transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.1 15.69a6.34 6.34 0 0 0 10.82 4.47 6.29 6.29 0 0 0 1.86-4.49V8.75a8.22 8.22 0 0 0 4.84 1.56v-3.5a4.84 4.84 0 0 1-1.03-.12z" />
        </svg>
      </button>

      {/* Instagram */}
      <button
        onClick={() => handleClick('Instagram', 'powercrunchdrink')}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Power Crunch on Instagram"
        title="Instagram: @powercrunchdrink"
      >
        <svg
          className="w-5 h-5 fill-white group-hover:fill-pink-200 transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </button>

      {/* Floating feedback toast */}
      {toastMessage && (
        <div className="absolute left-0 -top-9 whitespace-nowrap bg-black/80 text-white text-xs font-medium py-1 px-3 rounded-full border border-white/20 backdrop-blur-md animate-fade-in shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
