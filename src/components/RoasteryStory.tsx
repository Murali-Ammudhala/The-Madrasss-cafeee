import React from 'react';
import { Coffee, Flame, Shield, HeartHandshake, Compass, Sparkles } from 'lucide-react';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="roastery-story" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Estate to Cup Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Born in the Hills of Chikmagalur
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            In 1670, seven coffee beans were carried from Yemen and planted on the Baba Budan Giri hills of Karnataka. 
            At The Madras, we honor this 350-year heritage with shade-grown estate coffees roasted with contemporary precision.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-stone-800/80 border border-stone-700/60 rounded-2xl p-7 text-left hover:border-amber-700/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-300 mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Direct Trade Estates</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              We work directly with 4 multi-generation family estates across Chikmagalur and Coorg, ensuring fair premium prices for farmers and hand-picked ripe cherries.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/60 rounded-2xl p-7 text-left hover:border-amber-700/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-300 mb-5">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Micro-Batch Roasting</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Our in-house drum roaster runs small 5kg batches weekly. We meticulously profile every roast to amplify notes of dried figs, jaggery, hazelnut, and citrus blossom.
            </p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/60 rounded-2xl p-7 text-left hover:border-amber-700/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-300 mb-5">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">The Brass Dabarah Ritual</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Alongside cutting-edge manual V60 drippers and AeroPress brews, our traditional South Indian brass dabarah filter coffee is poured from dramatic heights to produce thick, golden velvet crema.
            </p>
          </div>

        </div>

        {/* Story Photo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-stone-950/70 border border-stone-800 rounded-3xl p-6 sm:p-10">
          <div className="space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The 24-Hour Fermentation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              Wild Sourdough & Laminated Butter Bakes
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Our bakery kitchen fires up before dawn at 4:30 AM. Using a five-year-old wild starter culture, our sourdough breads undergo slow 24-hour cold retard fermentation for complex sourdough tang, airy alveoli, and crisp golden crusts.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-amber-200">
              <div>
                <span className="font-serif font-bold text-lg text-white block">100%</span>
                <span>Natural Sourdough</span>
              </div>
              <div className="w-px h-8 bg-stone-700"></div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">Pure Butter</span>
                <span>No Palm Oil or Preservatives</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-800">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop"
              alt="Artisanal sourdough and cafe bakery counter"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
