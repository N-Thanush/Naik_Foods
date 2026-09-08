import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form states for checkout
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pune",
    pincode: "411002",
    paymentMethod: "cod",
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const FREE_SHIPPING_THRESHOLD = 999;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 70;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "NAIK10") {
      setAppliedDiscount(10);
      setCouponMsg("10% discount applied!");
    } else if (code === "FESTIVE") {
      setAppliedDiscount(15);
      setCouponMsg("15% festive discount applied!");
    } else {
      setAppliedDiscount(0);
      setCouponMsg("Invalid coupon. Try 'NAIK10'");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in your name, phone number, and address.");
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-fade-in">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#70BF4F]" size={22} />
            <h3 className="font-extrabold text-lg text-[#161915]">
              Your Basket ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F2F7F5] px-5 py-3 border-b border-[#E0ECE5]">
          <div className="flex items-center justify-between text-xs font-bold text-[#161915]">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#70BF4F]" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-[#4E8537]">
                  🎉 You unlocked FREE Delivery!
                </span>
              ) : (
                <span>
                  Add ₹{amountNeededForFreeShipping} more for{" "}
                  <strong className="text-[#70BF4F]">FREE Delivery</strong>
                </span>
              )}
            </span>
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#70BF4F] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Body */}
        {orderPlaced ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#70BF4F] flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-black text-[#161915]">
              Order Confirmed!
            </h3>
            <p className="text-sm text-gray-600 mt-2 max-w-xs">
              Thank you, {formData.name}! Your authentic Maharashtrian delicacies are being freshly packed in Pune.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl text-xs text-left w-full space-y-1">
              <p><strong>Shipping to:</strong> {formData.address}, {formData.city} - {formData.pincode}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Payment:</strong> Cash on Delivery (COD)</p>
              <p><strong>Total Amount:</strong> ₹{total}</p>
            </div>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setShowCheckout(false);
                onClose();
              }}
              className="mt-6 px-6 py-3 rounded-full bg-[#70BF4F] text-white font-bold text-sm shadow-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : showCheckout ? (
          <div className="flex-1 overflow-y-auto p-5">
            <button
              onClick={() => setShowCheckout(false)}
              className="text-xs font-bold text-[#70BF4F] hover:underline mb-4 flex items-center gap-1 cursor-pointer"
            >
              &larr; Back to Cart Items
            </button>
            <h4 className="font-extrabold text-base text-[#161915] mb-3">
              Delivery Details
            </h4>
            <form onSubmit={handlePlaceOrder} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Rahul Patil"
                  className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="9876543210"
                    className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Flat / House No, Street, Landmark"
                  className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:border-[#70BF4F] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "cod" })
                    }
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      formData.paymentMethod === "cod"
                        ? "border-[#70BF4F] bg-[#F2F7F5] text-[#4E8537]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "online" })
                    }
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      formData.paymentMethod === "online"
                        ? "border-[#70BF4F] bg-[#F2F7F5] text-[#4E8537]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    UPI / Card (Mock)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-2xl bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                Place Order (₹{total})
              </button>
            </form>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <ShoppingBag size={28} />
            </div>
            <h4 className="font-extrabold text-base text-gray-800">
              Your cart is empty
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Explore our range of authentic Vidarbha & Konkan delicacies to fill your basket.
            </p>
            <button
              onClick={() => {
                onClose();
                onNavigate("store");
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#70BF4F] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Explore Shop
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.map(({ product, quantity }) => (
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
                        {product.weight}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-[#161915]">
                      ₹{product.price * quantity}
                    </span>

                    <div className="flex items-center gap-1.5 bg-[#F2F7F5] border border-gray-200 rounded-full p-0.5">
                      <button
                        onClick={() => onUpdateQty(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-extrabold text-[#161915] w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with Subtotal and Checkout Button */}
        {!orderPlaced && items.length > 0 && !showCheckout && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Discount code (e.g. NAIK10)"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase outline-none focus:border-[#70BF4F]"
              />
              <button
                type="submit"
                className="bg-[#161915] text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p
                className={`text-[11px] font-bold ${
                  appliedDiscount > 0 ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {couponMsg}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#70BF4F]">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#161915] pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-3.5 rounded-2xl bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={13} className="text-[#70BF4F]" />
              <span>100% Authentic Food & Safe Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
