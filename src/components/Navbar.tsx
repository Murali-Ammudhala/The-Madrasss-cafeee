import React, { useState } from 'react';
import { Coffee, ShoppingBag, Calendar, Menu as MenuIcon, X, MapPin, Clock, Bike, RotateCcw } from 'lucide-react';
import { formatINR } from '../utils/formatCurrency';
import { ActiveOrder } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeOrder?: ActiveOrder | null;
  onOpenTracking?: () => void;
  onOpenPastOrders?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
  onNavigateToSection,
  activeOrder,
  onOpenTracking,
  onOpenPastOrders,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Vibrant top decorative spice gradient bar */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 via-rose-500 via-purple-500 to-teal-400"></div>

      {/* Top micro-bar with status and location in rich colorful styling */}
      <div className="bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 text-amber-100 text-xs py-1.5 px-4 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5"></span>
              <span>Open Now until 11:00 PM</span>
            </span>
            <span className="hidden sm:inline text-amber-400/40">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-amber-200/90 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Khader Nawaz Khan Rd, Nungambakkam, Chennai</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-amber-200/90">
            <span className="hidden md:inline bg-gradient-to-r from-rose-900/80 to-amber-900/80 px-2.5 py-0.5 rounded-full text-[11px] text-amber-100 font-semibold border border-rose-500/30">
              ☕ Chennai Flagship Roastery
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-200 text-xs font-semibold">Special Offer:</span>
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-stone-950 font-black px-2.5 py-0.5 rounded-full font-mono text-[11px] shadow-sm tracking-wide">
                <span>MURALI50</span>
                <span className="text-[10px] font-sans font-bold bg-stone-950 text-amber-300 px-1 rounded-sm">₹50 OFF</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Colorful Vibrant Gradient */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-orange-500/25 ring-2 ring-amber-300/40 group-hover:scale-105 group-hover:shadow-orange-500/40 transition-all duration-300">
              <Coffee className="w-6 h-6 text-amber-100 drop-shadow-xs" />
            </div>
            <div>
              <span className="font-serif text-2xl font-black tracking-tight block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-amber-900 to-orange-800 group-hover:to-rose-600 transition-colors">
                THE MADRAS
              </span>
              <span className="text-[10.5px] tracking-widest uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 block">
                Café & Roastery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with Colorful Micro-Pills */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-semibold text-stone-700">
            <button
              id="nav-link-menu"
              onClick={() => handleNavClick('menu-section')}
              className="px-3.5 py-2 rounded-xl hover:text-amber-900 hover:bg-amber-100/70 active:bg-amber-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Menu & Brews</span>
            </button>
            <button
              id="nav-link-story"
              onClick={() => handleNavClick('roastery-story')}
              className="px-3.5 py-2 rounded-xl hover:text-rose-900 hover:bg-rose-100/70 active:bg-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>Our Roastery</span>
            </button>
            <button
              id="nav-link-reserve"
              onClick={() => handleNavClick('reservation-section')}
              className="px-3.5 py-2 rounded-xl hover:text-emerald-900 hover:bg-emerald-100/70 active:bg-emerald-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Book a Table</span>
            </button>
            <button
              id="nav-link-reviews"
              onClick={() => handleNavClick('reviews-section')}
              className="px-3.5 py-2 rounded-xl hover:text-purple-900 hover:bg-purple-100/70 active:bg-purple-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span>Community</span>
            </button>
            <button
              id="nav-link-visit"
              onClick={() => handleNavClick('visit-section')}
              className="px-3.5 py-2 rounded-xl hover:text-sky-900 hover:bg-sky-100/70 active:bg-sky-200 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Visit & Contact</span>
            </button>
          </nav>

          {/* Action CTAs: Book Table + Re-Order + Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {activeOrder && onOpenTracking && (
              <button
                id="btn-nav-tracking"
                onClick={onOpenTracking}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer animate-pulse"
                title="Track Active Order"
              >
                <Bike className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Track: {activeOrder.orderId}</span>
                <span className="sm:hidden">Track</span>
              </button>
            )}

            <button
              id="btn-nav-reserve"
              onClick={onOpenReservation}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all shadow-2xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Reserve</span>
            </button>

            {/* Past Orders & 1-Click Re-order button - Colorful Pill */}
            {onOpenPastOrders && (
              <button
                id="btn-nav-past-orders"
                onClick={onOpenPastOrders}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-200 hover:from-amber-200 hover:via-orange-200 hover:to-amber-300 text-amber-950 border-2 border-amber-400/80 rounded-2xl text-xs font-black transition-all shadow-sm hover:shadow-md hover:shadow-amber-500/20 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                title="View Past Orders & 1-Click Re-order"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.8] text-amber-800" />
                <span className="tracking-tight">Re-Order</span>
              </button>
            )}

            {/* Cart Button with Vibrant Gradient and Golden Rupee Badge */}
            <button
              id="btn-nav-cart"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 hover:from-amber-800 hover:via-orange-700 hover:to-rose-700 text-white rounded-2xl transition-all shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95 cursor-pointer transform hover:-translate-y-0.5 ring-2 ring-orange-300/40"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-100 stroke-[2.2]" />
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="hidden sm:inline">Order Bag</span>
                {cartCount > 0 ? (
                  <span className="bg-yellow-300 text-stone-950 px-2 py-0.5 rounded-lg text-[11px] font-black shadow-xs tracking-tight">
                    {cartCount} • {formatINR(cartTotal)}
                  </span>
                ) : (
                  <span className="text-amber-100 text-[11px] font-medium bg-black/20 px-1.5 py-0.5 rounded-md">Empty</span>
                )}
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-stone-900" /> : <MenuIcon className="w-6 h-6 text-stone-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Colorful bottom highlight line */}
      <div className="h-[2px] bg-gradient-to-r from-amber-300/40 via-orange-400/40 via-rose-400/40 to-indigo-400/30"></div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-gradient-to-b from-[#FAF7F2] to-amber-50/70 border-b border-amber-900/15 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('menu-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-amber-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Explore Menu & Pricing (₹)</span>
          </button>
          {onOpenPastOrders && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPastOrders();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-black text-amber-950 bg-gradient-to-r from-amber-200 to-orange-200 hover:from-amber-300 hover:to-orange-300 flex items-center justify-between border border-amber-400/70 shadow-xs"
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-900 stroke-[2.8]" />
                ⚡ Past Orders & Re-Order
              </span>
              <span className="text-[10px] bg-stone-950 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                1-Click Repeat
              </span>
            </button>
          )}
          <button
            onClick={() => handleNavClick('roastery-story')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-rose-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Chikmagalur Roastery Story</span>
          </button>
          <button
            onClick={() => handleNavClick('reservation-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-emerald-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Book a Table / Workstation</span>
          </button>
          <button
            onClick={() => handleNavClick('reviews-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-purple-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Guest Reviews & Rating (4.9 ★)</span>
          </button>
          <button
            onClick={() => handleNavClick('visit-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-sky-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Location, Hours & Wi-Fi (Chennai)</span>
          </button>
          <div className="pt-2 border-t border-amber-900/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
