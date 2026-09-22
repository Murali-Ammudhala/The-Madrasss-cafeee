import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';
import { MenuItem, SelectedCustomizations } from '../types';
import { formatINR } from '../utils/formatCurrency';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customizations: SelectedCustomizations) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    item.customization?.sizes?.[0]?.name
  );
  const [selectedMilk, setSelectedMilk] = useState<string | undefined>(
    item.customization?.milks?.[0]?.name
  );
  const [selectedSweetness, setSelectedSweetness] = useState<string | undefined>(
    item.customization?.sweetness?.[0]
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate extra costs in INR
  let extraPerItem = 0;
  if (selectedSize && item.customization?.sizes) {
    const s = item.customization.sizes.find(x => x.name === selectedSize);
    if (s) extraPerItem += s.priceDelta;
  }
  if (selectedMilk && item.customization?.milks) {
    const m = item.customization.milks.find(x => x.name === selectedMilk);
    if (m) extraPerItem += m.priceDelta;
  }
  if (selectedExtras.length > 0 && item.customization?.extras) {
    selectedExtras.forEach(extraName => {
      const ex = item.customization?.extras?.find(x => x.name === extraName);
      if (ex) extraPerItem += ex.priceDelta;
    });
  }

  const unitTotal = item.price + extraPerItem;
  const grandTotal = unitTotal * quantity;

  const toggleExtra = (extraName: string) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter(e => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  const handleConfirm = () => {
    onAddToCart(item, quantity, {
      size: selectedSize,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      extras: selectedExtras,
      extraCost: extraPerItem,
      specialInstructions: specialInstructions.trim() ? specialInstructions : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-amber-900/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-stone-200 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl font-bold">{item.name}</h3>
              <span className="font-serif text-xl font-bold text-amber-300">
                {formatINR(item.price)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {item.dietary === 'non-veg' ? (
                <span className="inline-flex items-center gap-1 font-bold text-rose-200 bg-rose-950/85 border border-rose-500/50 px-2 py-0.5 rounded text-[11px] shadow-2xs">
                  <span className="w-2.5 h-2.5 border border-rose-400 flex items-center justify-center rounded-[2px] p-[1px] bg-white/10">
                    <span className="w-0 h-0 border-l-[2.5px] border-l-transparent border-r-[2.5px] border-r-transparent border-b-[4.5px] border-b-rose-400"></span>
                  </span>
                  <span>Non-Veg</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-200 bg-emerald-950/85 border border-emerald-500/50 px-2 py-0.5 rounded text-[11px] shadow-2xs">
                  <span className="w-2.5 h-2.5 border border-emerald-400 flex items-center justify-center rounded-[2px] p-[1px] bg-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <span>Veg</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 font-bold text-white bg-emerald-700 px-1.5 py-0.5 rounded text-[11px] shadow-2xs">
                <span>★</span>
                <span>{item.rating?.toFixed(1) || '4.9'}</span>
              </span>
              <span className="text-[11px] text-stone-200">
                ({item.ratingCount ? `${item.ratingCount.toLocaleString()} ratings` : '500+ ratings'})
              </span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-[11px] text-amber-200 font-medium">
                {item.prepTime || '15 mins'}
              </span>
            </div>
            {item.healthTag && (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded">
                  🌿 {item.healthTag}
                </span>
                {item.calories && (
                  <span className="text-[10px] font-semibold text-stone-200 bg-stone-900/70 px-1.5 py-0.5 rounded">
                    {item.calories} kcal
                  </span>
                )}
              </div>
            )}
            <p className="text-xs text-stone-200 line-clamp-1 mt-1">{item.description}</p>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-left text-sm text-stone-800">
          
          {/* Sizes */}
          {item.customization?.sizes && item.customization.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Choose Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.sizes.map(sizeOpt => {
                  const isSelected = selectedSize === sizeOpt.name;
                  return (
                    <button
                      key={sizeOpt.name}
                      type="button"
                      onClick={() => setSelectedSize(sizeOpt.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-amber-800 bg-amber-900/10 text-amber-950 font-semibold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                      }`}
                    >
                      <span className="text-xs">{sizeOpt.name}</span>
                      {sizeOpt.priceDelta > 0 && (
                        <span className="text-xs text-amber-800 font-medium">+{formatINR(sizeOpt.priceDelta)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {item.customization?.milks && item.customization.milks.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Milk Choice
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.customization.milks.map(milkOpt => {
                  const isSelected = selectedMilk === milkOpt.name;
                  return (
                    <button
                      key={milkOpt.name}
                      type="button"
                      onClick={() => setSelectedMilk(milkOpt.name)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-amber-800 bg-amber-900/10 text-amber-950 font-semibold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                      }`}
                    >
                      <span className="text-xs">{milkOpt.name}</span>
                      <span className="text-[11px] text-amber-800 font-medium mt-1">
                        {milkOpt.priceDelta === 0 ? 'Standard' : `+${formatINR(milkOpt.priceDelta)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.customization?.sweetness && item.customization.sweetness.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Sweetness Level
              </label>
              <div className="flex flex-wrap gap-2">
                {item.customization.sweetness.map(sweetOpt => {
                  const isSelected = selectedSweetness === sweetOpt;
                  return (
                    <button
                      key={sweetOpt}
                      type="button"
                      onClick={() => setSelectedSweetness(sweetOpt)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-800 bg-amber-900 text-white font-medium'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {sweetOpt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras / Add-ons */}
          {item.customization?.extras && item.customization.extras.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Add-ons & Extras
              </label>
              <div className="space-y-1.5">
                {item.customization.extras.map(extra => {
                  const isChecked = selectedExtras.includes(extra.name);
                  return (
                    <div
                      key={extra.name}
                      onClick={() => toggleExtra(extra.name)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-700 bg-amber-100/50 text-amber-950 font-medium'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-amber-900 border-amber-900 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs">{extra.name}</span>
                      </div>
                      <span className="text-xs text-amber-900 font-semibold">+{formatINR(extra.priceDelta)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
              Note to Barista / Kitchen (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra hot, serve on side, warm croissant"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-800 placeholder-stone-400"
            />
          </div>
        </div>

        {/* Footer with quantity and Add to Bag */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 bg-stone-100 rounded-xl p-1 border border-stone-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-stone-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-semibold text-sm flex items-center justify-between shadow-sm active:scale-98 transition-all"
          >
            <span>Add to Order Bag</span>
            <span className="font-serif font-bold text-amber-300">{formatINR(grandTotal)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
