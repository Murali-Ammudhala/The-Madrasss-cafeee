import React from 'react';
import { Coffee, Heart, ArrowUp } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigateToSection }) => {
  return (
    <footer className="bg-amber-950 text-amber-100 pt-16 pb-12 border-t border-amber-900/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-900/40">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                THE MADRAS CAFÉ & ROASTERY
              </span>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed max-w-md">
              Specialty shade-grown coffees from Chikmagalur and Coorg, royal brass dabarah filter brews, and daily fresh-baked wild sourdough breads and cruffins. All prices in Indian Rupees (₹) including all applicable restaurant GST.
            </p>
            <div className="text-xs text-amber-400 font-medium">
              📍 No. 14, Khader Nawaz Khan Road, Nungambakkam, Chennai 600006
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/80">
              <li>
                <button
                  onClick={() => onNavigateToSection('menu-section')}
                  className="hover:text-amber-100 transition-colors"
                >
                  Coffee & Food Menu (₹)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('roastery-story')}
                  className="hover:text-amber-100 transition-colors"
                >
                  Chikmagalur Roastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('reservation-section')}
                  className="hover:text-amber-100 transition-colors"
                >
                  Book a Table / Workstation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('reviews-section')}
                  className="hover:text-amber-100 transition-colors"
                >
                  Guest Ratings & Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Café Hours
            </h4>
            <div className="text-xs text-amber-200/80 space-y-1">
              <div>Monday – Sunday</div>
              <div className="font-bold text-white text-sm">7:30 AM – 11:00 PM</div>
              <div className="text-amber-400 pt-2">Free Delivery on ₹500+</div>
              <div>Phone: +91 98450 23891</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/70">
          <p>© {new Date().getFullYear()} The Madras Café & Roastery Bengaluru. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Brewed with passion in India <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            </span>
            <button
              onClick={onScrollToTop}
              className="p-2 rounded-lg bg-amber-900/60 hover:bg-amber-900 text-amber-200 transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
