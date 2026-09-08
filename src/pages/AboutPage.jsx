import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

export default function AboutPage({ onNavigate }) {
  const timeline = [
    {
      year: "1938",
      title: "Naik Seeds & Agricultural Foundation",
      description:
        "Late Shri Anant Balkrishna Naik founded Naik Seeds in Pune, cultivating trust with regional farmers and building a legacy rooted in the soil of Maharashtra.",
    },
    {
      year: "1992",
      title: "Hotel Sushil & Hospitality",
      description:
        "The family expanded into hospitality with the establishment of Hotel Sushil, deepening their connection to warm Maharashtrian guest service and comfort food.",
    },
    {
      year: "2010s",
      title: "Naik Landscape & Environmental Roots",
      description:
        "Strengthening their relationship with nature through green landscape services while preserving traditional agronomy practices.",
    },
    {
      year: "Today",
      title: "Naik Foods by Mrs. Priya Chandan Naik",
      description:
        "Mrs. Priya Chandan Naik brings together wholesome, high-quality, hand-pounded food products under one trusted name—carrying forward generations of purity and excellence.",
    },
  ];

  const coreValues = [
    {
      icon: Award,
      title: "Heirloom Recipes",
      description:
        "Every masala, pickle, and snack is crafted with generational recipes to ensure a true Maharashtrian soul in every single bite.",
    },
    {
      icon: ShieldCheck,
      title: "Purity & Hygiene",
      description:
        "From small-batch preparation to rigorous checks, we combine traditional stone-grinding with modern food-safety standards.",
    },
    {
      icon: Users,
      title: "Farmer Empowerment",
      description:
        "We empower local farming collectives and women home chefs across Vidarbha and Konkan, honoring Maharashtra’s agrarian roots.",
    },
    {
      icon: Heart,
      title: "Regional Pride",
      description:
        "Showcasing the incredible culinary diversity of Maharashtra—from pungent Vidarbha Kaala Masala to zesty Konkani kokum flavors.",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Sourcing Regional Recipes",
      desc: "Collaborating with village elders and home artisans from Konkan to Vidarbha to retrieve authentic heirloom techniques.",
    },
    {
      num: "02",
      title: "Finest Local Ingredients",
      desc: "Selecting only the freshest unpolished grains, whole sun-dried chillies, and cold-pressed oils from trusted growers.",
    },
    {
      num: "03",
      title: "Preparation with Care",
      desc: "Slow roasting and traditional stone-pounding methods that protect delicate essential oils and authentic textures.",
    },
    {
      num: "04",
      title: "Strict Quality Assurance",
      desc: "Every batch is inspected for flavor balance, aroma retention, purity, and hygienic food-grade packaging.",
    },
    {
      num: "05",
      title: "Fresh Doorstep Delivery",
      desc: "Freshly packed at our Pune central facility and dispatched directly to homes across India.",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F2F7F5] to-white pt-10 sm:pt-14 pb-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F2F7F5] border border-[#70BF4F]/30 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-[#4E8537]">
              <Sparkles size={13} className="text-[#70BF4F]" />
              Our Culinary Legacy
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#161915] mt-3 tracking-tight leading-tight">
              Eight Decades of Trust, Tradition &amp; Authentic Flavors
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
              At Naik Foods, we are passionate about preserving Maharashtra’s rich culinary heritage with purity, love, and generational craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Founder & Aaji's Inspiration Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Cards */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-gray-100">
              <img
                src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780036501/medusa/1780036499281-IMG_3868.JPG.jpeg.jpg"
                alt="Naik Foods Artisan Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
                The Inspiration
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#161915] leading-tight">
                "Food that doesn't just taste good, but feels like home."
              </h2>
            </div>

            <div className="text-sm sm:text-base text-gray-600 space-y-4 leading-relaxed">
              <p>
                <strong>Naik Foods</strong> is deeply rooted in the legacy of the Naik family, which has been connected to agriculture in Pune for over 70 years—a foundation built on authenticity, quality, and deep respect for the land.
              </p>
              <p>
                In 1992, the family expanded its journey into hospitality with the establishment of <strong>Hotel Sushil</strong>, further strengthening our commitment to nourishing people with comforting, wholesome meals.
              </p>
              <p className="p-4 bg-[#F2F7F5] rounded-2xl border-l-4 border-[#70BF4F] text-gray-800 font-medium italic">
                "Aaji was the heart of it all—an innovator who perfected authentic Maharashtrian recipes and handcrafted masalas. Her techniques carried the essence of home, perfected through years of intuition and care. Today, Naik Foods is a tribute to her legacy."
              </p>
              <p>
                Continuing this proud multi-generational story, <strong>Mrs. Priya Chandan Naik</strong>, Founder of Naik Foods, brings together wholesome, authentic regional products under one trusted roof.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate("store")}
                className="px-6 py-3.5 rounded-full bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Shop Our Specialties</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#FAFCFA] py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
              Over 8 Decades of Growth
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              How a humble agricultural beginning blossomed into Maharashtra’s beloved food brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F7F5] text-[#4E8537] font-black text-sm flex items-center justify-center border border-[#70BF4F]/20 mb-4">
                    {item.year}
                  </div>
                  <h3 className="font-extrabold text-base text-[#161915] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 text-[11px] font-bold text-[#70BF4F]">
                  Pillar {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Value */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
            Principles We Stand By
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#EAEDE9] hover:border-[#70BF4F]/50 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F2F7F5] text-[#70BF4F] flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-extrabold text-base text-[#161915]">
                  {val.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sourcing & Process (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#161915] to-[#222B20] text-white p-8 sm:p-14 rounded-3xl shadow-xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Artisanal Craft
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-1">
              From Regional Farms to Your Kitchen
            </h2>
            <p className="text-sm text-white/70 mt-2">
              Our process is a labor of love, ensuring that the soul of Maharashtrian cuisine remains untampered and authentic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="text-2xl font-black text-[#70BF4F]">
                    {step.num}
                  </span>
                  <h4 className="font-extrabold text-sm text-white mt-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
