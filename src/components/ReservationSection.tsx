import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Sparkles, Check, Armchair, HelpCircle, Flame, Sprout } from "lucide-react";
import { SEATING_ZONES } from "../data/foodData";

interface ReservationSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationSection({ isOpen, onClose }: ReservationSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2026-07-16");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState<number>(2);
  const [selectedZone, setSelectedZone] = useState<"solarium" | "hearth" | "counter">("solarium");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDietaryNotes("");
    setIsBooked(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="reservation-modal-overlay">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-[#FDFBF7] w-full max-w-4xl rounded-none border-2 border-[#1A1A1A] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
          id="reservation-modal-content"
        >
          {/* Info Column (Left) */}
          <div className="md:col-span-5 bg-[#1A1A1A] text-[#FDFBF7] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-60 h-60 rounded-full bg-[#C4A484]/10 blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="font-mono text-[9px] font-bold text-[#C4A484] uppercase tracking-[0.2em] block">
                Exclusive Table Reservations
              </span>
              <h3 className="font-display text-3xl font-black tracking-tighter uppercase leading-tight text-[#FDFBF7]">
                Claim your seat at the hearth.
              </h3>
              <p className="font-sans text-xs text-[#FDFBF7]/75 leading-relaxed font-light">
                Our kitchen designs a limited volume of micro-seasonal menus daily to ensure perfect freshness. Choose your physical dining zone and enter dietary constraints below.
              </p>
            </div>

            {/* Zone Ambiance Details based on Active State */}
            <div className="mt-8 pt-8 border-t border-[#FDFBF7]/15 relative z-10">
              {selectedZone === "solarium" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="flex items-center space-x-2 text-[#C4A484]">
                    <Sprout className="w-5 h-5" />
                    <h4 className="font-display font-black text-sm uppercase tracking-tight">The Botanical Solarium</h4>
                  </div>
                  <p className="font-sans text-[11px] text-[#FDFBF7]/70 leading-relaxed font-light">
                    Surrounded by lush climbing jasmine, ceiling skylights and raw cedar carvings. Perfect for fluid social dining.
                  </p>
                </motion.div>
              )}
              {selectedZone === "hearth" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="flex items-center space-x-2 text-[#C4A484]">
                    <Flame className="w-5 h-5" />
                    <h4 className="font-display font-black text-sm uppercase tracking-tight">The Hearth Chamber</h4>
                  </div>
                  <p className="font-sans text-[11px] text-[#FDFBF7]/70 leading-relaxed font-light">
                    Centered around an open crackling stone woodfire. Hand-carved walnut benches and deep shadows create intimate mystery.
                  </p>
                </motion.div>
              )}
              {selectedZone === "counter" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="flex items-center space-x-2 text-[#C4A484]">
                    <Armchair className="w-5 h-5" />
                    <h4 className="font-display font-black text-sm uppercase tracking-tight">The Chef's Counter</h4>
                  </div>
                  <p className="font-sans text-[11px] text-[#FDFBF7]/70 leading-relaxed font-light">
                    Directly wrapping Chef Becca's prepping workspace. Limited to 12 tall stools with custom chef dialogue and live course explanations.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer details */}
            <div className="mt-8 pt-4 border-t border-[#FDFBF7]/15 relative z-10 flex items-center justify-between text-[10px] font-mono text-[#FDFBF7]/50 tracking-widest">
              <span>ZERO CANCELLATION FEES</span>
              <span>BECCA FOODIES</span>
            </div>
          </div>

          {/* Form Column (Right) */}
          <div className="md:col-span-7 p-8 sm:p-10 relative flex flex-col justify-between bg-[#FDFBF7]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded-none border border-transparent hover:border-[#1A1A1A] cursor-pointer transition-colors"
              id="close-reservation-modal"
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h4 className="font-display text-xl font-black uppercase text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-2 flex items-center space-x-2">
                    <span>Configure Dinner Reservation</span>
                  </h4>

                  {/* Zone buttons selection */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                      Select Seating Chamber
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SEATING_ZONES.map((zone) => {
                        const isSelected = selectedZone === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setSelectedZone(zone.id as any)}
                            className={`p-2.5 rounded-none border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                              isSelected
                                ? "bg-[#C4A484] border-[#1A1A1A] text-[#1A1A1A]"
                                : "bg-transparent border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-[#1A1A1A]"
                            }`}
                          >
                            <span className="font-display font-black uppercase text-[11px] leading-tight block">
                              {zone.name.replace("The ", "")}
                            </span>
                            <span className={`font-mono text-[8px] block uppercase ${isSelected ? "text-[#1A1A1A]/70" : "text-[#1A1A1A]/55"}`}>
                              {zone.id === "counter" ? "12 seats" : "Available"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date, Guest counts, Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Guest Count
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-[#FDFBF7] text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Person" : "People"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Hour Suffix
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-[#FDFBF7] text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                      >
                        {times.map((t) => (
                          <option key={t} value={t}>
                            {t} (Hearth PM)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 0192"
                        className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rachel@domain.com"
                      className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] uppercase tracking-wider"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                      Dietary Constraints or Allergic Declarations
                    </label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="e.g. Heavy peanut allergies, vegan plating required, no raw onions..."
                      className="w-full px-3 py-2.5 rounded-none border-2 border-[#1A1A1A] font-sans text-xs bg-transparent text-[#1A1A1A] focus:outline-none focus:border-[#C4A484] font-light"
                    />
                  </div>

                  {/* Submission action */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFBF7] font-mono font-bold text-xs tracking-widest uppercase py-3.5 border-2 border-[#1A1A1A] rounded-none cursor-pointer flex items-center justify-center space-x-2 transition-colors"
                    id="submit-reservation-btn"
                  >
                    <span>RESERVE INSTANTLY</span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center space-y-6"
                  id="booking-success-ticket-view"
                >
                  {/* Decorative stylized receipt ticket */}
                  <div className="bg-[#1A1A1A]/5 rounded-none p-6 border-2 border-dashed border-[#1A1A1A] w-full max-w-sm relative overflow-hidden text-left space-y-4">
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FDFBF7]" />
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FDFBF7]" />

                    <div className="text-center space-y-1 border-b-2 border-[#1A1A1A] pb-4">
                      <span className="font-mono text-[9px] text-[#C4A484] uppercase tracking-widest font-bold">
                        CONFIRMED SEATING TICKET
                      </span>
                      <h4 className="font-display font-black text-lg text-[#1A1A1A] uppercase tracking-tight">BECCA FOODIES</h4>
                      <span className="font-mono text-[8px] text-[#1A1A1A]/40 block uppercase tracking-wider">TICKET ID: BF-2026-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>

                    <div className="space-y-3 text-xs font-mono text-[#1A1A1A] uppercase tracking-wider text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-[#1A1A1A]/50">GUEST STEWARD:</span>
                        <span className="font-bold text-[#1A1A1A]">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1A1A1A]/50">SEATING ZONE:</span>
                        <span className="font-bold text-[#C4A484]">{selectedZone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1A1A1A]/50">GUEST COUNT:</span>
                        <span className="font-bold">{guests} People</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1A1A1A]/50">DATE & TIME:</span>
                        <span className="font-bold">{date} @ {time} PM</span>
                      </div>
                      {dietaryNotes && (
                        <div className="pt-2 border-t border-[#1A1A1A]/10 text-[9px] normal-case">
                          <span className="text-[#1A1A1A]/50 block font-mono text-[8px] font-bold uppercase tracking-wider mb-1">DIETARY ALLERGY INDEX:</span>
                          <span className="font-sans italic font-light">"{dietaryNotes}"</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#1A1A1A]/10 text-center">
                      <span className="font-mono text-[8px] text-[#1A1A1A]/50 uppercase tracking-widest">PRESENT THIS DIGITAL SCREEN ON ARRIVAL</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-display font-black text-lg text-[#1A1A1A] uppercase">See you soon!</h5>
                    <p className="font-sans text-xs text-[#1A1A1A]/60 max-w-sm leading-relaxed font-light">
                      Your booking is saved in our reservation logs. A mobile text confirmation has been dispatched to <span className="font-bold">{phone}</span>.
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleReset}
                      className="text-xs font-mono font-bold text-[#C4A484] hover:text-[#1A1A1A] uppercase tracking-wider underline cursor-pointer"
                    >
                      Book another table
                    </button>
                    <span className="text-[#1A1A1A]/20">|</span>
                    <button
                      onClick={onClose}
                      className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#1A1A1A]/5 px-4 py-2 rounded-none border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/10 cursor-pointer"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
