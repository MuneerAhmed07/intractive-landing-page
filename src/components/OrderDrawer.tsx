import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Flavor, CanSize } from '../types';
import { FLAVORS, SIZES } from '../data/flavors';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialFlavor: Flavor;
  initialSize: CanSize;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  initialFlavor,
  initialSize,
}) => {
  const [flavor, setFlavor] = useState<Flavor>(initialFlavor);
  const [size, setSize] = useState<CanSize>(initialSize);
  const [packType, setPackType] = useState<'single' | '4pack' | '12pack'>('4pack');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Keep synced if opened with fresh prop
  React.useEffect(() => {
    if (isOpen) {
      setFlavor(initialFlavor);
      setSize(initialSize);
      setIsSubmitted(false);
    }
  }, [isOpen, initialFlavor, initialSize]);

  if (!isOpen) return null;

  const currentSizeObj = SIZES.find((s) => s.id === size) || SIZES[1];
  const baseUnitPrice = currentSizeObj.price;

  const getPackPrice = () => {
    if (packType === 'single') return baseUnitPrice;
    if (packType === '4pack') return baseUnitPrice * 4 * 0.95; // 5% discount
    return baseUnitPrice * 12 * 0.85; // 15% discount
  };

  const packTotal = getPackPrice() * quantity;
  const shipping = packType === '12pack' || packTotal > 35 ? 0 : 4.99;
  const finalTotal = packTotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `PC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#141214] border-l border-white/15 h-full overflow-y-auto flex flex-col justify-between shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                Direct Delivery
              </span>
              <h2 className="font-display text-2xl font-bold text-white uppercase">
                {isSubmitted ? 'Order Confirmed' : 'Place Your Order'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close order drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Thank You for Your Order!</h3>
                <p className="text-sm text-white/70 max-w-sm">
                  We've received your request for fresh Power Crunch cans. A confirmation and tracking receipt have been dispatched to{' '}
                  <span className="text-white font-medium">{customerEmail || 'your email'}</span>.
                </p>
              </div>

              <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Tracking Reference</span>
                  <span className="text-white font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Item Selected</span>
                  <span className="text-white capitalize">{flavor} · {size} ({packType})</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Quantity</span>
                  <span className="text-white">{quantity}</span>
                </div>
                <div className="flex justify-between text-white/60 pt-2 border-t border-white/10">
                  <span>Total Billed</span>
                  <span className="text-white font-bold text-sm">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors"
              >
                Return to Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-6 space-y-6">
              {/* Flavor Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Select Flavor
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['chocolate', 'berry'] as Flavor[]).map((f) => {
                    const cfg = FLAVORS[f];
                    const isSelected = flavor === f;
                    return (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setFlavor(f)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-white/15 border-white text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: cfg.accentColor }}
                        />
                        <div>
                          <div className="text-sm font-bold capitalize">{cfg.name}</div>
                          <div className="text-[11px] opacity-70">{cfg.tagline}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Can Size Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Can Volume Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                        size === s.id
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className="text-[10px] font-mono opacity-60">${s.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pack Bundle Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Bundle Pack
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackType('single')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      packType === 'single'
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">Single Can</div>
                    <div className="text-[10px] opacity-70">Sample</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackType('4pack')}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      packType === '4pack'
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">4-Pack</div>
                    <div className="text-[10px] opacity-70">Popular · 5% Off</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackType('12pack')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      packType === '12pack'
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">12-Pack Case</div>
                    <div className="text-[10px] opacity-70">Free Ship · 15% Off</div>
                  </button>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-bold text-white w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customer Contact & Address */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Shipping Information
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address (for tracking)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address, City, Postal Code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white">${packTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                  <span>Total Amount</span>
                  <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs font-extrabold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95"
              >
                <span>Confirm & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-white/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Satisfaction Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Cold Express Logistics
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
