import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Calendar, Users, Sliders, ArrowUpRight, Sparkles, Send, CheckCircle } from "lucide-react";

export default function Experiences() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guestCount, setGuestCount] = useState<number>(50);
  const [serviceType, setServiceType] = useState<"plated" | "family" | "canapes">("plated");
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dietOptions = [
    { id: "vegan", label: "Vegan / Living Greens" },
    { id: "gluten-free", label: "Gluten-Free Flour Sourcing" },
    { id: "nut-free", label: "Seed-Only / Nut-Free Kitchen" },
    { id: "raw", label: "100% Raw Cold-Pressed" },
  ];

  const serviceTypeRates = {
    plated: { label: "Plated Multi-Course", rate: 95 },
    family: { label: "Family Style Harvest Table", rate: 70 },
    canapes: { label: "Artisanal Canapés & Infusions", rate: 45 },
  };

  const handleDietToggle = (id: string) => {
    if (selectedDiets.includes(id)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== id));
    } else {
      setSelectedDiets([...selectedDiets, id]);
    }
  };

  // Live Estimate calculation
  const budgetEstimate = useMemo(() => {
    const ratePerGuest = serviceTypeRates[serviceType].rate;
    const dietsSurcharge = selectedDiets.length * 5; // $5 extra per diet focus per head
    const baseCateringStaffFee = 450; // flat staff setups
    return guestCount * (ratePerGuest + dietsSurcharge) + baseCateringStaffFee;
  }, [guestCount, serviceType, selectedDiets]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setGuestCount(50);
    setServiceType("plated");
    setSelectedDiets([]);
    setNotes("");
    setIsSubmitted(false);
  };

  return (
    <section className="py-24 bg-[#FDFBF7]" id="catering">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Block (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4A484]">
                Artisanal Celebrations
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-[#1A1A1A]">
                Catering & Private Dinners
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#1A1A1A]/70 leading-relaxed font-light">
                Bring the micro-seasonal philosophy of Becca Foodies to your weddings, retreats, and private spaces. We design bespoke floral setups, hand-baked bread boards, and custom non-alcoholic infusion flights tailored to your crowd.
              </p>
            </div>

            {/* Testimonial block */}
            <div className="bg-[#1A1A1A]/5 rounded-none p-6 border-2 border-[#1A1A1A] relative">
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-[#C4A484]" />
              <p className="font-serif text-sm italic text-[#1A1A1A]/80 leading-relaxed">
                "Becca Foodies curated our wedding feast in the Solarium garden. Every guest was amazed by the vibrancy of the edible flowers, the aroma of sourdough, and the depth of the sea bass. Absolutely unforgettable!"
              </p>
              <div className="flex items-center space-x-2 mt-4 text-[10px] font-mono font-bold tracking-wider text-[#1A1A1A] uppercase">
                <span>- EMILY & LIAM, SEPTEMBER REUNION</span>
              </div>
            </div>

            {/* Ecological metric */}
            <div className="flex items-start space-x-3 text-xs text-[#1A1A1A]/60">
              <div className="p-2 bg-[#1A1A1A]/5 text-[#C4A484] rounded-none border border-[#1A1A1A]/10 mt-0.5">
                <Calculator className="w-4 h-4" />
              </div>
              <p className="font-sans font-light">
                Our catering estimation represents honest, comprehensive billing: include organic raw sourcing, certified waste-free composting, carbon offsets, and active kitchen logistics.
              </p>
            </div>
          </div>

          {/* Calculator Planner Form (Right) */}
          <div className="lg:col-span-7 bg-[#FDFBF7] rounded-none border-2 border-[#1A1A1A] p-8 sm:p-10 relative overflow-hidden" id="catering-interactive-form">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C4A484]/5 blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-display text-lg font-black uppercase text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-3 flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-[#C4A484]" />
                    <span>Experience Configurator</span>
                  </h3>

                  {/* Service Type Selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                      Service Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(Object.keys(serviceTypeRates) as Array<"plated" | "family" | "canapes">).map((type) => {
                        const active = serviceType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setServiceType(type)}
                            className={`p-4 rounded-none border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                              active
                                ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFBF7]"
                                : "bg-[#FDFBF7] border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-[#1A1A1A]"
                            }`}
                          >
                            <span className="font-display font-black text-xs uppercase tracking-tight leading-tight">
                              {serviceTypeRates[type].label}
                            </span>
                            <span className={`font-mono text-[9px] mt-2 block ${active ? "text-[#FDFBF7]/70" : "text-[#1A1A1A]/50"}`}>
                              ${serviceTypeRates[type].rate}/head
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Count Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-[#1A1A1A]/80">
                      <span className="uppercase tracking-wider">EXPECTED GUESTS</span>
                      <span className="text-[#C4A484] flex items-center space-x-1 uppercase tracking-wider font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>{guestCount} guests</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="250"
                      step="5"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#1A1A1A]"
                      id="catering-guest-slider"
                    />
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-[#1A1A1A]/40">
                      <span>10 guests</span>
                      <span>250 guests</span>
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                      Dietary Specializations (Multi-Select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dietOptions.map((diet) => {
                        const isSelected = selectedDiets.includes(diet.id);
                        return (
                          <button
                            key={diet.id}
                            type="button"
                            onClick={() => handleDietToggle(diet.id)}
                            className={`px-3.5 py-2.5 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border-2 ${
                              isSelected
                                ? "bg-[#C4A484] text-[#1A1A1A] border-[#1A1A1A]"
                                : "bg-[#FDFBF7] border-[#1A1A1A]/10 text-[#1A1A1A]/75 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {diet.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Liam Parker"
                        className="w-full px-4 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent focus:outline-none focus:border-[#C4A484] text-[#1A1A1A] uppercase tracking-wider"
                        id="catering-name-input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. liam@domain.com"
                        className="w-full px-4 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono text-xs bg-transparent focus:outline-none focus:border-[#C4A484] text-[#1A1A1A] uppercase tracking-wider"
                        id="catering-email-input"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider">
                      Celebration Notes or Location Details
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Backyard greenhouse, rustic design theme, outdoor natural wood bars..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-none border-2 border-[#1A1A1A] font-sans text-xs bg-transparent focus:outline-none focus:border-[#C4A484] text-[#1A1A1A] resize-none font-light"
                    />
                  </div>

                  {/* Live Budget Calculator Projection Block */}
                  <div className="bg-[#1A1A1A]/5 border-2 border-[#1A1A1A] rounded-none p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="font-mono text-[8px] text-[#1A1A1A]/50 uppercase block tracking-wider">
                        Estimated Investment Proposal
                      </span>
                      <span className="font-display text-3xl font-black text-[#1A1A1A]">
                        ${budgetEstimate.toLocaleString()}
                      </span>
                      <span className="block font-mono text-[8px] text-[#1A1A1A]/40 uppercase mt-0.5 tracking-wider">
                        Includes staff, logistics & organic certifications
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#FDFBF7] font-mono font-bold text-xs tracking-widest uppercase px-6 py-3 border-2 border-[#1A1A1A] rounded-none flex items-center justify-center space-x-2 cursor-pointer self-stretch sm:self-center"
                      id="catering-submit-btn"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT REQUEST</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                  id="catering-success-container"
                >
                  <div className="p-4 bg-[#C4A484]/20 text-[#1A1A1A] rounded-none border-2 border-[#1A1A1A] animate-pulse">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                      Proposal Submitted!
                    </h4>
                    <p className="font-sans text-xs text-[#1A1A1A]/70 max-w-sm mx-auto leading-relaxed font-light">
                      Thank you, <span className="font-bold">{name}</span>. Chef Becca is reviewing your parameters for <span className="font-bold">{guestCount} guests</span>. A detailed menu pairing catalog has been sent to <span className="font-bold">{email}</span>.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-[#C4A484] hover:text-[#1A1A1A] transition-colors font-mono text-xs font-bold uppercase tracking-wider underline cursor-pointer"
                  >
                    Adjust parameters & recalculate
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
