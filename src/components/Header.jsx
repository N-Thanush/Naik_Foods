import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Search,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Header({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  products = [],
  onOpenProduct,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "store", label: "Shop" },
    { id: "blog", label: "Blogs" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setShowSuggestions(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute live search suggestions
  const suggestions =
    searchQuery.trim().length >= 2 && products.length > 0
      ? products
          .filter(
            (p) =>
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.region && p.region.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 5)
      : [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#161915] text-white text-xs font-medium py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#70BF4F] animate-pulse"></span>
            <span>Free Express Delivery across India on orders above ₹999</span>
          </div>
          <div className="flex items-center gap-5 text-white/80 text-[11px]">
            <span className="hidden md:flex items-center gap-1">
              <MapPin size={12} className="text-[#70BF4F]" />
              Store: Shukrawar Peth, Pune
            </span>
            <a
              href="tel:+919730046247"
              className="flex items-center gap-1 hover:text-[#70BF4F] transition-colors"
            >
              <Phone size={12} className="text-[#70BF4F]" />
              +91 9730046247
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-[#70BF4F] font-semibold">
              Authentic Vidarbha &amp; Konkan Heritage
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 glass-header border-b border-gray-100 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav("home")}
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src="/logo.png"
              alt="Naik Foods"
              className="h-14 sm:h-16 md:h-18 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-[15px] font-bold tracking-wide transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? "text-[#70BF4F]"
                      : "text-[#161915] hover:text-[#70BF4F]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#70BF4F] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Bar (Desktop) with Live Suggestions */}
            <div ref={searchContainerRef} className="relative hidden md:block w-48 lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearchSubmit) {
                    onSearchSubmit();
                    setShowSuggestions(false);
                  }
                }}
                placeholder="Search masalas, snacks, pickles..."
                className="w-full bg-[#F2F7F5] border border-transparent focus:border-[#70BF4F] text-sm text-[#161915] placeholder-gray-400 rounded-full py-2.5 pl-9 pr-4 outline-none transition-all duration-200"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {/* Live Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in divide-y divide-gray-50">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Product Suggestions ({suggestions.length})
                  </div>
                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        if (onOpenProduct) onOpenProduct(p);
                      }}
                      className="p-2.5 flex items-center gap-3 hover:bg-[#F2F7F5] rounded-xl cursor-pointer transition-colors"
                    >
                      <img
                        src={p.thumbnail}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#161915] truncate">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {p.categoryName} • {p.weight}
                        </p>
                      </div>
                      <span className="text-xs font-black text-[#4E8537]">
                        ₹{p.price}
                      </span>
                    </div>
                  ))}
                  <div className="p-2 pt-2 text-center">
                    <button
                      onClick={() => {
                        setShowSuggestions(false);
                        if (onSearchSubmit) onSearchSubmit();
                      }}
                      className="text-xs font-bold text-[#70BF4F] hover:underline flex items-center justify-center gap-1 w-full cursor-pointer"
                    >
                      <span>See all matching products</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle Search"
              className="md:hidden w-10 h-10 rounded-full bg-[#F2F7F5] flex items-center justify-center text-[#161915] hover:bg-[#70BF4F] hover:text-white transition-colors cursor-pointer"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F2F7F5] flex items-center justify-center text-[#161915] hover:bg-[#70BF4F] hover:text-white transition-all relative cursor-pointer group"
            >
              <Heart size={19} className="group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D98E2C] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F2F7F5] flex items-center justify-center text-[#161915] hover:bg-[#70BF4F] hover:text-white transition-all relative cursor-pointer group"
            >
              <ShoppingCart size={19} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#70BF4F] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden w-10 h-10 rounded-full bg-[#F2F7F5] flex items-center justify-center text-[#161915] hover:bg-[#70BF4F] hover:text-white transition-colors cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearchSubmit) {
                    onSearchSubmit();
                    setSearchOpen(false);
                  }
                }}
                placeholder="Search authentic masalas, snacks..."
                className="w-full bg-[#F2F7F5] border border-[#70BF4F] text-sm text-[#161915] placeholder-gray-400 rounded-full py-2.5 pl-9 pr-4 outline-none"
                autoFocus
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#70BF4F]"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-fade-in">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div
                  onClick={() => handleNav("home")}
                  className="cursor-pointer"
                >
                  <img
                    src="/logo.png"
                    alt="Naik Foods"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F2F7F5] flex items-center justify-center text-gray-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={`text-left px-4 py-3 rounded-xl font-bold text-base transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#70BF4F] text-white"
                          : "text-[#161915] hover:bg-[#F2F7F5]"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="text-xs text-gray-500">
                <p className="font-semibold text-gray-800">Naik Foods Storefront</p>
                <p>Shukrawar Peth, Pune 411002</p>
                <p className="mt-1 font-semibold text-[#70BF4F]">+91 9730046247</p>
              </div>
              <button
                onClick={() => handleNav("store")}
                className="w-full py-3 rounded-xl bg-[#70BF4F] text-white font-bold text-sm shadow-md cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
