export type DietaryType = 'veg' | 'non-veg' | 'vegan';

export type MenuCategory = 
  | 'all'
  | 'healthy-wellness'
  | 'combos-meals'
  | 'signature-coffee'
  | 'artisan-chai'
  | 'sourdough-bites'
  | 'rolls-buns'
  | 'desserts-bakes'
  | 'all-day-brekkie';

export interface CustomizationOption {
  name: string;
  priceDelta: number; // in INR
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // in INR
  originalPrice?: number; // for strikethrough combos & deals
  savingsAmount?: number;
  description: string;
  dietary: DietaryType;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  rating?: number;
  ratingCount?: number;
  prepTime?: string;
  calories?: number;
  healthTag?: string;
  comboIncludes?: string[];
  image: string;
  roastLevel?: 'Light' | 'Medium' | 'Dark';
  brewMethod?: string;
  customization?: {
    sizes?: { name: string; priceDelta: number }[];
    milks?: { name: string; priceDelta: number }[];
    sweetness?: string[];
    extras?: { name: string; priceDelta: number }[];
  };
}

export interface SelectedCustomizations {
  size?: string;
  milk?: string;
  sweetness?: string;
  extras?: string[];
  extraCost: number;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customizations: SelectedCustomizations;
  itemTotal: number; // price * quantity + extras
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface DeliveryInstructions {
  noCutlery: boolean;
  leaveAtDoor: boolean;
  avoidRingingBell: boolean;
  callBeforeDelivery: boolean;
  leaveWithGuard: boolean;
  cookingNotes: string;
}

export interface DeliveryAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  address: string;
  landmark?: string;
  distanceKm: number;
  etaMins: number;
}

export type OrderProgressStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'cooking' 
  | 'rider_assigned' 
  | 'out_for_delivery' 
  | 'delivered';

export interface ActiveOrder {
  orderId: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  packagingCharge: number;
  platformFee: number;
  gst: number;
  tip: number;
  grandTotal: number;
  status: OrderProgressStatus;
  estimatedDeliveryMins: number;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  paymentMethod?: string;
  address?: DeliveryAddress;
  tableNumber?: number;
  deliveryInstructions: DeliveryInstructions;
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
    deliveriesCount: number;
    photo: string;
  };
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'cozy-indoor' | 'sunlit-veranda' | 'work-bar';
  notes?: string;
  status: 'confirmed';
  tableNumber: number;
}

