import React, { useState } from "react";
import {
  X,
  Heart,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  inWishlist = false,
  onBuyNow,
}) {
  const [activeImageState, setActiveImageState] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];
  const activeImage = activeImageState || images[0] || product.thumbnail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-fade-in my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left: Product Images Gallery */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-[#F6F8F5] flex flex-col justify-between">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-gray-100 flex items-center justify-center relative">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#70BF4F] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageState(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img
                      ? "border-[#70BF4F] scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust strip */}
          <div className="mt-6 pt-4 border-t border-gray-200/60 grid grid-cols-2 gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-[#70BF4F]" />
              <span>Free Delivery &gt; ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#70BF4F]" />
              <span>Authentic Recipe</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#70BF4F]">
                {product.categoryName}
              </span>
              {product.region && (
                <span className="flex items-center gap-1 text-xs font-bold bg-[#F2F7F5] text-[#4E8537] px-2.5 py-1 rounded-md">
                  <MapPin size={12} />
                  Origin: {product.region}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161915] mt-2 leading-tight">
              {product.title}
            </h2>

            <p className="text-sm font-semibold text-gray-500 mt-1">
              {product.subtitle}
            </p>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Price & Weight */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-black text-[#161915]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                Net Wt: {product.weight}
              </span>
            </div>

            {/* Dietary Tags */}
            {product.dietary && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.dietary.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-[#F2F7F5] text-[#161915] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#70BF4F]/20"
                  >
                    <Sparkles size={11} className="text-[#70BF4F]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                About this Specialty
              </h4>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Authentic Ingredients / Material */}
            {product.material && (
              <div className="mt-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                  <Check size={13} className="text-[#70BF4F]" />
                  Key Ingredients / Preparation:
                </h5>
                <p className="text-xs text-gray-600 mt-1 leading-normal">
                  {product.material}
                </p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-[#F2F7F5] border border-gray-200 rounded-2xl p-1">
                <button
                  onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                  className="w-9 h-9 rounded-xl bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-extrabold text-sm text-[#161915]">
                  {selectedQty}
                </span>
                <button
                  onClick={() => setSelectedQty(selectedQty + 1)}
                  className="w-9 h-9 rounded-xl bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => {
                  onAddToCart(product, selectedQty);
                  onClose();
                }}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <ShoppingCart size={17} />
                <span>Add to Cart • ₹{product.price * selectedQty}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Wishlist"
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer ${
                  inWishlist
                    ? "border-rose-300 bg-rose-50 text-rose-500"
                    : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-rose-500"
                }`}
              >
                <Heart size={20} className={inWishlist ? "fill-rose-500" : ""} />
              </button>
            </div>

            {/* Direct Buy Now button */}
            {onBuyNow && (
              <button
                onClick={() => {
                  onBuyNow(product, selectedQty);
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-[#161915] hover:bg-black text-white font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-sm"
              >
                Buy Now with Instant Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
