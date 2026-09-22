import React, { useState } from 'react';
import { Sparkles, Tag, ArrowRight, Copy, Check, MapPin, Coffee, Flame, Zap } from 'lucide-react';

interface ColorfulBannerProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onApplyCoupon?: (code: string) => void;
}

export const ColorfulBanner: React.FC<ColorfulBannerProps> = ({
  onExploreMenu,
  onBookTable,
  onApplyCoupon,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('MURALI50');
    setCopied(true);
    if (onApplyCoupon) {
      onApplyCoupon('MURALI50');
    }
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section id="colourful-special-banner" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Colorful Gradient Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 p-1 sm:p-1.5 shadow-xl">
        
        {/* Animated ambient decorative blur spots */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-yellow-400 rounded-full mix-blend-overlay filter blur-2xl opacity-70 animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-pink-400 rounded-full mix-blend-overlay filter blur-2xl opacity-60 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-48 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 pointer-events-none"></div>

        {/* Inner Colorful Container with subtle South Indian festive motif feel */}
        <div className="relative z-10 bg-gradient-to-br from-stone-950/90 via-stone-900/95 to-amber-950/90 rounded-[22px] p-6 sm:p-8 text-white backdrop-blur-md">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Content Area */}
            <div className="space-y-3.5 text-left max-w-2xl">
              
              {/* Colorful Badge Rail */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Celebration Offer</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Now Brewing in Chennai</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/25 border border-rose-400/50 text-rose-200 text-xs font-bold">
                  <Zap className="w-3 h-3 text-rose-400" />
                  <span>20-25 Min Express Delivery</span>
                </span>
              </div>

              {/* Banner Headline with vivid text styling */}
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">₹50 OFF</span> With Code{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
                    MURALI50
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-normal">
                  Celebrating our flagship roastery on <strong className="text-amber-200 font-semibold">Khader Nawaz Khan Road, Nungambakkam, Chennai</strong>. 
                  Valid on single-origin Chikmagalur coffees, sourdough toasts, healthy bowls & heritage breakfast combos!
                </p>
              </div>

              {/* Colorful Perk Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-xs shrink-0">
                    ₹
                  </div>
                  <div>
                    <div className="font-bold text-white leading-tight">Min. Order ₹199</div>
                    <div className="text-[10px] text-amber-200">Instant Flat Discount</div>
                  </div>
                </div>

                <div className="bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-400 text-stone-900 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white leading-tight">Free Delivery</div>
                    <div className="text-[10px] text-emerald-200">On all orders ₹500+</div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-rose-400 text-stone-900 flex items-center justify-center font-bold text-xs shrink-0">
                    ☕
                  </div>
                  <div>
                    <div className="font-bold text-white leading-tight">Authentic Taste</div>
                    <div className="text-[10px] text-rose-200">Pure Chikmagalur Roasts</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Action Box: Copy Coupon & Instant Order CTA */}
            <div className="w-full lg:w-auto shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center text-center space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Official Promo Code
              </span>

              {/* Coupon Ticket Box */}
              <div className="w-full bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 px-4 py-2.5 rounded-xl flex items-center justify-between gap-3 shadow-md border border-amber-200">
                <div className="flex items-center gap-2 text-left">
                  <Tag className="w-4 h-4 text-stone-900 stroke-[2.5]" />
                  <span className="font-mono text-base font-black tracking-wider">
                    MURALI50
                  </span>
                </div>

                <button
                  id="btn-copy-murali50"
                  onClick={handleCopyCode}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    copied 
                      ? 'bg-emerald-800 text-white' 
                      : 'bg-stone-950 text-amber-300 hover:bg-stone-900'
                  }`}
                  title="Copy coupon code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2 pt-1">
                <button
                  id="btn-banner-order-now"
                  onClick={onExploreMenu}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order Now with MURALI50</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id="btn-banner-book-table"
                  onClick={onBookTable}
                  className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  Visit Café in Nungambakkam
                </button>
              </div>

              <span className="text-[10px] text-amber-200/70">
                ⚡ Instant ₹50 deduction applied at checkout
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
