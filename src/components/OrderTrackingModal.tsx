import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, MapPin, Phone, MessageSquare, 
  ChevronRight, Bike, Store, Home, ShieldCheck, Sparkles, 
  X, AlertCircle, RefreshCw, Heart, FileText, Check, RotateCcw
} from 'lucide-react';
import { ActiveOrder, OrderProgressStatus } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface OrderTrackingModalProps {
  order: ActiveOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdate?: (updatedOrder: ActiveOrder) => void;
  onReorder?: (order: ActiveOrder) => void;
}

const STATUS_STEPS: { 
  id: OrderProgressStatus; 
  title: string; 
  subtitle: string; 
  timeEst: string;
}[] = [
  {
    id: 'placed',
    title: 'Order Placed',
    subtitle: 'Received by The Madras Roastery counter',
    timeEst: 'Just now'
  },
  {
    id: 'confirmed',
    title: 'Order Confirmed',
    subtitle: 'Café kitchen verified items & initiated prep',
    timeEst: '1 min ago'
  },
  {
    id: 'cooking',
    title: 'Brewing & Baking in Kitchen',
    subtitle: 'Barista grinding fresh beans & warming sourdough',
    timeEst: 'Est. 12-15 mins'
  },
  {
    id: 'rider_assigned',
    title: 'Delivery Partner Assigned',
    subtitle: 'Ramesh Kumar reached The Madras Café to pick up your bag',
    timeEst: 'Rider waiting at counter'
  },
  {
    id: 'out_for_delivery',
    title: 'Out for Delivery',
    subtitle: 'On the way to your doorstep via 12th Main Road',
    timeEst: 'Arriving in 14 mins'
  },
  {
    id: 'delivered',
    title: 'Order Delivered',
    subtitle: 'Handed over fresh and piping hot. Enjoy your meal!',
    timeEst: 'Completed'
  }
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdate,
  onReorder
}) => {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState<OrderProgressStatus>(order.status || 'cooking');
  const [etaMinutes, setEtaMinutes] = useState(order.estimatedDeliveryMins || 26);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [showRiderCallPrompt, setShowRiderCallPrompt] = useState(false);

  // Auto progression simulation (like Swiggy/Zomato live updates)
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 5 ? prev - 1 : prev));
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const getStepIndex = (status: OrderProgressStatus): number => {
    return STATUS_STEPS.findIndex(s => s.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);

  const handleAdvanceStatus = () => {
    const nextIdx = (currentIndex + 1) % STATUS_STEPS.length;
    const nextStatus = STATUS_STEPS[nextIdx].id;
    setCurrentStatus(nextStatus);
    if (onOrderUpdate) {
      onOrderUpdate({
        ...order,
        status: nextStatus,
      });
    }
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(order.orderId);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dark backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 relative">
        <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-stone-300 shadow-2xl overflow-hidden flex flex-col text-left text-stone-900 animate-scale-up">
          
          {/* Top Swiggy/Zomato style Live Status Bar */}
          <div className="bg-amber-950 text-white p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 to-transparent pointer-events-none"></div>

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-900/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-200 border border-amber-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE ORDER TRACKING</span>
                </div>
                
                <h3 className="font-serif text-2xl font-bold mt-2 text-amber-50">
                  {currentStatus === 'delivered' 
                    ? 'Order Delivered!' 
                    : order.orderType === 'dine-in'
                    ? 'Serving to Table Soon'
                    : `Arriving in ~${etaMinutes} mins`}
                </h3>

                <p className="text-xs text-amber-200/80 mt-1">
                  {STATUS_STEPS[currentIndex]?.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-amber-900/60 hover:bg-amber-900 text-amber-200 flex items-center justify-center transition-colors shrink-0"
                aria-label="Close tracking"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Order ID chip & 1-Click Re-Order */}
            <div className="mt-4 pt-3 border-t border-amber-900/60 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-300/90">
              <div className="flex items-center gap-2">
                <span>Order ID: <strong className="text-white font-mono">{order.orderId}</strong></span>
                <button
                  onClick={handleCopyOrderId}
                  className="text-[11px] text-amber-300 hover:text-white underline cursor-pointer"
                >
                  {copiedOrderId ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-amber-900/60 px-2 py-0.5 rounded text-[11px] text-amber-200 font-semibold uppercase tracking-wide">
                  {order.orderType}
                </span>

                {onReorder && (
                  <button
                    id="btn-tracking-reorder-banner"
                    onClick={() => onReorder(order)}
                    className="inline-flex items-center gap-1.5 py-1 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-[11px] shadow-xs transition-transform hover:scale-105 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                    <span>⚡ Re-Order Meal</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Route / Location Visual Simulator */}
          <div className="bg-stone-900 text-stone-100 p-4 relative overflow-hidden border-b border-stone-800">
            <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Store className="w-3.5 h-3.5" />
                The Madras Roastery (Nungambakkam, Chennai)
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Home className="w-3.5 h-3.5" />
                {order.address?.label || 'Your Location'}
              </span>
            </div>

            {/* Road route bar with animated rider icon */}
            <div className="relative h-9 bg-stone-950/80 rounded-xl px-3 flex items-center border border-stone-800">
              <div className="absolute left-3 right-3 h-1 bg-stone-700 rounded-full"></div>
              
              {/* Progress fill */}
              <div 
                className="absolute left-3 h-1 bg-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(8, ((currentIndex + 1) / STATUS_STEPS.length) * 94)}%` }}
              ></div>

              {/* Rider Scooter Icon */}
              <div 
                className="absolute transition-all duration-700 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30"
                style={{ left: `${Math.max(6, Math.min(94, ((currentIndex + 1) / STATUS_STEPS.length) * 100))}%` }}
              >
                <Bike className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 px-1">
              <span>Kitchen Prep: ~10 mins</span>
              <span className="text-amber-400 font-medium">
                {order.address?.distanceKm ? `${order.address.distanceKm} km transit` : '2.1 km distance'}
              </span>
              <span>Contactless Drop-off</span>
            </div>
          </div>

          <div className="p-5 max-h-[58vh] overflow-y-auto space-y-5">
            
            {/* Delivery Partner Profile Card (Swiggy / Zomato style) */}
            {order.orderType === 'delivery' && (
              <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={order.deliveryPartner?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'} 
                      alt="Delivery Partner"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-800/30 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-stone-900">
                          {order.deliveryPartner?.name || 'Ramesh Kumar'}
                        </h4>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                          ★ {order.deliveryPartner?.rating || '4.9'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {order.deliveryPartner?.vehicle || 'Ather 450X Electric Scooter'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowRiderCallPrompt(true)}
                      className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center transition-colors cursor-pointer"
                      title="Call Rider"
                      aria-label="Call Rider"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <a
                      href="https://wa.me/919845190234"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center transition-colors cursor-pointer"
                      title="Message Rider"
                      aria-label="Message Rider"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {showRiderCallPrompt && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                    <div>
                      <span>Connecting to <strong>Ramesh Kumar</strong> via masked proxy:</span>
                      <a href={`tel:${order.deliveryPartner?.phone || '+919845190234'}`} className="block font-mono font-bold text-amber-950 underline mt-0.5">
                        {order.deliveryPartner?.phone || '+91 98451 90234'}
                      </a>
                    </div>
                    <button
                      onClick={() => setShowRiderCallPrompt(false)}
                      className="text-stone-400 hover:text-stone-700 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Vaccinated & Temp checked
                  </span>
                  <span>•</span>
                  <span>1,420+ safe deliveries</span>
                </div>
              </div>
            )}

            {/* Step-by-Step Progress Timeline */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Order Status Timeline
                </h4>
                {/* Simulation button so user can test full Swiggy lifecycle */}
                <button
                  onClick={handleAdvanceStatus}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded-lg cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Simulate Next Step</span>
                </button>
              </div>

              <div className="space-y-4">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={step.id} className="flex items-start gap-3 relative">
                      {idx !== STATUS_STEPS.length - 1 && (
                        <div 
                          className={`absolute left-[13px] top-6 bottom-[-16px] w-0.5 transition-colors ${
                            idx < currentIndex ? 'bg-amber-800' : 'bg-stone-200'
                          }`}
                        ></div>
                      )}

                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone 
                            ? 'bg-amber-900 text-white' 
                            : 'bg-stone-100 text-stone-400 border border-stone-300'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 pb-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold ${isCurrent ? 'text-amber-950 font-extrabold' : isDone ? 'text-stone-800' : 'text-stone-400'}`}>
                            {step.title}
                          </h5>
                          <span className="text-[10px] text-stone-400">
                            {step.timeEst}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${isCurrent ? 'text-stone-700' : 'text-stone-400'}`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Instructions & Preferences Saved */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-500">
                Delivery Instructions Attached
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {order.deliveryInstructions.noCutlery && (
                  <span className="bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                    🌱 No Cutlery (Eco-pledge)
                  </span>
                )}
                {order.deliveryInstructions.leaveAtDoor && (
                  <span className="bg-stone-100 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-stone-200">
                    🚪 Leave at Door
                  </span>
                )}
                {order.deliveryInstructions.avoidRingingBell && (
                  <span className="bg-stone-100 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-stone-200">
                    🔕 Avoid Ringing Bell
                  </span>
                )}
                {order.deliveryInstructions.callBeforeDelivery && (
                  <span className="bg-stone-100 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-stone-200">
                    📞 Call upon Arrival
                  </span>
                )}
                {order.deliveryInstructions.leaveWithGuard && (
                  <span className="bg-stone-100 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-stone-200">
                    🛡️ Leave with Society Guard
                  </span>
                )}
              </div>
              {order.deliveryInstructions.cookingNotes && (
                <p className="text-xs text-stone-600 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60 mt-1 italic">
                  Kitchen Note: "{order.deliveryInstructions.cookingNotes}"
                </p>
              )}
            </div>

            {/* Order Items & Bill Details */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-stone-500">
                  Itemized Bill ({order.items.length} items)
                </span>
                <span className="text-[11px] text-stone-400 font-mono">GSTIN: 29AABCA1234F1Z5</span>
              </div>

              <div className="space-y-2 divide-y divide-stone-100 text-xs">
                {order.items.map((cartItem) => (
                  <div key={cartItem.cartItemId} className="pt-2 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-stone-900">
                        {cartItem.quantity}x {cartItem.item.name}
                      </div>
                      {cartItem.customizations.size && (
                        <span className="text-[11px] text-stone-500 block">
                          Size: {cartItem.customizations.size}
                        </span>
                      )}
                      {cartItem.customizations.milk && (
                        <span className="text-[11px] text-stone-500 block">
                          Milk: {cartItem.customizations.milk}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-stone-900 font-serif">
                      {formatINR(cartItem.itemTotal)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Coupon</span>
                    <span>-{formatINR(order.discount)}</span>
                  </div>
                )}
                {order.orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Partner Fee</span>
                    <span>{order.deliveryFee === 0 ? 'FREE' : formatINR(order.deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Restaurant Packaging Charge</span>
                  <span>{formatINR(order.packagingCharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Service Fee</span>
                  <span>{formatINR(order.platformFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% Restaurant GST)</span>
                  <span>{formatINR(order.gst)}</span>
                </div>
                {order.tip > 0 && (
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Delivery Partner Tip (100% to Ramesh)</span>
                    <span>{formatINR(order.tip)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                  <span>Paid Total</span>
                  <span className="font-serif text-base text-amber-900">{formatINR(order.grandTotal)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-white border-t border-stone-200 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {onReorder && (
              <button
                id="btn-reorder-tracking-footer"
                onClick={() => onReorder(order)}
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>⚡ Re-Order Meal</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="py-3 px-4 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer shadow-md"
            >
              Back to Café Menu
            </button>
            <a
              href="tel:+919845023891"
              className="py-3 px-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Café Help</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
