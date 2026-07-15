import { motion } from "motion/react";
import { Leaf, Compass, Earth } from "lucide-react";

export default function Philosophy() {
  const pillars = [
    {
      num: "01",
      title: "Bio-Dynamic Soil",
      icon: <Earth className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors" />,
      description: "We believe taste is a chemical blueprint of the soil. By utilizing exclusively bio-dynamic composts and wild cover crops, we harvest crops containing up to 40% higher micro-nutrient density and highly refined essential oils.",
    },
    {
      num: "02",
      title: "Botanical Precision",
      icon: <Leaf className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors" />,
      description: "Chef Becca views ingredients as living structural forms. Every plate is balanced with meticulous botanical hierarchy: temperature curves, textural contrast, and pH levels designed to elevate and sustain neural focus.",
    },
    {
      num: "03",
      title: "Zero-Waste Circularity",
      icon: <Compass className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors" />,
      description: "We are an offline-first circular kitchen. Up to 95% of our culinary outputs are repurposed: organic vegetable skins are dehydrated into dynamic dusts, stems are fermented into deep umami vinegars, and waste feeds vertical composting columns.",
    },
  ];

  return (
    <section className="bg-[#FDFBF7] py-24 border-t border-[#1A1A1A]/10" id="philosophy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C4A484]"
          >
            Organic Integrity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-[#1A1A1A]"
          >
            The Sourcing Philosophy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg text-[#1A1A1A]/70 leading-relaxed font-light"
          >
            Our kitchen runs on a pure philosophy of connection. We reject synthetic chemicals, heavy storage networks, and industrial farming, preferring to cooperate closely with regional foragers and ecological growers.
          </motion.p>
        </div>

        {/* Pillars Grid - Bold Sharp Typography Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-none p-8 relative group hover:bg-[#1A1A1A] transition-all duration-300"
              id={`philosophy-card-${pillar.num}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#1A1A1A]/5 rounded-none border border-[#1A1A1A]/10 group-hover:bg-[#FDFBF7]/10 group-hover:border-[#FDFBF7]/25 transition-all">
                  {pillar.icon}
                </div>
                <span className="font-serif text-3xl italic font-normal text-[#C4A484] group-hover:text-[#C4A484] transition-colors">
                  {pillar.num}
                </span>
              </div>

              <h3 className="font-display text-lg font-black uppercase tracking-tight text-[#1A1A1A] group-hover:text-[#FDFBF7] mb-4 transition-colors">
                {pillar.title}
              </h3>

              <p className="font-sans text-xs text-[#1A1A1A]/70 group-hover:text-[#FDFBF7]/80 leading-relaxed transition-colors font-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-[#1A1A1A] text-[#FDFBF7] rounded-none p-8 sm:p-12 relative overflow-hidden border-2 border-[#1A1A1A]"
          id="philosophy-quote-banner"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#C4A484]/10 blur-3xl" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C4A484] font-bold">
              Chef's Manifesto
            </span>
            <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed text-[#FDFBF7]/95">
              "We must bridge the distance between the root and the tongue. Our goal at Becca Foodies is to allow the soil's natural intelligence to voice itself clearly in every delicate broth, baked crumb, and raw leaf."
            </p>
            <div className="flex items-center space-x-3 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center font-serif text-sm italic text-[#C4A484]">
                B
              </div>
              <div>
                <h4 className="font-display text-xs font-bold tracking-wider uppercase">Chef Becca Vance</h4>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#FDFBF7]/60">Founder & Culinary Director</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
