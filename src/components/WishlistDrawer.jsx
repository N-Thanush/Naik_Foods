import React from "react";
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onNavigate,
}) {
  if (!isOpen) return null;

  const wishProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-fade-in">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" size={20} />
            <h3 className="font-extrabold text-lg text-[#161915]">
              My Wishlist ({wishProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {wishProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 mb-3">
              <Heart size={28} />
            </div>
            <h4 className="font-extrabold text-base text-gray-800">
              Your wishlist is empty
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Save your favorite authentic masalas, snacks, and pickles to review them later.
            </p>
            <button
              onClick={() => {
                onClose();
                onNavigate("store");
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#70BF4F] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Browse Specialties
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {wishProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-3.5 first:pt-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-extrabold text-xs sm:text-sm text-[#161915] line-clamp-1">
                        {product.title}
                      </h5>
                      <span className="text-[11px] text-gray-400">
                        {product.weight} • {product.region}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-sm font-black text-[#161915]">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      className="flex items-center gap-1.5 bg-[#70BF4F] hover:bg-[#4E8537] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      <ShoppingCart size={12} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {wishProducts.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={() => {
                wishProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>Add All to Cart</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
