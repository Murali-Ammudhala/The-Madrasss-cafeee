import React from 'react';
import { ArrowRight, Sparkles, Coffee, Clock, Heart, Award, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/images/fresh_roast_bar_1790057950967.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onQuickOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable, onQuickOrder }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-950 text-xs font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Artisan Roastery & Sourdough Bakery • Nungambakkam, Chennai</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.15] tracking-tight">
              Crafted Coffee. <br className="hidden sm:inline" />
              <span className="text-amber-900 italic font-medium">Warm Conversations.</span> <br />
              Baked Fresh Daily.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Step into Chennai's flagship sanctuary for coffee purists and sourdough enthusiasts. 
              Savor single-origin beans sourced directly from Chikmagalur estates, royal brass filter kaapi, 
              slow-fermented sourdoughs, and freshly rolled cruffins on Khader Nawaz Khan Road.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-btn-explore-menu"
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-all hover:gap-3 cursor-pointer"
              >
                <span>View Menu & Order (₹)</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                id="hero-btn-book-table"
                onClick={onBookTable}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl font-medium text-sm transition-colors shadow-2xs cursor-pointer"
              >
                Book a Work Table
              </button>
            </div>

            {/* Trust & Quality Badges */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4 text-amber-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">100% Arabica</div>
                  <div className="text-[11px] text-stone-500">Chikmagalur Estates</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-amber-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">4.9 ★ Rating</div>
                  <div className="text-[11px] text-stone-500">2,100+ Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Fresh Bakes</div>
                  <div className="text-[11px] text-stone-500">Every 4 Hours</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-amber-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Work Friendly</div>
                  <div className="text-[11px] text-stone-500">Fast Wi-Fi & Plugs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 group">
              <img
                src={heroImage}
                alt="The Madras specialty roastery espresso bar with freshly roasted Arabica beans and brass dabarah"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/25 to-transparent"></div>

              {/* Floating Badge 1: Fresh Roast on Bar */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-amber-900/10 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <span>Fresh Roast on Bar</span>
                    <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">Roasted Today</span>
                  </div>
                  <div className="text-[10px] text-amber-900 font-medium">Balur Estate Washed Arabica • Lot #42</div>
                </div>
              </div>

              {/* Floating Badge 2: Price in Indian Rupees */}
              <div className="absolute bottom-4 left-4 right-4 bg-amber-950/90 backdrop-blur-md p-4 rounded-2xl text-amber-100 border border-amber-800/40 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-300 font-medium">Signature Today</div>
                  <div className="text-sm font-bold text-white">Mysore Royal Filter Kaapi</div>
                  <div className="text-xs text-amber-200">Brewed in Brass Dabarah</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-serif font-bold text-amber-300">₹120</div>
                  <button
                    onClick={onQuickOrder}
                    className="text-[11px] font-semibold bg-amber-800 hover:bg-amber-700 text-white px-2.5 py-1 rounded-md transition-colors"
                  >
                    Quick Add +
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
