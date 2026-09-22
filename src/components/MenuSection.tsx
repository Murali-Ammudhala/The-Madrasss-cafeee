import React, { useState, useMemo } from 'react';
import { 
  Search, Sparkles, Coffee, Flame, Sandwich, Croissant, 
  Cake, Sun, Plus, Minus, SlidersHorizontal, Check, Star, 
  Clock, MapPin, Zap, Tag, ShieldCheck, ChevronDown, Heart, RotateCcw
} from 'lucide-react';
import { MenuItem, MenuCategory, DietaryType, CartItem } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { formatINR } from '../utils/formatCurrency';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onUpdateCartItemQty?: (itemId: string, newQty: number) => void;
  cartItems: CartItem[];
  onOpenPastOrders?: () => void;
}

type SortOption = 'relevance' | 'rating' | 'price-low' | 'price-high' | 'fast-prep';

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
  onUpdateCartItemQty,
  cartItems,
  onOpenPastOrders,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [highRatingOnly, setHighRatingOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('relevance');

  // Compute live item counts for filters
  const vegCount = useMemo(() => 
    MENU_ITEMS.filter(i => (activeCategory === 'all' || i.category === activeCategory) && (i.dietary === 'veg' || i.dietary === 'vegan')).length,
    [activeCategory]
  );
  const nonVegCount = useMemo(() => 
    MENU_ITEMS.filter(i => (activeCategory === 'all' || i.category === activeCategory) && i.dietary === 'non-veg').length,
    [activeCategory]
  );

  // Filter and sort items (Swiggy / Zomato algorithm style)
  const filteredAndSortedItems = useMemo(() => {
    let items = MENU_ITEMS.filter(item => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter: Pure Veg vs Non-Veg
      if (dietaryFilter === 'veg' && item.dietary !== 'veg' && item.dietary !== 'vegan') {
        return false;
      }
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') {
        return false;
      }
      // Bestseller filter
      if (bestsellerOnly && !item.isBestseller) {
        return false;
      }
      // High rating (4.8+) filter
      if (highRatingOnly && (item.rating || 0) < 4.8) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesBrew = item.brewMethod?.toLowerCase().includes(q);
        const matchesCombo = item.comboIncludes?.some(ci => ci.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesBrew || matchesCombo;
      }
      return true;
    });

    // Sorting
    return items.sort((a, b) => {
      if (selectedSort === 'rating') {
        return (b.rating || 4.5) - (a.rating || 4.5);
      }
      if (selectedSort === 'price-low') {
        return a.price - b.price;
      }
      if (selectedSort === 'price-high') {
        return b.price - a.price;
      }
      if (selectedSort === 'fast-prep') {
        const getMins = (p?: string) => parseInt(p || '20', 10);
        return getMins(a.prepTime) - getMins(b.prepTime);
      }
      // Default: Combos and Bestsellers first
      if (a.category === 'combos-meals' && b.category !== 'combos-meals') return -1;
      if (b.category === 'combos-meals' && a.category !== 'combos-meals') return 1;
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });
  }, [activeCategory, dietaryFilter, bestsellerOnly, highRatingOnly, searchQuery, selectedSort]);

  const getItemCountInCart = (itemId: string): number => {
    return cartItems
      .filter(c => c.item.id === itemId)
      .reduce((sum, c) => sum + c.quantity, 0);
  };

  const getFirstCartItemId = (itemId: string): string | null => {
    const found = cartItems.find(c => c.item.id === itemId);
    return found ? found.cartItemId : null;
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4 text-emerald-700" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Croissant': return <Croissant className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu-section" className="py-12 bg-[#FAF7F2] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Swiggy / Zomato Restaurant Header Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left: Brand info & Ratings */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  The Madras Roastery & Kitchen
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-600 font-medium">Specialty Kaapi, Healthy Wellness, Sourdough</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Order Online from The Madras
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5">
                <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3 fill-current" />
                  <span>4.9</span>
                  <span className="font-normal opacity-90">(1.8k+ ratings)</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>25 - 30 mins</span>
                </div>

                <div className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>KNK Road, Nungambakkam, Chennai • 1.2 km</span>
                </div>

                <span className="text-stone-400 hidden sm:inline">•</span>
                <span className="font-medium text-stone-700">₹200 for one</span>
              </div>
            </div>

            {/* Right: Live Offers badge (Swiggy / Zomato style) */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center gap-3 max-w-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span>FLAT ₹50 OFF</span>
                  <span className="bg-amber-900 text-amber-100 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
                    MURALI50
                  </span>
                </div>
                <div className="text-stone-600 mt-0.5">
                  Use code <strong className="text-amber-950">MURALI50</strong> on ₹199+ • Free delivery ₹500+
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Featured Combos Promo Banner (Super Saver) */}
        <div 
          onClick={() => setActiveCategory('combos-meals')}
          className="cursor-pointer mb-8 bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden group transition-all"
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>SUPER SAVER COMBOS & MEALS</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-50">
                Curated Coffee & Meal Combos — Save up to ₹140
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl">
                South Indian Heritage Brekkie, Workstation Mega Meals, High-Tea Treats, and Couple Roastery Combos at unbeatable value.
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory('combos-meals');
              }}
              className="px-4 py-2.5 bg-amber-300 hover:bg-amber-200 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 w-fit cursor-pointer"
            >
              Explore {MENU_ITEMS.filter(i => i.category === 'combos-meals').length} Combos →
            </button>
          </div>
        </div>

        {/* Swiggy / Zomato Filters & Search Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search filter kaapi, combos, sourdough, tiramisu..."
                className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-800 text-stone-800 placeholder-stone-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Buttons: Swiggy / Zomato Veg & Non-Veg Switches */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Pure Veg Toggle */}
              <button
                id="btn-filter-pure-veg"
                onClick={() => setDietaryFilter(prev => prev === 'veg' ? 'all' : 'veg')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs ring-2 ring-emerald-400/40'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
                title="Show only vegetarian and vegan items"
              >
                <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center rounded-[2px] p-[1px] bg-white">
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                </div>
                <span>Pure Veg</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  dietaryFilter === 'veg' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {dietaryFilter === 'veg' ? '✓' : vegCount}
                </span>
              </button>

              {/* Non-Veg Toggle */}
              <button
                id="btn-filter-non-veg"
                onClick={() => setDietaryFilter(prev => prev === 'non-veg' ? 'all' : 'non-veg')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-50 border-rose-500 text-rose-950 font-bold shadow-2xs ring-2 ring-rose-400/40'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
                title="Show only non-vegetarian items"
              >
                <div className="w-3.5 h-3.5 border border-rose-600 flex items-center justify-center rounded-[2px] p-[1.5px] bg-white">
                  <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-rose-600"></div>
                </div>
                <span>Non-Veg</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  dietaryFilter === 'non-veg' ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {dietaryFilter === 'non-veg' ? '✓' : nonVegCount}
                </span>
              </button>

              {/* Bestseller Filter */}
              <button
                onClick={() => setBestsellerOnly(!bestsellerOnly)}
                className={`px-3 py-2 rounded-xl border font-medium transition-all cursor-pointer ${
                  bestsellerOnly
                    ? 'bg-amber-900 border-amber-900 text-white font-bold'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                ★ Bestseller
              </button>

              {/* High Rating Filter */}
              <button
                onClick={() => setHighRatingOnly(!highRatingOnly)}
                className={`px-3 py-2 rounded-xl border font-medium transition-all cursor-pointer ${
                  highRatingOnly
                    ? 'bg-emerald-800 border-emerald-800 text-white font-bold'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                Rating 4.8+
              </button>

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-stone-300 text-stone-700 text-xs py-2 pl-3 pr-8 rounded-xl font-medium focus:outline-hidden focus:ring-1 focus:ring-amber-800 cursor-pointer"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="rating">Sort: Rating (High to Low)</option>
                  <option value="price-low">Sort: Cost (Low to High)</option>
                  <option value="price-high">Sort: Cost (High to Low)</option>
                  <option value="fast-prep">Sort: Fastest Prep (&lt;15 mins)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            </div>

          </div>

          {/* Category Tabs (Swiggy / Zomato horizontal scrolling bar) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none border-b border-stone-200">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? MENU_ITEMS.length 
                : MENU_ITEMS.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-900 text-amber-50 shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/80'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-stone-500'}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Swiggy / Zomato "Order Again / Re-order" Quick Shelf */}
        <div id="section-reorder-shelf" className="mb-8 bg-amber-50/70 border border-amber-900/15 rounded-3xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                    ⚡ Order Again (Re-Order in 1-Click)
                  </h4>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Quick Repeat
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Instantly re-order your staple favorites or browse your past order receipts
                </p>
              </div>
            </div>

            {onOpenPastOrders && (
              <button
                id="btn-menu-view-all-past-orders"
                onClick={onOpenPastOrders}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 hover:underline flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-amber-900/20 shadow-2xs"
              >
                <span>View Past Orders</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Quick Repeat Cards Rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              MENU_ITEMS[0], // Mysore Royal Filter Kaapi
              MENU_ITEMS[1], // South Indian Heritage Brekkie Combo
              MENU_ITEMS.find(i => i.id === 'foxtail-millet-idli') || MENU_ITEMS[2], // Millet Idli Bowl
              MENU_ITEMS.find(i => i.id === 'avocado-sourdough') || MENU_ITEMS[3]   // Sourdough
            ].filter(Boolean).map(item => (
              <div
                key={`reorder-quick-${item.id}`}
                className="bg-white rounded-2xl p-3 border border-stone-200 hover:border-amber-900/30 shadow-2xs flex items-center justify-between gap-2.5 transition-all group"
              >
                <div 
                  className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-100"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-stone-900 truncate group-hover:text-amber-900">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      {formatINR(item.price)}
                    </div>
                  </div>
                </div>

                <button
                  id={`btn-quick-reorder-${item.id}`}
                  onClick={() => onQuickAdd(item)}
                  className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-900 text-amber-950 hover:text-white rounded-lg text-[11px] font-bold transition-all shadow-2xs shrink-0 cursor-pointer flex items-center gap-1"
                  title="Re-order this item"
                >
                  <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                  <span>Re-Order</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <span>
            {dietaryFilter === 'non-veg' ? (
              <>Showing <strong>{filteredAndSortedItems.length}</strong> Non-Veg delicacies in The Madras menu</>
            ) : dietaryFilter === 'veg' ? (
              <>Showing <strong>{filteredAndSortedItems.length}</strong> Pure Veg delicacies in The Madras menu</>
            ) : (
              <>Showing <strong>{filteredAndSortedItems.length}</strong> items in The Madras menu</>
            )}
          </span>
          {(activeCategory !== 'all' || dietaryFilter !== 'all' || bestsellerOnly || highRatingOnly || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setBestsellerOnly(false);
                setHighRatingOnly(false);
                setSearchQuery('');
              }}
              className="text-amber-900 font-bold hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menu Items Grid: Swiggy / Zomato card layout */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
            <Coffee className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No matching delicacies found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find items matching your filters. Try clearing {dietaryFilter !== 'all' ? `"${dietaryFilter === 'non-veg' ? 'Non-Veg' : 'Pure Veg'}"` : 'your filters'} or reset the category.
            </p>
            <button
              onClick={() => { 
                setSearchQuery(''); 
                setDietaryFilter('all'); 
                setBestsellerOnly(false); 
                setHighRatingOnly(false); 
                setActiveCategory('all'); 
              }}
              className="mt-4 px-4 py-2 bg-amber-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Show Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredAndSortedItems.map(item => {
              const inCartCount = getItemCountInCart(item.id);
              const hasCustomizations = item.customization && (
                item.customization.sizes || item.customization.milks || item.customization.extras || item.customization.sweetness
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex gap-4 text-left group"
                >
                  
                  {/* Left Side: Info, Ratings, Prices, Combo items */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Dietary + Bestseller Row */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {/* Veg / Non-Veg symbol */}
                        {item.dietary === 'non-veg' ? (
                          <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-rose-800" title="Non-Vegetarian">
                            <div className="w-3.5 h-3.5 border border-rose-600 flex items-center justify-center rounded-[2px] p-[1.5px] bg-white">
                              <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-rose-600"></div>
                            </div>
                            <span>NON-VEG</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-800" title="Vegetarian">
                            <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center rounded-[2px] p-[1px] bg-white">
                              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                            </div>
                            <span>VEG</span>
                          </div>
                        )}

                        {item.isBestseller && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                            Bestseller
                          </span>
                        )}

                        {item.isChefSpecial && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                            Chef's Pick
                          </span>
                        )}

                        {item.category === 'combos-meals' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                            Combo Deal
                          </span>
                        )}

                        {item.healthTag && (
                          <span className="text-[10px] font-bold tracking-tight text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            🌿 {item.healthTag}
                          </span>
                        )}

                        {item.calories && (
                          <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                            {item.calories} kcal
                          </span>
                        )}
                      </div>

                      {/* Item Name */}
                      <h4 className="font-bold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                        {item.name}
                      </h4>

                      {/* Pricing with Strikethrough & Savings Badge (Combos) */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-serif font-bold text-sm sm:text-base text-stone-900">
                          {formatINR(item.price)}
                        </span>

                        {item.originalPrice && (
                          <>
                            <span className="text-xs text-stone-400 line-through font-serif">
                              {formatINR(item.originalPrice)}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                              SAVE {formatINR(item.savingsAmount || (item.originalPrice - item.price))}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Rating & Prep time (Swiggy / Zomato style) */}
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-2">
                        <span className="inline-flex items-center gap-1 font-bold text-white bg-emerald-700 px-1.5 py-0.5 rounded-md text-[11px] shadow-2xs">
                          <span>★</span>
                          <span>{item.rating?.toFixed(1) || '4.8'}</span>
                        </span>
                        <span className="text-[11px] font-medium text-stone-500">
                          ({item.ratingCount ? `${item.ratingCount.toLocaleString()} ratings` : '420+ ratings'})
                        </span>

                        <span className="hidden sm:flex items-center gap-1 text-[11px] text-stone-500 ml-auto">
                          <Clock className="w-3 h-3 text-amber-800" />
                          <span>{item.prepTime || '15 mins'}</span>
                        </span>
                      </div>

                      {/* Combo Included Items List (if applicable) */}
                      {item.comboIncludes && item.comboIncludes.length > 0 && (
                        <div className="mt-2.5 p-2 bg-amber-50/70 border border-amber-900/10 rounded-xl space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                            Combo Includes:
                          </span>
                          <ul className="text-[11px] text-stone-700 space-y-0.5">
                            {item.comboIncludes.map((inc, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0"></span>
                                <span className="truncate">{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs text-stone-500 leading-relaxed mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Customisable indicator */}
                    {hasCustomizations && (
                      <div className="text-[11px] text-amber-800 font-medium mt-2">
                        Customisable options available
                      </div>
                    )}
                  </div>

                  {/* Right Side: Image with Swiggy/Zomato Floating ADD button */}
                  <div className="w-28 sm:w-32 shrink-0 flex flex-col items-center justify-between">
                    <div className="relative w-full h-24 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 shadow-2xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Swiggy/Zomato "ADD" Button overlayed at bottom */}
                    <div className="-mt-3 relative z-10 w-full flex flex-col items-center">
                      {inCartCount > 0 ? (
                        <div className="w-24 bg-white border-2 border-emerald-600 rounded-xl shadow-md py-1 px-1.5 flex items-center justify-between text-xs font-bold text-emerald-800">
                          {/* Minus Button */}
                          <button
                            id={`btn-minus-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const matchingItems = cartItems.filter(c => c.item.id === item.id);
                              const last = matchingItems[matchingItems.length - 1];
                              if (last && onUpdateCartItemQty) {
                                onUpdateCartItemQty(last.cartItemId, last.quantity - 1);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 rounded-md transition-colors active:scale-90 cursor-pointer"
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>

                          {/* Quantity Count */}
                          <span className="text-xs font-extrabold text-stone-900 select-none">
                            {inCartCount}
                          </span>

                          {/* Plus Button */}
                          <button
                            id={`btn-plus-${item.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const matchingItems = cartItems.filter(c => c.item.id === item.id);
                              const last = matchingItems[matchingItems.length - 1];
                              if (last && onUpdateCartItemQty) {
                                onUpdateCartItemQty(last.cartItemId, last.quantity + 1);
                              } else {
                                onQuickAdd(item);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 rounded-md transition-colors active:scale-90 cursor-pointer"
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (hasCustomizations) {
                              onSelectItem(item);
                            } else {
                              onQuickAdd(item);
                            }
                          }}
                          className="w-24 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 border-2 border-emerald-600 rounded-xl text-xs font-extrabold shadow-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>ADD</span>
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      )}

                      {hasCustomizations && (
                        <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-tight">
                          Customisable
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
