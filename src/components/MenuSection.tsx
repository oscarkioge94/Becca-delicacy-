import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, Leaf, Heart, Search, SlidersHorizontal, Info, Award } from "lucide-react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data/foodData";

interface MenuSectionProps {
  onAddToPlate: (item: MenuItem) => void;
  addedItemIds: string[];
}

export default function MenuSection({ onAddToPlate, addedItemIds }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxCalories, setMaxCalories] = useState<number>(600);
  const [showFilters, setShowFilters] = useState(false);
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Full Board" },
    { id: "botanical", label: "Botanical Greens" },
    { id: "coastal", label: "Coastal Harvest" },
    { id: "earth", label: "Earth & Grain" },
    { id: "artisanal", label: "Artisanal Desserts" },
  ];

  // Filter logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCalories = item.nutrition.calories <= maxCalories;
      return matchesCategory && matchesSearch && matchesCalories;
    });
  }, [selectedCategory, searchQuery, maxCalories]);

  return (
    <section className="py-24 bg-[#FDFBF7]" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#1A1A1A]/10">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4A484]">
              Curated Gastronomy
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-[#1A1A1A]">
              The Micro-Seasonal Board
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/60 max-w-xl font-light">
              Freshly harvested today. Choose botanical infusions, cold-water harvests, and sprouted wild seeds designed for cellular energy and maximum purity.
            </p>
          </div>

          {/* Search bar & Filter Trigger */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-none border-2 border-[#1A1A1A] bg-[#FDFBF7] font-mono text-xs focus:outline-none focus:border-[#C4A484] text-[#1A1A1A] uppercase tracking-wider"
                id="menu-search-input"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-none border-2 border-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer ${
                showFilters ? "bg-[#1A1A1A] text-[#FDFBF7] border-[#1A1A1A]" : "hover:bg-[#1A1A1A]/5 text-[#1A1A1A]"
              }`}
              id="menu-filters-toggle"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Expandable Calorie Sliders */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#1A1A1A]/5 rounded-none p-6 mb-8 border-2 border-[#1A1A1A] overflow-hidden"
              id="menu-filters-panel"
            >
              <div className="max-w-md space-y-3">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#1A1A1A] tracking-wider">
                  <span>MAX CELLULAR BURDEN (CALORIES)</span>
                  <span className="text-[#C4A484]">{maxCalories} kcal</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="20"
                  value={maxCalories}
                  onChange={(e) => setMaxCalories(Number(e.target.value))}
                  className="w-full accent-[#1A1A1A]"
                  id="calorie-filter-range"
                />
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/50">
                  <span>150 kcal (Light)</span>
                  <span>600 kcal (Ancient Grains)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[#1A1A1A]/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-none border font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1A1A1A] text-[#FDFBF7] border-[#1A1A1A]"
                  : "bg-transparent text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 border-[#1A1A1A]/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isAdded = addedItemIds.includes(item.id);
              const isDetailOpen = activeDetailId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-none overflow-hidden group flex flex-col h-full relative hover:shadow-lg transition-all"
                  id={`menu-item-${item.id}`}
                >
                  {/* Image container */}
                  <div className="relative h-60 overflow-hidden border-b border-[#1A1A1A]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent" />

                    {/* Category Label Overlay */}
                    <span className="absolute top-4 left-4 bg-[#FDFBF7] text-[#1A1A1A] border border-[#1A1A1A] font-mono text-[8px] font-bold px-3 py-1 rounded-none uppercase tracking-widest">
                      {item.categoryLabel}
                    </span>

                    {/* Signature Overlay badge */}
                    {item.signature && (
                      <span className="absolute top-4 right-4 bg-[#C4A484] text-[#1A1A1A] border border-[#1A1A1A] font-mono text-[8px] font-bold px-3 py-1 rounded-none uppercase tracking-widest flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>Signature</span>
                      </span>
                    )}

                    {/* Price Tag Overlay */}
                    <span className="absolute bottom-0 right-0 bg-[#1A1A1A] text-[#FDFBF7] font-mono text-xs font-bold px-4 py-2 border-l border-t border-[#1A1A1A]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-[#FDFBF7]">
                    <div className="space-y-3">
                      <h3 className="font-display text-base font-black uppercase tracking-tight text-[#1A1A1A] line-clamp-1 group-hover:text-[#C4A484] transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed line-clamp-2 font-light">
                        {item.description}
                      </p>

                      {/* Micro Nutrient Metrics Summary */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#1A1A1A]/10 text-center font-mono text-[8px] uppercase tracking-wider text-[#1A1A1A]/60">
                        <div>
                          <span className="block font-bold text-[#1A1A1A]">{item.nutrition.calories}</span>
                          <span>kcal</span>
                        </div>
                        <div>
                          <span className="block font-bold text-[#1A1A1A]">{item.nutrition.protein}g</span>
                          <span>protein</span>
                        </div>
                        <div>
                          <span className="block font-bold text-[#1A1A1A]">{item.nutrition.carbs}g</span>
                          <span>carbs</span>
                        </div>
                        <div>
                          <span className="block font-bold text-[#1A1A1A]">{item.nutrition.fats}g</span>
                          <span>fats</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Sourcing Accordion Toggle */}
                    <div className="pt-4 mt-4 border-t border-[#1A1A1A]/10 flex flex-col space-y-2">
                      <button
                        onClick={() => setActiveDetailId(isDetailOpen ? null : item.id)}
                        className="flex items-center space-x-1.5 text-[#1A1A1A]/50 hover:text-[#C4A484] text-[9px] font-mono font-bold self-start cursor-pointer uppercase tracking-wider"
                        id={`menu-item-details-toggle-${item.id}`}
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>{isDetailOpen ? "HIDE HARVEST MAP" : "VIEW HARVEST MAP"}</span>
                      </button>

                      {/* Detail block */}
                      <AnimatePresence>
                        {isDetailOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#1A1A1A]/5 rounded-none p-3 border border-[#1A1A1A]/10 text-[9px] uppercase tracking-wider space-y-2 overflow-hidden font-mono"
                          >
                            <div>
                              <span className="block text-[#C4A484] font-bold text-[8px]">Primary Ingredient</span>
                              <span className="font-sans text-[#1A1A1A] font-medium lowercase first-letter:uppercase">{item.sourcing.item}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="block text-[#1A1A1A]/50 text-[8px]">Location</span>
                                <span className="font-sans text-[#1A1A1A] font-medium lowercase first-letter:uppercase">{item.sourcing.origin}</span>
                              </div>
                              <div>
                                <span className="block text-[#1A1A1A]/50 text-[8px]">Partner Farmer</span>
                                <span className="font-sans text-[#1A1A1A] font-medium lowercase first-letter:uppercase">{item.sourcing.partner}</span>
                              </div>
                            </div>
                            <div>
                              <span className="block text-[#1A1A1A]/50 text-[8px]">All Ingredients</span>
                              <span className="font-sans text-[#1A1A1A]/70 normal-case leading-normal">{item.ingredients.join(", ")}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Add to Plate Button */}
                    <div className="pt-4 flex items-center justify-between border-t border-[#1A1A1A]/5 mt-4">
                      <div className="flex items-center space-x-1">
                        <Leaf className="w-3.5 h-3.5 text-[#3D4B3A]" />
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">Carbon neutral</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAddToPlate(item)}
                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-none font-mono text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer border-2 border-[#1A1A1A] ${
                          isAdded
                            ? "bg-[#C4A484] text-[#1A1A1A]"
                            : "bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#1A1A1A]/90"
                        }`}
                        id={`add-to-plate-btn-${item.id}`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ON PLATE</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>ADD TO PLATE</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/50"
            >
              No botanical plates match your active filters. Try slider reset.
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
