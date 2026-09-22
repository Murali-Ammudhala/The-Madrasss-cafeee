import React from 'react';
import { 
  X, RotateCcw, Clock, CheckCircle2, ChevronRight, 
  ShoppingBag, Sparkles, MapPin, Receipt, ArrowRight, Utensils
} from 'lucide-react';
import { ActiveOrder, CartItem } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface PastOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ActiveOrder[];
  onReorderOrder: (order: ActiveOrder) => void;
  onReorderItem: (item: CartItem) => void;
  onOpenTracking: (order: ActiveOrder) => void;
}

export const PastOrdersModal: React.FC<PastOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorderOrder,
  onReorderItem,
  onOpenTracking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs">
      <div 
        id="past-orders-modal"
        className="bg-[#FAF7F2] border border-amber-900/20 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-900">
              <RotateCcw className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Your Past Orders & Re-Order
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Swiggy & Zomato Style
                </span>
              </div>
              <p className="text-xs text-stone-500">
                1-Click repeat your favorite brews, breakfast bowls, and combos
              </p>
            </div>
          </div>

          <button
            id="close-past-orders-modal"
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-stone-200">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-800">No past orders yet</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Once you place an order, you can re-order your favorite coffee and food in a single tap here!
              </p>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.orderId}
                id={`order-card-${order.orderId}`}
                className="bg-white border border-stone-200 hover:border-amber-900/30 rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-4"
              >
                {/* Order Top Banner */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-stone-900">
                        Order #{order.orderId}
                      </span>
                      <span className="text-xs text-stone-400">•</span>
                      <span className="text-xs font-medium text-stone-600">
                        {order.createdAt}
                      </span>
                      {order.status === 'delivered' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full animate-pulse">
                          <Clock className="w-3 h-3 text-amber-600" />
                          In Progress
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span className="truncate max-w-xs">{order.address?.label || 'Indiranagar'}, {order.address?.address || '12th Main'}</span>
                      <span>•</span>
                      <span className="font-semibold text-stone-700">{formatINR(order.grandTotal)}</span>
                    </div>
                  </div>

                  {/* Primary Re-order Action Button */}
                  <button
                    id={`btn-reorder-entire-${order.orderId}`}
                    onClick={() => onReorderOrder(order)}
                    className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-xs shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>⚡ Re-Order Meal</span>
                  </button>
                </div>

                {/* Items in this order */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} in this order:
                  </span>

                  <div className="divide-y divide-stone-100">
                    {order.items.map((cartItem, idx) => (
                      <div 
                        key={`${cartItem.cartItemId || idx}`} 
                        className="py-2.5 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-lg object-cover border border-stone-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${cartItem.item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                              <span className="font-semibold text-stone-900">
                                {cartItem.quantity}x {cartItem.item.name}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {cartItem.customizations.sweetness && (
                                <span>{cartItem.customizations.sweetness} • </span>
                              )}
                              {cartItem.customizations.milk && (
                                <span>{cartItem.customizations.milk}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-semibold text-stone-800">
                            {formatINR(cartItem.itemTotal)}
                          </span>
                          
                          {/* Individual Item Re-order button */}
                          <button
                            id={`btn-reorder-item-${cartItem.item.id}`}
                            onClick={() => onReorderItem(cartItem)}
                            className="py-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                            title="Add 1 more of this item to bag"
                          >
                            <span>+ Repeat</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Order Details / Live Track link */}
                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                  <span className="text-[11px]">
                    Paid via {order.paymentMethod || 'UPI (Google Pay)'}
                  </span>

                  <button
                    onClick={() => {
                      onOpenTracking(order);
                      onClose();
                    }}
                    className="text-amber-800 hover:text-amber-950 font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>View Bill & Live Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="p-4 bg-amber-50/70 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
            <span>Clicking <strong>⚡ Re-Order Meal</strong> copies all items with your custom preferences straight into your bag.</span>
          </div>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-xs shrink-0 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
