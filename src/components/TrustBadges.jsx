import React from "react";
import { Truck, Headphones, ShieldCheck, RotateCcw } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Free Delivery",
      subtitle: "Minimum order ₹999",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Contact us 24 Hours",
    },
    {
      icon: ShieldCheck,
      title: "Secure Pay",
      subtitle: "100% Secure Payment",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "Within 30 Days",
    },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 bg-[#FAFCFA] border border-[#F0F2EF] rounded-3xl shadow-xs">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1 ${
                  idx < badges.length - 1 ? "lg:border-r lg:border-[#E8ECE7] lg:pr-6" : ""
                }`}
              >
                <div className="w-13 h-13 rounded-2xl bg-[#F2F7F5] border border-[#70BF4F]/20 flex items-center justify-center text-[#70BF4F] shrink-0 shadow-xs">
                  <Icon size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#161915] text-[15px] leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-[#585E61] font-medium mt-1">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
