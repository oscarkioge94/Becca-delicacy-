import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import MenuSection from "./components/MenuSection";
import SourcingExplorer from "./components/SourcingExplorer";
import Experiences from "./components/Experiences";
import ReservationSection from "./components/ReservationSection";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { MenuItem, CartItem } from "./types";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("becca_foodies_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    }
  }, []);

  // Save cart to local storage when it changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("becca_foodies_cart", JSON.stringify(items));
  };

  // Add item to cart
  const handleAddToPlate = (item: MenuItem) => {
    const existing = cartItems.find((i) => i.menuItem.id === item.id);
    if (existing) {
      // If already added, increase quantity or just notify. Let's toggle/increase
      const updated = cartItems.map((i) =>
        i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { menuItem: item, quantity: 1 }]);
    }
    // Automatically slide-open cart drawer to showcase the dynamic nutrient balance!
    setIsCartOpen(true);
  };

  // Update quantities
  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.menuItem.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.menuItem.id !== id);
    saveCart(updated);
  };

  // Clear cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Quick action scrolling anchors
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addedItemIds = cartItems.map((i) => i.menuItem.id);
  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <div className="bg-[#FAF7F0] min-h-screen text-[#0C231E] selection:bg-[#C87A53]/30 scroll-smooth">
      
      {/* Sticky Premium Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Interactive Hero Header */}
        <Hero
          onExploreMenu={() => scrollToSection("#menu")}
          onExploreSourcing={() => scrollToSection("#sourcing")}
        />

        {/* Philosophy Story Bento Grid */}
        <Philosophy />

        {/* Categories Menu Plate Explorer */}
        <MenuSection
          onAddToPlate={handleAddToPlate}
          addedItemIds={addedItemIds}
        />

        {/* Interactive Foraging Supply Map */}
        <SourcingExplorer />

        {/* Sizable Catering Planner */}
        <Experiences />
      </main>

      {/* Sophisticated Footer */}
      <Footer />

      {/* Interactive Floating Modals & Overlays (Drawn on Demand) */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationSection
            isOpen={isReservationOpen}
            onClose={() => setIsReservationOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
