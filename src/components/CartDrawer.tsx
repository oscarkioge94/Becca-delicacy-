import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, Bike, MapPin, Sparkles, ShoppingBag, Leaf, HelpCircle, CheckCircle } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryType, setDeliveryType] = useState<"dinein" | "bike">("dinein");
  const [address, setAddress] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Totals calculations
  const totals = useMemo(() => {
    let price = 0;
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    cartItems.forEach((item) => {
      price += item.menuItem.price * item.quantity;
      calories += item.menuItem.nutrition.calories * item.quantity;
      protein += item.menuItem.nutrition.protein * item.quantity;
      carbs += item.menuItem.nutrition.carbs * item.quantity;
      fats += item.menuItem.nutrition.fats * item.quantity;
    });

    const carbonSavedKg = (cartItems.reduce((acc, c) => acc + c.quantity, 0) * 0.42).toFixed(2); // 0.42kg of carbon saved per plate due to local vertical green sourcing

    return { price, calories, protein, carbs, fats, carbonSavedKg };
  }, [cartItems]);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (deliveryType === "bike" && !address) return;
    setIsCheckingOut(true);

    // Simulate short network delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1500);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutComplete(false);
    setAddress("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-md"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex animate-none">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="w-screen max-w-md bg-[#FDFBF7] border-l-2 border-[#1A1A1A] h-full shadow-2xl flex flex-col justify-between"
          id="cart-drawer-container"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-[#1A1A1A] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#C4A484]" />
              <h3 className="font-display font-black text-lg text-[#1A1A1A] uppercase tracking-tight">My Active Plate</h3>
              <span className="font-mono text-xs bg-[#1A1A1A]/10 text-[#1A1A1A] px-2.5 py-0.5 rounded-none border border-[#1A1A1A] font-bold">
                {cartItems.reduce((acc, c) => acc + c.quantity, 0)} plates
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#1A1A1A]/5 rounded-none text-[#1A1A1A]/55 hover:text-[#1A1A1A] border border-transparent hover:border-[#1A1A1A]/20 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {checkoutComplete ? (
              // Order Success View
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto"
                id="cart-success-view"
              >
                <div className="p-4 bg-[#C4A484]/20 text-[#1A1A1A] rounded-none border-2 border-[#1A1A1A] animate-pulse">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-2xl font-black uppercase text-[#1A1A1A] tracking-tighter">Plate Confirmed!</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/70 max-w-xs mx-auto leading-relaxed font-light">
                    Chef Becca is heating your hand-curated plate. Your bio-dynamic ingredients have been checked for quality and logged for tracing.
                  </p>
                </div>

                {/* Delivery details display */}
                <div className="bg-[#1A1A1A]/5 rounded-none p-4 border-2 border-[#1A1A1A] text-left w-full space-y-3">
                  <span className="font-mono text-[9px] text-[#C4A484] uppercase tracking-[0.15em] font-bold block">
                    HARVEST METRICS LOG
                  </span>
                  <div className="text-xs font-mono text-[#1A1A1A] uppercase space-y-2 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/60">DELIVERY METHOD:</span>
                      <span className="font-bold">{deliveryType === "dinein" ? "Botanical Dine-In Reserve" : "Solar Cargo Bike Courier"}</span>
                    </div>
                    {deliveryType === "bike" && (
                      <div className="flex justify-between">
                        <span className="text-[#1A1A1A]/60">COURIER DESTINATION:</span>
                        <span className="font-bold max-w-[180px] text-right line-clamp-1">{address}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/60">PLATE CALORIES:</span>
                      <span className="font-bold">{totals.calories} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]/60">CARBON OFFSET SAVED:</span>
                      <span className="font-bold text-[#C4A484] flex items-center">
                        <Leaf className="w-3.5 h-3.5 mr-1" />
                        <span>{totals.carbonSavedKg} kg CO₂</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 w-full pt-4">
                  <button
                    onClick={handleReset}
                    className="w-full bg-[#1A1A1A] text-[#FDFBF7] font-mono font-bold text-xs tracking-widest py-3 border-2 border-[#1A1A1A] rounded-none cursor-pointer uppercase hover:bg-[#1A1A1A]/95 transition-colors"
                  >
                    PREPARE NEW PLATE
                  </button>
                  <button
                    onClick={onClose}
                    className="text-xs font-mono font-bold text-[#C4A484] hover:text-[#1A1A1A] uppercase tracking-wider underline cursor-pointer"
                  >
                    Return to menu browsing
                  </button>
                </div>
              </motion.div>
            ) : cartItems.length === 0 ? (
              // Empty View
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4"
                id="cart-empty-view"
              >
                <div className="p-4 bg-[#1A1A1A]/5 text-[#1A1A1A]/40 rounded-none border border-[#1A1A1A]/10">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-[#1A1A1A] uppercase tracking-tight">Your plate is clean</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/50 max-w-xs leading-relaxed font-light">
                    Add organic botanical greens, coastal fish, and ancient slow-roasted grains to compile your seasonal diet.
                  </p>
                </div>
              </motion.div>
            ) : (
              // Active Cart Items List View
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
                
                {/* Items List */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-[#1A1A1A]/50 uppercase tracking-[0.15em] block font-bold">
                    PLATES CURRENTLY COMPILED
                  </span>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.menuItem.id}
                        layout
                        className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-none p-3 flex items-center justify-between"
                        id={`cart-item-${item.menuItem.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover rounded-none border-2 border-[#1A1A1A]"
                          />
                          <div>
                            <h4 className="font-display font-black text-xs text-[#1A1A1A] uppercase max-w-[180px] line-clamp-1">
                              {item.menuItem.name}
                            </h4>
                            <span className="font-mono text-[10px] text-[#C4A484] font-bold block mt-0.5">
                              ${item.menuItem.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity controllers */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border-2 border-[#1A1A1A] bg-[#FDFBF7] rounded-none text-[#1A1A1A]">
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                              className="px-2.5 py-1 text-xs cursor-pointer hover:bg-[#1A1A1A]/10"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                              className="px-2.5 py-1 text-xs cursor-pointer hover:bg-[#1A1A1A]/10"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.menuItem.id)}
                            className="p-1.5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:text-[#C4A484] rounded-none border border-transparent hover:border-[#1A1A1A]/20 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Live Macro Nutrition Summary Dashboard */}
                <div className="space-y-4 pt-6 border-t border-[#1A1A1A]/10">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-[#1A1A1A]/50 uppercase tracking-[0.15em] block font-bold">
                      PLATE NUTRITIONAL BALANCE
                    </span>
                    <span className="font-mono text-[10px] text-[#C4A484] font-bold flex items-center space-x-1 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Micro-Nutrient Dense</span>
                    </span>
                  </div>

                  {/* Linear progress sliders for macros */}
                  <div className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-none p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-[#1A1A1A]/70 uppercase tracking-wider">
                          <span>ENERGY VALUE:</span>
                          <span className="font-bold">{totals.calories} kcal</span>
                        </div>
                        <div className="h-2 w-full bg-[#1A1A1A]/10 rounded-none overflow-hidden border border-[#1A1A1A]/20">
                          <div
                            style={{ width: `${Math.min((totals.calories / 2000) * 100, 100)}%` }}
                            className="h-full bg-[#C4A484] transition-all duration-500"
                          />
                        </div>
                        <span className="font-mono text-[8px] text-[#1A1A1A]/40 uppercase tracking-wider block mt-0.5">
                          Daily goal: ~2000 kcal
                        </span>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-[#1A1A1A]/70 uppercase tracking-wider">
                          <span>PROTEIN SYNTHESIS:</span>
                          <span className="font-bold">{totals.protein} g</span>
                        </div>
                        <div className="h-2 w-full bg-[#1A1A1A]/10 rounded-none overflow-hidden border border-[#1A1A1A]/20">
                          <div
                            style={{ width: `${Math.min((totals.protein / 80) * 100, 100)}%` }}
                            className="h-full bg-[#1A1A1A] transition-all duration-500"
                          />
                        </div>
                        <span className="font-mono text-[8px] text-[#1A1A1A]/40 uppercase tracking-wider block mt-0.5">
                          Daily goal: ~80g
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1A1A1A]/5">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-[#1A1A1A]/70 uppercase tracking-wider">
                          <span>CARBOHYDRATES:</span>
                          <span className="font-bold">{totals.carbs} g</span>
                        </div>
                        <div className="h-2 w-full bg-[#1A1A1A]/10 rounded-none overflow-hidden border border-[#1A1A1A]/20">
                          <div
                            style={{ width: `${Math.min((totals.carbs / 250) * 100, 100)}%` }}
                            className="h-full bg-[#C4A484]/70 transition-all duration-500"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1 text-[#1A1A1A]/70 uppercase tracking-wider">
                          <span>HEALTHY LIPIDS:</span>
                          <span className="font-bold">{totals.fats} g</span>
                        </div>
                        <div className="h-2 w-full bg-[#1A1A1A]/10 rounded-none overflow-hidden border border-[#1A1A1A]/20">
                          <div
                            style={{ width: `${Math.min((totals.fats / 65) * 100, 100)}%` }}
                            className="h-full bg-[#1A1A1A]/60 transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Method selector, Contact & Settle Checkout form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-6 border-t border-[#1A1A1A]/10">
                  <span className="font-mono text-[9px] text-[#1A1A1A]/50 uppercase tracking-[0.15em] block font-bold">
                    HARVEST ARRANGEMENT
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType("dinein")}
                      className={`p-3 rounded-none border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                        deliveryType === "dinein"
                          ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7]"
                          : "bg-transparent border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-[#1A1A1A]"
                      }`}
                    >
                      <span className="font-display font-black text-xs block uppercase">Dine-In Plate</span>
                      <span className="font-mono text-[8px] block opacity-60 uppercase tracking-wider">Ready at counter</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType("bike")}
                      className={`p-3 rounded-none border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                        deliveryType === "bike"
                          ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7]"
                          : "bg-transparent border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-[#1A1A1A]"
                      }`}
                    >
                      <span className="font-display font-black text-xs block flex items-center uppercase">
                        <Bike className="w-3.5 h-3.5 mr-1" />
                        <span>Eco-Cargo Bike</span>
                      </span>
                      <span className="font-mono text-[8px] block opacity-60 uppercase tracking-wider">Zero emission</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {deliveryType === "bike" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5 overflow-hidden"
                      >
                        <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                          Deliver Sourdough & Greens To
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. 742 Evergreen Terrace, Mill district"
                            className="w-full pl-9 pr-4 py-2.5 rounded-none border-2 border-[#1A1A1A] font-sans text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484]"
                            id="cart-address-input"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pricing Breakdown & Purchase button */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center font-mono text-[10px] text-[#1A1A1A] uppercase tracking-wider">
                      <span>Carbon Reduction Benefit:</span>
                      <span className="font-bold text-[#C4A484] flex items-center font-mono">
                        <Leaf className="w-3.5 h-3.5 mr-1" />
                        <span>-{totals.carbonSavedKg} kg CO₂</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-end border-t-2 border-[#1A1A1A] pt-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#1A1A1A]/50 uppercase block tracking-wider font-bold">CURATED TOTAL PRICE</span>
                        <span className="font-display text-2xl font-black text-[#1A1A1A]">
                          ${totals.price.toFixed(2)}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isCheckingOut}
                        className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFBF7] font-mono font-bold text-xs tracking-widest uppercase px-6 py-3.5 border-2 border-[#1A1A1A] rounded-none flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 transition-colors"
                        id="cart-checkout-btn"
                      >
                        <span>{isCheckingOut ? "SECTOR SYNC..." : "CONFIRM PLATE"}</span>
                      </motion.button>
                    </div>
                  </div>
                </form>

              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
