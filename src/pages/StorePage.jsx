import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  MapPin,
  Sparkles,
  Tag,
  IndianRupee,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";

export default function StorePage({
  products,
  onOpenProduct,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  cartItems,
  wishlistIds,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
}) {
  const [internalRegion, setInternalRegion] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all"); // 'all', 'under-100', '100-150', 'above-150'
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [sortBy, setSortBy] = useState("featured"); // 'featured', 'price-asc', 'price-desc', 'rating'

  const activeRegion = selectedRegion || internalRegion;
  const setActiveRegion = onSelectRegion || setInternalRegion;

  const regions = [
    { id: "all", label: "All Maharashtra" },
    { id: "Pune", label: "Pune" },
    { id: "Vidarbha", label: "Vidarbha" },
    { id: "Konkan", label: "Konkan" },
    { id: "Marathwada", label: "Marathwada" },
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-100", label: "Under ₹100" },
    { id: "100-150", label: "₹100 – ₹150" },
    { id: "above-150", label: "₹150+" },
  ];

  const dietaryTags = [
    { id: "all", label: "All Types" },
    { id: "Gluten Free", label: "Gluten Free" },
    { id: "Upwas Special", label: "Upwas / Fasting" },
    { id: "High Fiber", label: "High Fiber" },
    { id: "No Preservatives", label: "No Preservatives" },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Region filter
    if (activeRegion && activeRegion !== "all") {
      list = list.filter((p) => p.region === activeRegion);
    }

    // Price range filter
    if (selectedPriceRange === "under-100") {
      list = list.filter((p) => p.price < 100);
    } else if (selectedPriceRange === "100-150") {
      list = list.filter((p) => p.price >= 100 && p.price <= 150);
    } else if (selectedPriceRange === "above-150") {
      list = list.filter((p) => p.price > 150);
    }

    // Dietary tag filter
    if (selectedDietary && selectedDietary !== "all") {
      list = list.filter(
        (p) =>
          p.badge?.toLowerCase().includes(selectedDietary.toLowerCase()) ||
          (p.dietary && p.dietary.some((d) => d.toLowerCase().includes(selectedDietary.toLowerCase()))) ||
          p.description?.toLowerCase().includes(selectedDietary.toLowerCase())
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    products,
    selectedCategory,
    activeRegion,
    selectedPriceRange,
    selectedDietary,
    searchQuery,
    sortBy,
  ]);

  const getCartQty = (productId) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const resetFilters = () => {
    onSelectCategory("all");
    setActiveRegion("all");
    setSelectedPriceRange("all");
    setSelectedDietary("all");
    onSearchChange("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== "all") ||
    activeRegion !== "all" ||
    selectedPriceRange !== "all" ||
    selectedDietary !== "all" ||
    searchQuery;

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F2F7F5] to-white pt-8 sm:pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4E8537] bg-[#F2F7F5] px-3 py-1 rounded-full border border-[#70BF4F]/20 mb-2">
                <Sparkles size={12} className="text-[#70BF4F]" />
                Farm-to-Kitchen Authenticity
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#161915] tracking-tight">
                Authentic Maharashtrian Store
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                Explore hand-pounded masalas, traditional pickles, crispy snacks, and farm-fresh staples from Vidarbha, Konkan, and Pune.
              </p>
            </div>
            <div className="text-xs font-bold text-[#4E8537] bg-[#F2F7F5] px-4 py-2 rounded-xl border border-[#70BF4F]/20 w-fit">
              Showing {filteredProducts.length} of {products.length} Specialties
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Category Filter Pills (Horizontal Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all" || !selectedCategory
                ? "bg-[#70BF4F] text-white shadow-xs"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.handle)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.handle
                  ? "bg-[#70BF4F] text-white shadow-xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Region & Filter Controls Bar */}
        <div className="p-5 bg-[#FAFCFA] border border-[#EAEDE9] rounded-3xl space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Region Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1 shrink-0">
                <MapPin size={13} />
                Region:
              </span>
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRegion(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeRegion === r.id
                      ? "bg-[#161915] text-white shadow-xs"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Sort & Filter Reset */}
            <div className="flex items-center gap-3 justify-between lg:justify-end">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} />
                  <span>Reset All</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <label htmlFor="sort-dropdown" className="text-xs font-bold text-gray-500">
                  Sort by:
                </label>
                <select
                  id="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 outline-none focus:border-[#70BF4F]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Secondary Filter Row: Price and Dietary */}
          <div className="pt-3 border-t border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            {/* Price Presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 flex items-center gap-1">
                <IndianRupee size={12} />
                Price:
              </span>
              {priceRanges.map((pr) => (
                <button
                  key={pr.id}
                  onClick={() => setSelectedPriceRange(pr.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedPriceRange === pr.id
                      ? "bg-[#70BF4F] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>

            {/* Dietary Presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-400 flex items-center gap-1">
                <Tag size={12} />
                Diet:
              </span>
              {dietaryTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedDietary(tag.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedDietary === tag.id
                      ? "bg-[#4E8537] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-gray-400">Active Filters:</span>
            {selectedCategory && selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#F2F7F5] border border-[#70BF4F]/30 text-[#4E8537] px-2.5 py-1 rounded-full font-bold">
                Category: {selectedCategory}
                <X
                  size={12}
                  className="cursor-pointer hover:text-black"
                  onClick={() => onSelectCategory("all")}
                />
              </span>
            )}
            {activeRegion !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#F2F7F5] border border-[#70BF4F]/30 text-[#4E8537] px-2.5 py-1 rounded-full font-bold">
                Region: {activeRegion}
                <X
                  size={12}
                  className="cursor-pointer hover:text-black"
                  onClick={() => setActiveRegion("all")}
                />
              </span>
            )}
            {selectedPriceRange !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#F2F7F5] border border-[#70BF4F]/30 text-[#4E8537] px-2.5 py-1 rounded-full font-bold">
                Price: {selectedPriceRange}
                <X
                  size={12}
                  className="cursor-pointer hover:text-black"
                  onClick={() => setSelectedPriceRange("all")}
                />
              </span>
            )}
            {selectedDietary !== "all" && (
              <span className="inline-flex items-center gap-1 bg-[#F2F7F5] border border-[#70BF4F]/30 text-[#4E8537] px-2.5 py-1 rounded-full font-bold">
                Diet: {selectedDietary}
                <X
                  size={12}
                  className="cursor-pointer hover:text-black"
                  onClick={() => setSelectedDietary("all")}
                />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-[#F2F7F5] border border-[#70BF4F]/30 text-[#4E8537] px-2.5 py-1 rounded-full font-bold">
                Search: "{searchQuery}"
                <X
                  size={12}
                  className="cursor-pointer hover:text-black"
                  onClick={() => onSearchChange("")}
                />
              </span>
            )}
          </div>
        )}

        {/* Products Grid or Empty State */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl p-8">
              <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-gray-300 shadow-xs mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-[#161915]">
                No matching specialties found
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                We couldn't find any products matching your filters. Try selecting a different category or clearing search terms.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#70BF4F] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
}
