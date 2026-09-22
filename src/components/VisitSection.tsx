import React, { useState } from 'react';
import { 
  MapPin, Clock, Phone, Mail, Wifi, Car, Dog, CreditCard, 
  Sparkles, MessageSquare, Send, CheckCircle2, Navigation, 
  ExternalLink, Calendar
} from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const VisitSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryContact('');
      setInquiryMessage('');
    }, 4500);
  };

  return (
    <section id="visit-section" className="py-20 bg-[#FDFBF7] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3 border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            <span>Visit & Contact • Nungambakkam, Chennai</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Visit & Contact The Madras
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Nestled under heritage rain trees on Chennai's iconic Khader Nawaz Khan Road. 
            Drop in for an artisanal Chikmagalur brew, slow sourdough brunch, or connect with our roastery team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location, Operating Hours & Amenities */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Address & Hours Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-2xs space-y-5">
              
              {/* Location Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-900 text-amber-100 flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      Chennai Flagship Roastery
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                      Open Today
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed font-medium">
                    {CAFE_INFO.address}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-stone-500">
                    <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      Landmark: Near Taj Coromandel & Shastri Bhavan
                    </span>
                    <span>•</span>
                    <span className="text-stone-600">
                      Thousand Lights Metro (650m)
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-stone-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900">Café & Kitchen Hours</h4>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1">
                    Monday to Sunday: <strong className="text-amber-950 font-bold">7:30 AM – 11:00 PM</strong>
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Fresh filter kaapi frothed from 7:30 AM • Artisanal bakery oven rolls at 8:00 AM • All-day brunch till 10:30 PM
                  </p>
                </div>
              </div>

              {/* Direct Contact Numbers */}
              <div className="pt-4 border-t border-stone-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-base font-bold text-stone-900">Direct Phone & Desk</h4>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-xs sm:text-sm">
                    <a 
                      href={`tel:${CAFE_INFO.phone}`} 
                      className="font-bold text-amber-900 hover:text-amber-950 hover:underline flex items-center gap-1.5"
                    >
                      <span>{CAFE_INFO.phone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-stone-300 hidden sm:inline">|</span>
                    <a 
                      href={`mailto:${CAFE_INFO.email}`} 
                      className="text-stone-600 hover:text-amber-900 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{CAFE_INFO.email}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Amenities Grid */}
            <div className="bg-amber-900 text-amber-50 p-6 rounded-3xl shadow-sm">
              <h4 className="font-serif text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Nungambakkam Sanctuary Amenities</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-amber-950/60 p-3 rounded-2xl border border-amber-800/40 text-center">
                  <Wifi className="w-4 h-4 mx-auto mb-1 text-amber-300" />
                  <span className="font-bold block text-white">150 Mbps Fiber</span>
                  <span className="text-[10px] text-amber-300">Dedicated Co-Work</span>
                </div>
                <div className="bg-amber-950/60 p-3 rounded-2xl border border-amber-800/40 text-center">
                  <Dog className="w-4 h-4 mx-auto mb-1 text-amber-300" />
                  <span className="font-bold block text-white">Pet Friendly</span>
                  <span className="text-[10px] text-amber-300">Garden Veranda</span>
                </div>
                <div className="bg-amber-950/60 p-3 rounded-2xl border border-amber-800/40 text-center">
                  <Car className="w-4 h-4 mx-auto mb-1 text-amber-300" />
                  <span className="font-bold block text-white">Valet Parking</span>
                  <span className="text-[10px] text-amber-300">On KNK Road</span>
                </div>
                <div className="bg-amber-950/60 p-3 rounded-2xl border border-amber-800/40 text-center">
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-300" />
                  <span className="font-bold block text-white">UPI & Cards</span>
                  <span className="text-[10px] text-amber-300">Fast Tap & Pay</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Simulator */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 flex flex-col justify-between p-5">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Map Header Chip */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-stone-200 text-xs font-bold text-stone-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>The Madras Café • Khader Nawaz Khan Rd, Chennai</span>
                  </div>
                  <span className="bg-amber-900 text-amber-100 text-[10px] font-bold px-2 py-1 rounded-lg">
                    Zone: Nungambakkam
                  </span>
                </div>

                {/* Animated Central Pin */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shadow-xl animate-bounce">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-stone-800 mt-2 bg-white/95 px-3.5 py-1.5 rounded-full shadow-md border border-stone-200">
                    Opposite Taj Coromandel Lane
                  </span>
                </div>

                {/* Directions Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">Thousand Lights Metro (Blue Line)</span>
                    <span className="text-[11px] text-stone-500">650 meters (7 min stroll via Anna Salai)</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Khader+Nawaz+Khan+Road+Chennai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-amber-900 text-white rounded-lg font-bold hover:bg-amber-950 transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Contact & Inquiry Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs text-left">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-stone-500">
                  Table bookings, bean wholesale, cupping sessions & feedback
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-stone-900 text-base">Message Sent to Chennai Café!</h4>
                <p className="text-xs text-stone-600">
                  Thank you! Our Nungambakkam café manager will get back to you shortly via phone or WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Murali Kumar"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone or WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryContact}
                    onChange={(e) => setInquiryContact(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Enquiry Subject
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  >
                    <option value="general">General Visit & Queries</option>
                    <option value="table">Table / Workspace Reservation</option>
                    <option value="catering">Office Coffee & Bakery Catering</option>
                    <option value="wholesale">Artisanal Roasted Beans Wholesale</option>
                    <option value="feedback">Guest Experience Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Message or Special Note
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us about your visit date, group size, or coffee question..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to The Madras</span>
                </button>
              </form>
            )}

            {/* Quick Reach Out Links */}
            <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col gap-2.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>Immediate Assistance:</span>
                <a href={`tel:${CAFE_INFO.phone}`} className="font-bold text-amber-900 hover:underline">
                  {CAFE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct WhatsApp:</span>
                <a 
                  href={`https://wa.me/919845023891?text=Hi%20The%20Madras%20Chennai`}
                  target="_blank" 
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
