import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  ChevronRight,
  MapPin,
  Flame,
  Waves,
  HeartHandshake,
  Wheat,
} from "lucide-react";
import TrustBadges from "../components/TrustBadges";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";

export default function HomePage({
  products,
  onNavigate,
  onOpenProduct,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  cartItems,
  wishlistIds,
  onSelectCategory,
  onSelectRegion,
}) {
  const [activeTab, setActiveTab] = useState("popular"); // 'popular' | 'bestsellers'
  const [activeRegion, setActiveRegion] = useState("Vidarbha"); // 'Vidarbha' | 'Konkan' | 'Pune' | 'Marathwada'

  const displayedProducts =
    activeTab === "popular"
      ? products.filter((p) => p.isPopular).slice(0, 8)
      : products.filter((p) => p.isBestseller).slice(0, 8);

  const getCartQty = (productId) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const regionData = {
    Vidarbha: {
      icon: Flame,
      title: "Vidarbha — The Land of Robust Spices & Black Masalas",
      subtitle: "Smoky • Deeply Fragrant • Earthy",
      description:
        "Known for its bold, slow-roasted Kaala Masala, wild tangy Ambadi leaves, and hearty winter Kulith (Horsegram) preparations.",
      bannerImg:
        "https://res.cloudinary.com/dskzfipt3/image/upload/v1780057106/medusa/1780057104457-pomelli_photoshoot_image_1_1_0529%20%285%29.png.jpg",
      delicacies: ["Ambadi Bhajiche Lonche", "Corn Chakali", "Hulage Shengoli"],
    },
    Konkan: {
      icon: Waves,
      title: "Konkan — Coastal Kokum & Marine Treasures",
      subtitle: "Zesty Tang • Coastal Warmth • Sun-Cured",
      description:
        "Where Arabian sea breezes meet deep-red laterite soil. Famed for tangy kokum agal, succulent prawn pickles, and golden plantain chips.",
      bannerImg:
        "https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg",
      delicacies: ["Prawns Pickle (Kolambi)", "Golden Banana Wefers", "Malvani Blends"],
    },
    Pune: {
      icon: HeartHandshake,
      title: "Pune & Western Maharashtra — Culinary Nostalgia",
      subtitle: "Balanced • Digestive • Generational",
      description:
        "The cultural epicentre of hand-pounded multi-grain Bhajni, cooling sweet mukhvas, fragrant betel leaf delights, and wholesome crisps.",
      bannerImg:
        "https://res.cloudinary.com/dskzfipt3/image/upload/v1781328014/medusa/1781328012514-pomelli_photoshoot_image_1_1_0612%20%2815%29.png.jpg",
      delicacies: ["Methi Thalipith Bhajni", "Aaswad Mitha Paan", "Shahi Mukhwas"],
    },
    Marathwada: {
      icon: Wheat,
      title: "Marathwada — Ancient Millet Resilience",
      subtitle: "Low Glycemic • High Fiber • 100% Roasted",
      description:
        "Time-tested dryland grains roasted to golden crispiness: whole sorghum (jwari) bhel, fenugreek thepla puris, and crispy bajra khakhras.",
      bannerImg:
        "https://res.cloudinary.com/dskzfipt3/image/upload/v1781146398/medusa/1781146396686-pomelli_photoshoot_image_1_1_0526%20%282%29%20%282%29.png.jpg",
      delicacies: ["Jwari Bhel", "Bajra Methi Khakhra", "Thepla Puri"],
    },
  };

  const currentRegion = regionData[activeRegion];
  const regionProducts = products
    .filter((p) => p.region === activeRegion)
    .slice(0, 4);

  const reviews = [
    {
      name: "Anuradha Deshpande",
      location: "Kothrud, Pune",
      rating: 5,
      comment:
        "The Ambadi Bhajiche Lonche brought tears of joy to my grandmother! It is impossible to find this authentic Vidarbha taste in modern city stores. Outstanding quality.",
      product: "Ambadi Bhajiche Lonche",
    },
    {
      name: "Makarand Joshi",
      location: "Thane, Mumbai",
      rating: 5,
      comment:
        "Ordered the Methi Thalipith Bhajni and Corn Chakali. Both are remarkably fresh, non-greasy, and aromatic. The hand-pounded aroma fills the kitchen during cooking.",
      product: "Methi Thalipith Bhajni",
    },
    {
      name: "Snehal Kulkarni",
      location: "Nagpur",
      rating: 5,
      comment:
        "The Aaswad Mitha Paan and Beetroot Chips are our family’s favorite evening snacks now. Clean ingredients without any artificial aftertaste.",
      product: "Aaswad Mitha Paan",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8F4] via-white to-white pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#F2F7F5] border border-[#70BF4F]/30 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase text-[#4E8537] shadow-2xs">
                <Sparkles size={14} className="text-[#70BF4F]" />
                <span>Naik Foods Original • Since 1938</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-[#161915] tracking-tight leading-[1.1]">
                The Heart of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#70BF4F] to-[#4E8537]">
                  Authentic Maharashtra
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                From hand-pounded Vidarbha spices to sun-cured Konkani pickles and slow-roasted snacks, we bring over 80 years of family recipes straight to your dining table.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate("store")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onNavigate("about")}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-white border border-gray-200 text-[#161915] hover:border-[#70BF4F] hover:text-[#70BF4F] font-bold text-base shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  Our 80-Year Legacy
                </button>
              </div>

              {/* Trust Micro-Row */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#70BF4F]" />
                  <span>100% Pure &amp; Natural</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={16} className="text-[#70BF4F]" />
                  <span>Heirloom Recipes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span>4.9 / 5 Rated</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780036501/medusa/1780036499281-IMG_3868.JPG.jpeg.jpg"
                  alt="Naik Foods Authentic Delicacies"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#70BF4F] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">
                    Featured Artisanal Snack
                  </span>
                  <h3 className="text-xl font-extrabold mt-1">
                    Vidarbha Special Corn Chakali
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    Slow-fried in small batches with sesame &amp; carom seeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <TrustBadges />

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
              Explore by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find handcrafted favorites from Vidarbha, Konkan, and Pune kitchens.
            </p>
          </div>
          <button
            onClick={() => onNavigate("store")}
            className="text-sm font-bold text-[#4E8537] hover:text-[#70BF4F] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 7).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.handle);
                onNavigate("store");
              }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#70BF4F] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {cat.badge}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg mt-1 group-hover:text-[#70BF4F] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Regional Culinary Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAFCFA] border border-[#EAEDE9] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase flex items-center gap-1.5">
                <MapPin size={14} />
                Gastronomic Map of Maharashtra
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#161915] mt-1">
                Explore Flavors by Region
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                Every region of Maharashtra has its own unique culinary personality. Select a region below to discover its heritage dishes.
              </p>
            </div>

            {/* Region Tab Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {Object.keys(regionData).map((reg) => {
                const isCurrent = activeRegion === reg;
                return (
                  <button
                    key={reg}
                    onClick={() => setActiveRegion(reg)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? "bg-[#161915] text-white shadow-md scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span>{reg}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Region Spotlight Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs mb-8">
            <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-square bg-gray-100 shadow-xs">
              <img
                src={currentRegion.bannerImg}
                alt={currentRegion.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-block text-[11px] font-black uppercase tracking-wider text-[#4E8537] bg-[#F2F7F5] px-3 py-1 rounded-full">
                {currentRegion.subtitle}
              </div>
              <h3 className="text-2xl font-black text-[#161915]">
                {currentRegion.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentRegion.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-gray-700">
                <span className="text-gray-400">Iconic Delicacies:</span>
                {currentRegion.delicacies.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg text-gray-800"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    if (onSelectRegion) onSelectRegion(activeRegion);
                    onNavigate("store");
                  }}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#70BF4F] hover:text-[#4E8537] transition-colors cursor-pointer"
                >
                  <span>Explore all {activeRegion} specialties in Store</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Regional Products Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {regionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpenProduct}
                onAddToCart={onAddToCart}
                onUpdateQty={onUpdateQty}
                onToggleWishlist={onToggleWishlist}
                cartQty={getCartQty(product.id)}
                inWishlist={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products & Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Handpicked Delicacies
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
              Taste the Craftsmanship
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-2 bg-[#F2F7F5] p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setActiveTab("popular")}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "popular"
                  ? "bg-[#70BF4F] text-white shadow-xs"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Popular Products
            </button>
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "bestsellers"
                  ? "bg-[#70BF4F] text-white shadow-xs"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              All-Time Bestsellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAddToCart={onAddToCart}
              onUpdateQty={onUpdateQty}
              onToggleWishlist={onToggleWishlist}
              cartQty={getCartQty(product.id)}
              inWishlist={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate("store")}
            className="px-8 py-3.5 rounded-full bg-[#161915] hover:bg-black text-white font-extrabold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Complete Storefront</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Aaji's Heritage Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E251C] via-[#161915] to-[#2B3527] text-white p-8 sm:p-14 shadow-2xl relative">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#70BF4F]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 bg-[#70BF4F]/20 text-[#70BF4F] border border-[#70BF4F]/30 rounded-full text-xs font-black tracking-widest uppercase">
                Aaji's Inspiration
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Authentic Pickles &amp; Hand-Pounded Masalas
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
                "Aaji was the heart of it all—an innovator who perfected authentic Maharashtrian recipes and handcrafted masalas. Today, Naik Foods is a tribute to her legacy—sharing food that doesn't just taste good, but feels like home."
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white/90">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl">
                  <ShieldCheck size={16} className="text-[#70BF4F]" />
                  <span>Cold-pressed Groundnut &amp; Til Oil</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl">
                  <Sparkles size={16} className="text-[#70BF4F]" />
                  <span>Sun Cured in Traditional Barnis</span>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => onNavigate("about")}
                  className="px-6 py-3 rounded-full bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  Read the Heritage Story
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-lg">
                <img
                  src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780057106/medusa/1780057104457-pomelli_photoshoot_image_1_1_0529%20%285%29.png.jpg"
                  alt="Ambadi Lonche"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square border-2 border-white/20 shadow-lg mt-6">
                <img
                  src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780121990/medusa/1780121988900-pomelli_photoshoot_image_1_1_0529%20%287%29.png.jpg"
                  alt="Kolambi Lonche"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
            Loved by Maharashtrian Families
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real experiences from families across Pune, Mumbai, and Vidarbha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-amber-400 gap-1 mb-3">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-[#161915]">
                    {r.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">{r.location}</p>
                </div>
                <span className="text-[10px] font-bold text-[#4E8537] bg-[#F2F7F5] px-2.5 py-1 rounded-md">
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
