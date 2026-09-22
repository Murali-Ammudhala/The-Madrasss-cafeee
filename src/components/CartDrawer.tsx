import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, 
  Tag, Utensils, Bike, PackageCheck, Heart, ShieldCheck, 
  ChevronRight, Sparkles, Check, Info, MapPin, RotateCcw
} from 'lucide-react';
import { CartItem, OrderType, DeliveryInstructions, DeliveryAddress } from '../types';
import { DEFAULT_ADDRESSES, POPULAR_COUPONS } from '../data/menuData';
import { formatINR } from '../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  onChangeOrderType: (type: OrderType) => void;
  onProceedToCheckout: (
    appliedDiscount: number, 
    discountCode: string, 
    instructions: DeliveryInstructions, 
    tip: number,
    selectedAddress: DeliveryAddress,
    tableNum: number
  ) => void;
  onOpenPastOrders?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  onChangeOrderType,
  onProceedToCheckout,
  onOpenPastOrders,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showCouponsDrawer, setShowCouponsDrawer] = useState(false);

  // Swiggy / Zomato Delivery Options
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(DEFAULT_ADDRESSES[0]);
  const [tableNumber, setTableNumber] = useState<number>(4);
  const [deliveryTip, setDeliveryTip] = useState<number>(30); // default friendly tip in INR

  // Cooking and Delivery Instructions (Swiggy / Zomato chips)
  const [instructions, setInstructions] = useState<DeliveryInstructions>({
    noCutlery: true,
    leaveAtDoor: false,
    avoidRingingBell: false,
    callBeforeDelivery: true,
    leaveWithGuard: false,
    cookingNotes: ''
  });

  if (!isOpen) return null;

  // Subtotal in INR
  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

  // Delivery fee: ₹0 for dine-in/takeaway; ₹40 for delivery (free above ₹500 or with Gold promo)
  const isFreeDelivery = subtotal >= 500 || subtotal === 0;
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery ? 0 : 40) : 0;

  // Restaurant Packaging Charge (Standard Swiggy/Zomato fee for hygiene containers)
  const packagingCharge = orderType === 'delivery' ? (subtotal > 0 ? 15 : 0) : orderType === 'takeaway' ? 10 : 0;

  // Platform Fee (₹5 like Zomato/Swiggy)
  const platformFee = subtotal > 0 ? 5 : 0;

  // Promo discount calculation
  let discount = 0;
  if (appliedPromo === 'FIRSTSIP') {
    discount = Math.min(150, Math.round(subtotal * 0.15)); // 15% off up to ₹150
  } else if (appliedPromo === 'MURALI50' || appliedPromo === 'MADRAS50' || appliedPromo === 'AMMUKUTTI50' || appliedPromo === 'AURA50') {
    discount = Math.min(50, subtotal);
  } else if (appliedPromo === 'COMBOSAVER') {
    discount = Math.min(75, subtotal);
  }

  // Restaurant GST 5% on food & beverage in India
  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.05);

  const grandTotal = taxableAmount + gst + deliveryFee + packagingCharge + platformFee + (orderType === 'delivery' ? deliveryTip : 0);

  const handleApplyCode = (codeToApply: string) => {
    setPromoError('');
    const code = codeToApply.trim().toUpperCase();
    if (code === 'FIRSTSIP') {
      setAppliedPromo('FIRSTSIP');
      setPromoCode('');
      setShowCouponsDrawer(false);
    } else if (code === 'MURALI50' || code === 'MADRAS50' || code === 'AMMUKUTTI50' || code === 'AURA50') {
      setAppliedPromo('MURALI50');
      setPromoCode('');
      setShowCouponsDrawer(false);
    } else if (code === 'COMBOSAVER') {
      setAppliedPromo('COMBOSAVER');
      setPromoCode('');
      setShowCouponsDrawer(false);
    } else {
      setPromoError('Invalid coupon. Try "MURALI50" or "FIRSTSIP"');
    }
  };

  const handleToggleInstruction = (key: keyof Omit<DeliveryInstructions, 'cookingNotes'>) => {
    setInstructions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleQuickCookingNote = (note: string) => {
    setInstructions(prev => ({
      ...prev,
      cookingNotes: prev.cookingNotes ? `${prev.cookingNotes}, ${note}` : note
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-amber-900/20 shadow-2xl flex flex-col text-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Your Order Bag</h3>
                <span className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} • The Madras Café
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-rose-600 transition-colors px-2 py-1 cursor-pointer"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Swiggy / Zomato Order Type Switcher (Delivery vs Dine-In vs Takeaway) */}
          <div className="p-3 bg-amber-50/80 border-b border-amber-900/10 space-y-2">
            <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-stone-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => onChangeOrderType('delivery')}
                className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrderType('dine-in')}
                className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'dine-in'
                    ? 'bg-amber-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Dine-In</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrderType('takeaway')}
                className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-amber-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Contextual sub-header depending on order type */}
            {orderType === 'delivery' ? (
              <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 truncate pr-2">
                  <MapPin className="w-4 h-4 text-amber-900 shrink-0" />
                  <div className="truncate">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Deliver to {selectedAddress.label}</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1 rounded font-semibold">
                        ⚡ {selectedAddress.etaMins} mins
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">{selectedAddress.address}</div>
                  </div>
                </div>

                <select
                  value={selectedAddress.id}
                  onChange={(e) => {
                    const found = DEFAULT_ADDRESSES.find(a => a.id === e.target.value);
                    if (found) setSelectedAddress(found);
                  }}
                  className="text-[11px] text-amber-900 font-bold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 shrink-0 cursor-pointer"
                >
                  {DEFAULT_ADDRESSES.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : orderType === 'dine-in' ? (
              <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-900 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900">Ordering to The Madras Café Table</span>
                    <div className="text-[11px] text-stone-500">Freshly brewed and served to your seat</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-semibold text-stone-600">Table:</span>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(Number(e.target.value))}
                    className="text-xs font-bold bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 text-amber-950"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20].map(n => (
                      <option key={n} value={n}>Table #{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-white p-2 rounded-xl border border-stone-200 text-xs flex items-center gap-2 text-stone-700">
                <PackageCheck className="w-4 h-4 text-amber-900 shrink-0" />
                <span>Ready for counter pickup in <strong>12-15 minutes</strong> at Khader Nawaz Khan Rd, Nungambakkam, Chennai</span>
              </div>
            )}

            {/* The Madras Gold Benefits Banner */}
            <div className="bg-amber-900 text-amber-100 rounded-xl px-3 py-1.5 text-[11px] flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <strong>The Madras Gold / One</strong>: Free Delivery on orders ₹500+
              </span>
              <span className="text-amber-300 font-bold">{isFreeDelivery ? 'UNLOCKED ✓' : `Add ${formatINR(Math.max(0, 500 - subtotal))} for FREE`}</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <ShoppingBag className="w-14 h-14 text-stone-300 mb-3 stroke-1" />
                <h4 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Treat yourself to artisanal Chikmagalur pour-overs, value combos, or healthy bowls.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 bg-amber-900 text-amber-50 rounded-xl text-xs font-semibold hover:bg-amber-950 transition-colors cursor-pointer"
                  >
                    Explore Menu
                  </button>
                  {onOpenPastOrders && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPastOrders();
                      }}
                      className="px-4 py-2.5 bg-amber-100 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-800 stroke-[2.2]" />
                      <span>⚡ Re-Order Past Meal</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Quick link to past orders / re-order */}
                {onOpenPastOrders && (
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <span className="text-stone-700 flex items-center gap-1.5 font-medium">
                      <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                      <span>Have a favorite recent order?</span>
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPastOrders();
                      }}
                      className="text-amber-900 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Re-Order →</span>
                    </button>
                  </div>
                )}
                
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs flex gap-3 text-left"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="flex items-center gap-1.5">
                              {cartItem.item.dietary === 'non-veg' ? (
                                <div className="w-3 h-3 border border-rose-600 flex items-center justify-center rounded-[2px]">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
                                </div>
                              ) : (
                                <div className="w-3 h-3 border border-emerald-600 flex items-center justify-center rounded-[2px]">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                                </div>
                              )}
                              <h4 className="font-bold text-xs text-stone-900 truncate">
                                {cartItem.item.name}
                              </h4>
                            </div>
                            {cartItem.item.category === 'combos-meals' && (
                              <span className="text-[10px] text-amber-800 font-semibold block mt-0.5">
                                ★ Value Combo Deal
                              </span>
                            )}
                          </div>

                          <span className="font-serif font-bold text-xs text-amber-900 whitespace-nowrap">
                            {formatINR(cartItem.itemTotal)}
                          </span>
                        </div>

                        {/* Customization Details */}
                        <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                          {cartItem.customizations.size && (
                            <div>Size: {cartItem.customizations.size}</div>
                          )}
                          {cartItem.customizations.milk && (
                            <div>Milk: {cartItem.customizations.milk}</div>
                          )}
                          {cartItem.customizations.sweetness && (
                            <div>Sweetness: {cartItem.customizations.sweetness}</div>
                          )}
                          {cartItem.customizations.extras && cartItem.customizations.extras.length > 0 && (
                            <div>Add-ons: {cartItem.customizations.extras.join(', ')}</div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                              className="w-6 h-6 rounded bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-stone-900">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                              className="w-6 h-6 rounded bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Swiggy / Zomato Delivery Instructions Widget */}
                {orderType === 'delivery' && (
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">
                        Delivery Instructions (One-Tap)
                      </span>
                      <span className="text-[10px] text-stone-400">Tap to select</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleToggleInstruction('noCutlery')}
                        className={`p-2 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          instructions.noCutlery 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold' 
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>🌱</span>
                        <div>
                          <div className="font-semibold leading-tight">Don't send cutlery</div>
                          <span className="text-[10px] text-stone-500 font-normal">Saves the planet</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleInstruction('leaveAtDoor')}
                        className={`p-2 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          instructions.leaveAtDoor 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold' 
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>🚪</span>
                        <div>
                          <div className="font-semibold leading-tight">Leave at door</div>
                          <span className="text-[10px] text-stone-500 font-normal">Contactless drop</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleInstruction('avoidRingingBell')}
                        className={`p-2 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          instructions.avoidRingingBell 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold' 
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>🔕</span>
                        <div>
                          <div className="font-semibold leading-tight">Avoid ringing bell</div>
                          <span className="text-[10px] text-stone-500 font-normal">Baby / pet asleep</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleInstruction('callBeforeDelivery')}
                        className={`p-2 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          instructions.callBeforeDelivery 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold' 
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>📞</span>
                        <div>
                          <div className="font-semibold leading-tight">Call before arrival</div>
                          <span className="text-[10px] text-stone-500 font-normal">Rider will phone</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Cooking Instructions / Barista Request */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">Notes for Kitchen / Barista</span>
                    <span className="text-[10px] text-stone-400">Optional</span>
                  </div>

                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Less Sweet', 'Extra Hot Kaapi', 'Extra Crispy Toast', 'Sugar on side'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleQuickCookingNote(tag)}
                        className="text-[11px] bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={instructions.cookingNotes}
                    onChange={(e) => setInstructions(prev => ({ ...prev, cookingNotes: e.target.value }))}
                    placeholder="e.g. Please make the kaapi extra piping hot..."
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                {/* Delivery Partner Tip (Swiggy / Zomato Tip Widget) */}
                {orderType === 'delivery' && (
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                          <span>Tip your delivery partner</span>
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          100% of the tip goes directly to Ramesh Kumar
                        </div>
                      </div>
                      {deliveryTip > 0 && (
                        <span className="font-bold text-amber-900 font-serif">
                          {formatINR(deliveryTip)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {[20, 30, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setDeliveryTip(amount)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            deliveryTip === amount
                              ? 'bg-amber-900 text-white border-amber-900 shadow-2xs'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {formatINR(amount)}
                        </button>
                      ))}
                      {deliveryTip > 0 && (
                        <button
                          type="button"
                          onClick={() => setDeliveryTip(0)}
                          className="text-[11px] text-stone-400 hover:text-rose-600 px-2 cursor-pointer"
                        >
                          None
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Footer Bill & Coupons & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-200 space-y-3 shrink-0 shadow-lg">
              
              {/* Swiggy / Zomato Coupon Accordion */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                    <Tag className="w-3.5 h-3.5 text-amber-900" />
                    <span>Offers & Coupons</span>
                  </div>

                  <button
                    onClick={() => setShowCouponsDrawer(!showCouponsDrawer)}
                    className="text-xs text-amber-900 font-bold hover:underline cursor-pointer"
                  >
                    {showCouponsDrawer ? 'Hide Coupons' : 'View All Coupons'}
                  </button>
                </div>

                {/* Available Coupons Drawer */}
                {showCouponsDrawer && (
                  <div className="mb-2 p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                    {POPULAR_COUPONS.map((cp) => (
                      <div key={cp.code} className="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-200">
                        <div>
                          <div className="font-mono font-bold text-amber-950 flex items-center gap-1">
                            <span>{cp.code}</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-sans">
                              {cp.tag}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500">{cp.description}</div>
                        </div>

                        <button
                          onClick={() => handleApplyCode(cp.code)}
                          className="px-2.5 py-1 bg-amber-900 hover:bg-amber-950 text-white rounded-md text-[11px] font-bold cursor-pointer"
                        >
                          APPLY
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo input field */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter MURALI50 or FIRSTSIP"
                      className="w-full pl-9 pr-3 py-1.5 text-xs uppercase bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCode(promoCode)}
                    className="px-3 py-1.5 bg-amber-900 text-white rounded-lg text-xs font-semibold hover:bg-amber-950 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded mt-1.5 border border-emerald-200">
                    <span>Coupon <strong>{appliedPromo}</strong> applied successfully!</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-600 mt-1">{promoError}</div>
                )}
              </div>

              {/* Swiggy / Zomato Itemized Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-medium text-stone-900">{formatINR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount ({appliedPromo})</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Partner Fee</span>
                    <span className="font-medium text-stone-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE (Ammukutti Gold)</span>
                      ) : (
                        formatINR(deliveryFee)
                      )}
                    </span>
                  </div>
                )}

                {packagingCharge > 0 && (
                  <div className="flex justify-between">
                    <span>Restaurant Packaging Charges</span>
                    <span className="font-medium text-stone-900">{formatINR(packagingCharge)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-medium text-stone-900">{formatINR(platformFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Govt Taxes (5% Restaurant GST)</span>
                  <span className="font-medium text-stone-900">{formatINR(gst)}</span>
                </div>

                {orderType === 'delivery' && deliveryTip > 0 && (
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Delivery Partner Tip</span>
                    <span>{formatINR(deliveryTip)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                  <span>To Pay</span>
                  <span className="font-serif text-lg text-amber-900">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(
                  discount, 
                  appliedPromo || '', 
                  instructions, 
                  deliveryTip,
                  selectedAddress,
                  tableNumber
                )}
                className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-sm flex items-center justify-between shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <span>Proceed to Pay • {orderType.toUpperCase()}</span>
                <span className="flex items-center gap-1.5 font-serif text-amber-300">
                  {formatINR(grandTotal)}
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
