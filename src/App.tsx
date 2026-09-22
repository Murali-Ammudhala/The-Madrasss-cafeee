/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReservationSection } from './components/ReservationSection';
import { RoasteryStory } from './components/RoasteryStory';
import { CustomerReviews } from './components/CustomerReviews';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { PastOrdersModal } from './components/PastOrdersModal';
import { ColorfulBanner } from './components/ColorfulBanner';
import { 
  MenuItem, CartItem, SelectedCustomizations, OrderType, 
  DeliveryInstructions, DeliveryAddress, ActiveOrder 
} from './types';
import { MENU_ITEMS, DEFAULT_ADDRESSES } from './data/menuData';
import { CheckCircle2, Bike, ChevronRight } from 'lucide-react';
import { formatINR } from './utils/formatCurrency';

const INITIAL_PAST_ORDERS: ActiveOrder[] = [
  {
    orderId: 'MADRAS-8204',
    orderType: 'delivery',
    items: [
      {
        cartItemId: 'past-1',
        item: MENU_ITEMS[0], // Mysore Royal Filter Kaapi
        quantity: 2,
        customizations: { sweetness: 'Traditional Sweet', milk: 'Full Cream Milk', extraCost: 0 },
        itemTotal: 240
      },
      {
        cartItemId: 'past-2',
        item: MENU_ITEMS[1], // South Indian Heritage Brekkie Combo
        quantity: 1,
        customizations: { extraCost: 0 },
        itemTotal: 295
      }
    ],
    subtotal: 535,
    discount: 50,
    deliveryFee: 0,
    packagingCharge: 25,
    platformFee: 6,
    gst: 26,
    tip: 30,
    grandTotal: 572,
    status: 'delivered',
    estimatedDeliveryMins: 0,
    createdAt: 'Yesterday at 8:45 AM',
    customerName: 'Murali Kumar',
    customerPhone: '+91 98450 23891',
    paymentMethod: 'UPI (Google Pay)',
    address: DEFAULT_ADDRESSES[0],
    deliveryInstructions: {
      noCutlery: true,
      leaveAtDoor: false,
      avoidRingingBell: false,
      callBeforeDelivery: true,
      leaveWithGuard: false,
      cookingNotes: 'Extra hot filter kaapi please'
    }
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Seed 1 signature item to make the bag feel immediately intuitive & alive
    {
      cartItemId: 'seed-1',
      item: MENU_ITEMS[0], // Mysore Royal Filter Kaapi (₹120)
      quantity: 1,
      customizations: {
        sweetness: 'Traditional Sweet',
        milk: 'Full Cream Milk',
        extraCost: 0
      },
      itemTotal: 120
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isPastOrdersOpen, setIsPastOrdersOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<ActiveOrder[]>(INITIAL_PAST_ORDERS);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<MenuItem | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  
  // Swiggy & Zomato order details state
  const [deliveryInstructions, setDeliveryInstructions] = useState<DeliveryInstructions>({
    noCutlery: true,
    leaveAtDoor: false,
    avoidRingingBell: false,
    callBeforeDelivery: true,
    leaveWithGuard: false,
    cookingNotes: ''
  });
  const [deliveryTip, setDeliveryTip] = useState<number>(30);
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(DEFAULT_ADDRESSES[0]);
  const [tableNumber, setTableNumber] = useState<number>(4);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart totals in INR
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    customizations: SelectedCustomizations
  ) => {
    const unitPrice = item.price + (customizations.extraCost || 0);
    const itemTotal = unitPrice * quantity;
    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      quantity,
      customizations,
      itemTotal,
    };

    setCartItems(prev => [...prev, newCartItem]);
    showToast(`Added ${quantity}x ${item.name} (${formatINR(itemTotal)}) to bag`);
  };

  // Quick add without customizations
  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 1, {
      extraCost: 0,
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const unitPrice = item.item.price + (item.customizations.extraCost || 0);
          return {
            ...item,
            quantity: newQuantity,
            itemTotal: unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = (
    appliedDiscount: number, 
    code: string,
    instructions: DeliveryInstructions,
    tip: number,
    address: DeliveryAddress,
    tableNum: number
  ) => {
    setDiscountAmount(appliedDiscount);
    setPromoCode(code);
    setDeliveryInstructions(instructions);
    setDeliveryTip(tip);
    setSelectedAddress(address);
    setTableNumber(tableNum);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: ActiveOrder) => {
    setCartItems([]);
    setDiscountAmount(0);
    setPromoCode('');
    setActiveOrder(order);
    setOrderHistory(prev => [order, ...prev]);
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);
    showToast(`Order #${order.orderId} confirmed! Kitchen is brewing.`);
  };

  const handleReorderOrder = (order: ActiveOrder) => {
    const clonedItems: CartItem[] = order.items.map(item => ({
      ...item,
      cartItemId: `${item.item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    }));

    setCartItems(prev => [...prev, ...clonedItems]);
    setIsTrackingOpen(false);
    setIsPastOrdersOpen(false);
    setIsCartOpen(true);
    showToast(`Re-ordered ${order.items.length} items from #${order.orderId}! Added to bag.`);
  };

  const handleReorderItem = (cartItem: CartItem) => {
    const newItem: CartItem = {
      ...cartItem,
      cartItemId: `${cartItem.item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setCartItems(prev => [...prev, newItem]);
    showToast(`Added ${cartItem.item.name} to bag!`);
  };

  const handleApplyMurali50Coupon = (code: string) => {
    setPromoCode(code);
    setDiscountAmount(50);
    showToast(`🎉 Coupon ${code} activated! Enjoy Flat ₹50 OFF.`);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-amber-200 antialiased flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-950 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-3 text-xs sm:text-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Active Order Tracker Bar (Swiggy / Zomato Persistent Floating Widget) */}
      {activeOrder && !isTrackingOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md">
          <div 
            onClick={() => setIsTrackingOpen(true)}
            className="bg-stone-950 text-white p-3 rounded-2xl border border-stone-800 shadow-2xl flex items-center justify-between cursor-pointer hover:bg-stone-900 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
                <Bike className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">
                    Order #{activeOrder.orderId}
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 rounded">
                    {activeOrder.status === 'delivered' ? 'Delivered' : 'Live Tracking'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300">
                  {activeOrder.status === 'delivered'
                    ? 'Enjoy your meal from The Madras!'
                    : `Arriving in ~${activeOrder.estimatedDeliveryMins || 24} mins`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
              <span>Track</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleNavigateToSection('reservation-section')}
        onNavigateToSection={handleNavigateToSection}
        activeOrder={activeOrder}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenPastOrders={() => setIsPastOrdersOpen(true)}
      />

      {/* Hero Showcase */}
      <Hero
        onExploreMenu={() => handleNavigateToSection('menu-section')}
        onBookTable={() => handleNavigateToSection('reservation-section')}
        onQuickOrder={() => handleQuickAdd(MENU_ITEMS[0])}
      />

      {/* Colorful Promotional Banner for MURALI50 & Chennai Roastery */}
      <ColorfulBanner
        onExploreMenu={() => handleNavigateToSection('menu-section')}
        onBookTable={() => handleNavigateToSection('visit-section')}
        onApplyCoupon={handleApplyMurali50Coupon}
      />

      {/* Interactive Menu Section with Swiggy/Zomato filters & Value Combos */}
      <MenuSection
        onSelectItem={(item) => setSelectedItemForCustomization(item)}
        onQuickAdd={handleQuickAdd}
        onUpdateCartItemQty={handleUpdateQuantity}
        cartItems={cartItems}
        onOpenPastOrders={() => setIsPastOrdersOpen(true)}
      />

      {/* Roastery Story & Chikmagalur Heritage */}
      <RoasteryStory />

      {/* Table Reservation & Workspace Booking */}
      <ReservationSection />

      {/* Community Ratings & Reviews */}
      <CustomerReviews />

      {/* Visit, Amenities & Hours */}
      <VisitSection />

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Customizer Modal */}
      <ItemCustomizerModal
        item={selectedItemForCustomization}
        isOpen={Boolean(selectedItemForCustomization)}
        onClose={() => setSelectedItemForCustomization(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer with Swiggy / Zomato features */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenPastOrders={() => setIsPastOrdersOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        discount={discountAmount}
        promoCode={promoCode}
        deliveryInstructions={deliveryInstructions}
        deliveryTip={deliveryTip}
        selectedAddress={selectedAddress}
        tableNumber={tableNumber}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Live Order Tracking Modal (Swiggy / Zomato experience) */}
      <OrderTrackingModal
        order={activeOrder}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        onOrderUpdate={setActiveOrder}
        onReorder={handleReorderOrder}
      />

      {/* Past Orders & 1-Click Re-Order Modal */}
      <PastOrdersModal
        isOpen={isPastOrdersOpen}
        onClose={() => setIsPastOrdersOpen(false)}
        orders={orderHistory}
        onReorderOrder={handleReorderOrder}
        onReorderItem={handleReorderItem}
        onOpenTracking={(order) => {
          setActiveOrder(order);
          setIsTrackingOpen(true);
        }}
      />

    </div>
  );
}
