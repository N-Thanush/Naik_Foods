import React from "react";
import { Heart, Plus, Minus, Star, ShoppingCart, Eye } from "lucide-react";

export default function ProductCard({
  product,
  onOpen,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  cartQty = 0,
  inWishlist = false,
}) {
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-[#EBEFEA] hover:border-[#70BF4F]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Media / Thumbnail Area */}
      <div className="relative aspect-square w-full bg-[#F5F7F4] overflow-hidden">
        {/* Click to open modal */}
        <div
          onClick={() => onOpen(product)}
          className="w-full h-full cursor-pointer overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Quick View overlay button */}
        <button
          onClick={() => onOpen(product)}
          aria-label="Quick View"
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#161915] shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#70BF4F] hover:text-white cursor-pointer pointer-events-none group-hover:pointer-events-auto"
        >
          <Eye size={18} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="bg-[#70BF4F] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs tracking-wider">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#D98E2C] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            inWishlist
              ? "bg-rose-50 text-rose-500"
              : "bg-white/85 text-gray-600 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <Heart
            size={17}
            className={inWishlist ? "fill-rose-500" : ""}
          />
        </button>

        {/* Region Tag at bottom corner of image */}
        {product.region && (
          <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs px-2 py-0.5 rounded-md pointer-events-none">
            {product.region}
          </span>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-[#70BF4F]">{product.categoryName}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium text-[11px]">
              {product.weight}
            </span>
          </div>

          <h3
            onClick={() => onOpen(product)}
            className="font-extrabold text-[15px] sm:text-base text-[#161915] leading-snug line-clamp-1 hover:text-[#70BF4F] cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {product.subtitle || product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star size={13} className="fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#161915]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">
              In Stock
            </span>
          </div>

          {/* Add / Qty Controls */}
          {cartQty > 0 ? (
            <div className="flex items-center gap-2 bg-[#F2F7F5] border border-[#70BF4F] rounded-full p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateQty(product.id, cartQty - 1);
                }}
                className="w-7 h-7 rounded-full bg-white text-[#161915] flex items-center justify-center shadow-xs hover:bg-[#70BF4F] hover:text-white transition-colors cursor-pointer"
              >
                <Minus size={13} />
              </button>
              <span className="text-xs font-extrabold text-[#161915] w-5 text-center">
                {cartQty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateQty(product.id, cartQty + 1);
                }}
                className="w-7 h-7 rounded-full bg-white text-[#161915] flex items-center justify-center shadow-xs hover:bg-[#70BF4F] hover:text-white transition-colors cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex items-center gap-1.5 bg-[#70BF4F] hover:bg-[#4E8537] text-white px-3.5 py-2 rounded-full text-xs font-extrabold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <ShoppingCart size={13} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
