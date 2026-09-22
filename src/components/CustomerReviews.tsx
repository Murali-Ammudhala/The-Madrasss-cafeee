import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Aditi Sharma',
      role: 'Creative Director, Chennai',
      text: 'The Mysore Filter Kaapi with jaggery shakerato is unreal! The atmosphere is unmatched in Nungambakkam—super high-speed Wi-Fi, lush rain-tree courtyard and lots of natural light on the veranda.',
      rating: 5,
      favorite: 'Mysore Filter Kaapi (₹120)'
    },
    {
      name: 'Rohan Mehra',
      role: 'Coffee Enthusiast & Writer',
      text: 'Their Truffle Mushroom Sourdough Toast is the crispest bread in town. Plus, you can taste the distinct berry notes in their Chikmagalur pour-over. Worth every rupee.',
      rating: 5,
      favorite: 'Truffle Sourdough (₹285)'
    },
    {
      name: 'Kavita Nair',
      role: 'Architect & Remote Worker',
      text: 'The pistachio cardamom cruffin paired with Mumbai Kadak Chai gave me the best morning boost. The staff knows coffee inside out and loves recommending brews.',
      rating: 5,
      favorite: 'Cardamom Cruffin (₹190)'
    }
  ];

  return (
    <section id="reviews-section" className="py-16 bg-[#FAF7F2] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5 Rating from 2,100+ Guests</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Loved by Bangalore's Coffee Lovers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between text-left hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{rev.name}</h4>
                  <span className="text-[11px] text-stone-500">{rev.role}</span>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                  {rev.favorite}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
