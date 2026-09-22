import React, { useState } from 'react';
import { 
  X, CheckCircle2, QrCode, CreditCard, Banknote, Clock, 
  MapPin, Utensils, ArrowRight, ShieldCheck, Sparkles, 
  Bike, AlertCircle, Phone, Heart
} from 'lucide-react';
import { CartItem, OrderType, DeliveryInstructions, DeliveryAddress, ActiveOrder } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { MOCK_DELIVERY_PARTNER } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  discount: number;
  promoCode: string;
  deliveryInstructions?: DeliveryInstructions;
  deliveryTip?: number;
  selectedAddress?: DeliveryAddress;
  tableNumber?: number;
  onOrderSuccess: (order: ActiveOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  discount,
  promoCode,
  deliveryInstructions = {
    noCutlery: true,
    leaveAtDoor: false,
    avoidRingingBell: false,
    callBeforeDelivery: true,
    leaveWithGuard: false,
    cookingNotes: ''
  },
  deliveryTip = 30,
  selectedAddress,
  tableNumber = 4,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Arjun Menon');
  const [phone, setPhone] = useState('9845012345');
  const [addressText, setAddressText] = useState(
    selectedAddress?.address || 'Flat 402, Raintree Residences, Poes Garden, Alwarpet, Chennai'
  );
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Bill calculations in INR
  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const isFreeDelivery = subtotal >= 500 || subtotal === 0;
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery ? 0 : 40) : 0;
  const packagingCharge = orderType === 'delivery' ? (subtotal > 0 ? 15 : 0) : orderType === 'takeaway' ? 10 : 0;
  const platformFee = subtotal > 0 ? 5 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.05);
  const tipAmount = orderType === 'delivery' ? deliveryTip : 0;
  const grandTotal = taxableAmount + gst + deliveryFee + packagingCharge + platformFee + tipAmount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and 10-digit mobile number.');
      return;
    }
    if (orderType === 'delivery' && !addressText.trim()) {
      setErrorMsg('Please enter your Bengaluru delivery address.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    // Simulate swift 600ms order placement like Swiggy/Zomato
    setTimeout(() => {
      const generatedId = `MADRAS-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: ActiveOrder = {
        orderId: generatedId,
        items: cartItems,
        orderType,
        status: 'confirmed',
        customerName: customerName.trim(),
        customerPhone: phone.trim(),
        address: {
          id: 'custom-addr',
          type: selectedAddress?.type || 'home',
          label: selectedAddress?.label || 'Delivering to Bengaluru',
          address: addressText.trim(),
          distanceKm: selectedAddress?.distanceKm || 1.4,
          etaMins: selectedAddress?.etaMins || 24
        },
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        paymentMethod: paymentMethod === 'counter' ? 'cash' : paymentMethod,
        subtotal,
        discount,
        deliveryFee,
        packagingCharge,
        platformFee,
        gst,
        tip: tipAmount,
        grandTotal,
        deliveryInstructions,
        deliveryPartner: MOCK_DELIVERY_PARTNER,
        estimatedDeliveryMins: selectedAddress?.etaMins || 25,
        createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-amber-900/20 rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-6 text-left text-stone-900 animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full mb-1">
              <span>{orderType.toUpperCase()} CHECKOUT</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Payment & Confirmation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="py-4 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-500">
              Contact Details (For WhatsApp Live Tracking)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Arjun Menon"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9845012345"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-r-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800 font-medium font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address or Table Location */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-500 flex items-center justify-between">
              <span>{orderType === 'delivery' ? 'Delivery Destination' : orderType === 'dine-in' ? 'Table Seating' : 'Counter Pickup'}</span>
              {orderType === 'delivery' && (
                <span className="text-emerald-700 text-[10px] font-bold">⚡ 24 Mins Estimated</span>
              )}
            </h4>

            {orderType === 'delivery' ? (
              <div className="space-y-2">
                <textarea
                  rows={2}
                  required
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                  placeholder="House/Flat number, Building name, Street, Nungambakkam, Chennai..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800 resize-none font-medium"
                ></textarea>
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>Serving Nungambakkam, Alwarpet, Poes Garden, Anna Nagar, Mylapore & Besant Nagar, Chennai</span>
                </div>
              </div>
            ) : orderType === 'dine-in' ? (
              <div className="flex items-center justify-between bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-900" />
                  <span className="text-xs text-stone-700">Reserved Café Spot:</span>
                </div>
                <span className="font-bold text-sm text-amber-950 font-serif">
                  Table #{tableNumber} (Indoor Lounge)
                </span>
              </div>
            ) : (
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                Pick up at <strong>The Madras Counter (Khader Nawaz Khan Rd, Nungambakkam, Chennai)</strong> in ~15 mins.
              </div>
            )}
          </div>

          {/* Payment Method Selector (Indian Payment Ecosystem) */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-500">
              Select Payment Method
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-amber-900" />
                <span>Instant UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-900" />
                <span>Card / Netbanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('counter')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-all cursor-pointer ${
                  paymentMethod === 'counter'
                    ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-900" />
                <span>{orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}</span>
              </button>
            </div>

            {/* UPI Sub-Options */}
            {paymentMethod === 'upi' && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <span className="font-semibold text-stone-700 block">Select UPI App:</span>
                <div className="grid grid-cols-4 gap-1.5 text-[11px] font-semibold text-center">
                  {[
                    { id: 'gpay', label: 'Google Pay' },
                    { id: 'phonepe', label: 'PhonePe' },
                    { id: 'paytm', label: 'Paytm' },
                    { id: 'qr', label: 'Scan QR' }
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiApp(app.id as any)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        upiApp === app.id
                          ? 'bg-amber-900 text-white border-amber-900'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Encrypted UPI Intent with Zero Convenience Fee</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Bill Recap */}
          <div className="bg-stone-100/80 p-3.5 rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Total ({cartItems.length} items)</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Offer Discount</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}
            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}</span>
              </div>
            )}
            {tipAmount > 0 && (
              <div className="flex justify-between text-amber-900">
                <span>Delivery Partner Tip (Ramesh Kumar)</span>
                <span>{formatINR(tipAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Packaging & Platform Fee</span>
              <span>{formatINR(packagingCharge + platformFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5% GST)</span>
              <span>{formatINR(gst)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-300 font-bold text-stone-900 text-sm">
              <span>Total Payable Amount</span>
              <span className="font-serif text-base text-amber-900">{formatINR(grandTotal)}</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Pay & Place Order • {formatINR(grandTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-400 mt-2">
              Instant confirmation • Live order tracking on map available right away
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
