import React, { useState } from 'react';
import { Calendar, Users, Clock, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { ReservationData } from '../types';

export const ReservationSection: React.FC = () => {
  const [date, setDate] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'cozy-indoor' | 'sunlit-veranda' | 'work-bar'>('cozy-indoor');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newReservation: ReservationData = {
      id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      email: 'guest@themadras.in',
      date: date === 'Today' ? 'Today (Sep 22)' : date === 'Tomorrow' ? 'Tomorrow (Sep 23)' : date,
      time: timeSlot,
      guests,
      seatingArea,
      notes: notes.trim() ? notes : undefined,
      status: 'confirmed',
      tableNumber: Math.floor(1 + Math.random() * 18),
    };

    setConfirmedReservation(newReservation);
  };

  return (
    <section id="reservation-section" className="py-16 bg-[#FDFBF7] border-t border-amber-900/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800 block mb-2">
            Table & Workspace Bookings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
            Reserve Your Corner
          </h2>
          <p className="text-sm text-stone-600">
            Slow down over specialty brew, host a meeting, or get productive with our high-speed 150 Mbps Wi-Fi and power outlets.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Card */
          <div className="bg-white border-2 border-amber-800/30 rounded-3xl p-8 max-w-xl mx-auto shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-900">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                See you soon, {confirmedReservation.name}!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Booking ID: <strong className="text-amber-900 font-mono">{confirmedReservation.id}</strong>
              </p>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-bold text-stone-900">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Party Size:</span>
                <span className="font-bold text-stone-900">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Seating Area:</span>
                <span className="font-bold text-stone-900 capitalize">{confirmedReservation.seatingArea.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Table Allocated:</span>
                <span className="font-bold text-amber-900">Table #{confirmedReservation.tableNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Contact:</span>
                <span className="font-medium text-stone-900">+91 {confirmedReservation.phone}</span>
              </div>
            </div>

            <div className="text-[11px] text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200/60">
              ⚡ <strong>Barista Note:</strong> We hold tables for 15 minutes past your reserved time. Complimentary high-speed Wi-Fi password will be provided upon seating!
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-6 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-semibold hover:bg-amber-950 transition-colors"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10">
            <form onSubmit={handleBookTable} className="space-y-6 text-left">
              
              {/* Date & Guests selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Today', 'Tomorrow', 'Weekend'].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          date === d
                            ? 'border-amber-800 bg-amber-900 text-white font-semibold shadow-2xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                    Party Size (Guests)
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[1, 2, 3, 4, 5, 6, '7+'].map((g, idx) => {
                      const count = typeof g === 'number' ? g : 8;
                      const isSelected = guests === count;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setGuests(count)}
                          className={`w-10 h-10 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-amber-800 bg-amber-900 text-white shadow-2xs'
                              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                  Seating Ambiance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSeatingArea('cozy-indoor')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      seatingArea === 'cozy-indoor'
                        ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-stone-900">Cozy Indoor Lounge</div>
                    <div className="text-[11px] text-stone-500 mt-1">Air-conditioned, plush leather seating, warm jazz acoustics.</div>
                  </div>

                  <div
                    onClick={() => setSeatingArea('sunlit-veranda')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      seatingArea === 'sunlit-veranda'
                        ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-stone-900">Sunlit Veranda Garden</div>
                    <div className="text-[11px] text-stone-500 mt-1">Open-air tropical plants, natural light, breezy pet-friendly zone.</div>
                  </div>

                  <div
                    onClick={() => setSeatingArea('work-bar')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      seatingArea === 'work-bar'
                        ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-stone-900">Workstation Espresso Bar</div>
                    <div className="text-[11px] text-stone-500 mt-1">Ergonomic seating, dual power plugs, 150 Mbps Wi-Fi priority.</div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['8:30 AM', '10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM', '9:30 PM'].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setTimeSlot(time)}
                      className={`py-2 px-1 text-xs rounded-xl border text-center transition-all ${
                        timeSlot === time
                          ? 'border-amber-800 bg-amber-900 text-white font-semibold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Murali"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                    Mobile Number (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98450 12345"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">
                  Special Notes / Occasion (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Birthday surprise, quiet corner for client discussion, high chair needed"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Confirm Table Reservation • Free of Charge</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
