import React, { useState } from 'react';
import { X, Send, Mail, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState<'retail' | 'press' | 'support'>('retail');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#161314] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-white/50">
            Get In Touch
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">
            Contact Power Crunch
          </h2>
          <p className="text-white/70 text-xs sm:text-sm">
            For retail wholesale partnerships, gym distribution, press kits, or customer care.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Message Transmitted</h3>
            <p className="text-xs text-white/70 max-w-xs mx-auto">
              Thank you {name}. Our beverage logistics and partner desk will respond to {email} within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inquiry Type */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTopic('retail')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  topic === 'retail'
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                Retail / Stockist
              </button>
              <button
                type="button"
                onClick={() => setTopic('press')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  topic === 'press'
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                Press & Athlete
              </button>
              <button
                type="button"
                onClick={() => setTopic('support')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  topic === 'support'
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white/70 border-white/10'
                }`}
              >
                Order Support
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                required
                placeholder="Your Name or Organization"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white"
              />
              <textarea
                required
                rows={3}
                placeholder="Tell us about your distribution needs, retail locations, or question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 text-center text-[11px] text-white/50 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> hello@powercrunchdrink.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Los Angeles · London
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
