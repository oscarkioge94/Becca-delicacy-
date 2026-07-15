import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, User, ChevronRight, Sprout, ShieldCheck } from "lucide-react";
import { SourcingPartner } from "../types";
import { SOURCING_PARTNERS } from "../data/foodData";

export default function SourcingExplorer() {
  const [activePartner, setActivePartner] = useState<SourcingPartner>(SOURCING_PARTNERS[0]);

  return (
    <section className="py-24 bg-[#FDFBF7] border-y-2 border-[#1A1A1A]" id="sourcing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4A484]">
            100% Traceable Roots
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-[#1A1A1A]">
            Meet the Regenerative Cultivators
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/70 font-light leading-relaxed">
            We operate with a direct, single-step shipping model. Select a local partner to inspect our active culinary supply chain, geographical coordinate points, and organic cultivation standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Partners Selector List (Left) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <span className="font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.15em] block">
              Active Regional Suppliers ({SOURCING_PARTNERS.length})
            </span>
            <div className="space-y-3">
              {SOURCING_PARTNERS.map((partner) => {
                const isSelected = activePartner.id === partner.id;
                return (
                  <motion.button
                    key={partner.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActivePartner(partner)}
                    className={`w-full text-left p-5 rounded-none border-2 transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7]"
                        : "bg-[#FDFBF7] border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-[#1A1A1A]"
                    }`}
                    id={`partner-btn-${partner.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-none border transition-colors ${
                        isSelected
                          ? "bg-[#FDFBF7]/10 text-[#C4A484] border-[#FDFBF7]/20"
                          : "bg-[#1A1A1A]/5 text-[#1A1A1A] border-[#1A1A1A]/10"
                      }`}>
                        <Sprout className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm uppercase tracking-tight leading-tight">
                          {partner.name}
                        </h4>
                        <span className={`font-mono text-[9px] uppercase tracking-wider block mt-0.5 ${
                          isSelected ? "text-[#FDFBF7]/60" : "text-[#1A1A1A]/55"
                        }`}>
                          {partner.type}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isSelected ? "text-[#C4A484]" : "text-[#1A1A1A]/40"
                    }`} />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Interactive Geographic Canvas Graphic Map (Center) */}
          <div className="lg:col-span-4 bg-[#FDFBF7] rounded-none border-2 border-[#1A1A1A] p-6 flex flex-col justify-between relative min-h-[380px] overflow-hidden" id="interactive-map-area">
            {/* Styled Abstract SVG Topographic Grid Contour */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#1A1A1A_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
            
            <div className="relative z-10">
              <span className="font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.15em] block mb-4">
                Active Foraging Map Overlay (Regional)
              </span>

              {/* Styled Abstract SVG Landmass Shapes */}
              <div className="w-full h-64 relative bg-[#1A1A1A]/5 rounded-none border border-[#1A1A1A]/15 overflow-hidden flex items-center justify-center">
                
                {/* SVG Abstract Land outlines */}
                <svg className="absolute inset-0 w-full h-full text-[#C4A484]/10" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M15,30 Q30,10 55,25 T85,30 T90,65 T60,85 T25,75 Z" />
                  <path d="M45,45 Q60,35 70,55 T55,75 Z" className="text-[#1A1A1A]/5" />
                </svg>

                {/* Plotting coordinate paths linking pins */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <motion.path
                    d={`M 50,50 L ${activePartner.coords.x},${activePartner.coords.y}`}
                    stroke="#1A1A1A"
                    strokeWidth="0.75"
                    strokeDasharray="3,3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    key={activePartner.id}
                  />
                </svg>

                {/* Central Kitchen node "Becca Foodies HQ" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#1A1A1A] border-2 border-[#FDFBF7] shadow-md flex items-center justify-center relative">
                    <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-[#1A1A1A]/40 opacity-75" />
                  </div>
                  <span className="font-mono text-[8px] font-bold text-[#1A1A1A] uppercase mt-1 tracking-widest">
                    Becca Kitchen
                  </span>
                </div>

                {/* Farmer Nodes Plotted */}
                {SOURCING_PARTNERS.map((partner) => {
                  const isActive = activePartner.id === partner.id;
                  return (
                    <motion.button
                      key={partner.id}
                      onClick={() => setActivePartner(partner)}
                      style={{ left: `${partner.coords.x}%`, top: `${partner.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 p-1 focus:outline-none group cursor-pointer"
                      id={`map-node-${partner.id}`}
                    >
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        {isActive && (
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A484]/30 animate-ping" />
                        )}
                        <MapPin className={`w-4 h-4 relative transition-colors ${
                          isActive ? "text-[#C4A484]" : "text-[#1A1A1A]/45 group-hover:text-[#1A1A1A]"
                        }`} />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 relative z-10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[8px] text-[#1A1A1A]/50 block uppercase tracking-wider">ACTIVE COORDINATE POINT</span>
                <span className="font-mono text-xs font-bold text-[#1A1A1A]">{activePartner.location}</span>
              </div>
              <div className="bg-[#C4A484]/15 text-[#C4A484] p-2 rounded-none border border-[#C4A484]/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Sourcing Narrative Detail Card (Right) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePartner.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FDFBF7] rounded-none border-2 border-[#1A1A1A] p-8 h-full flex flex-col justify-between relative overflow-hidden"
                id="partner-detail-narrative"
              >
                <div className="space-y-6">
                  {/* Photo Profile */}
                  <div className="relative rounded-none h-44 overflow-hidden border border-[#1A1A1A]">
                    <img
                      src={activePartner.image}
                      alt={activePartner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#C4A484] uppercase tracking-[0.2em] font-bold block">
                      SUPPLIER PROFILE
                    </span>
                    <h3 className="font-display text-xl font-black uppercase text-[#1A1A1A]">
                      {activePartner.name}
                    </h3>
                    <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                      {activePartner.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#1A1A1A]/10">
                    <span className="font-mono text-[8px] text-[#1A1A1A]/50 uppercase tracking-widest block">
                      SUPPLIED BOTANICALS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePartner.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="font-mono text-[9px] bg-[#1A1A1A]/5 text-[#1A1A1A]/85 px-2.5 py-1 rounded-none border border-[#1A1A1A]/10 font-bold uppercase tracking-wider"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10 flex items-center space-x-3">
                  <div className="p-2 bg-[#1A1A1A]/5 text-[#1A1A1A]/70 rounded-none border border-[#1A1A1A]/10">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-[#1A1A1A]/50 block">STEWARD FARMER</span>
                    <span className="font-display text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">{activePartner.partnerName}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
