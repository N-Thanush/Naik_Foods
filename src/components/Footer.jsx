import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Send,
} from "lucide-react";

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const navTo = (pageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative text-white pt-16 md:pt-20 bg-[#161915] border-t border-white/10 overflow-hidden font-sans">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#70BF4F]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pb-16">
        {/* Newsletter Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#212720] via-[#1D221C] to-[#242D22] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Join The Family
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Taste the True Heritage of Maharashtra
            </h3>
            <p className="text-sm text-white/70 mt-2">
              Subscribe to receive authentic grandmother recipes, seasonal pickle releases, and exclusive member discounts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-[#70BF4F]/20 border border-[#70BF4F] text-[#70BF4F] px-5 py-3 rounded-2xl text-sm font-bold text-center">
                🎉 Welcome to the Naik Foods family! Check your inbox soon.
              </div>
            ) : (
              <div className="flex gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 focus-within:border-[#70BF4F] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#70BF4F] hover:bg-[#4E8537] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <span>Join</span>
                  <Send size={13} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => navTo("home")}
              className="inline-block bg-white px-3.5 py-2 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logo.png"
                alt="Naik Foods"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Rooted in over 80 years of agricultural and culinary legacy in Pune.
              Bringing pure, hand-pounded masalas, sun-cured pickles, and traditional delicacies from Vidarbha, Konkan, and Marathwada straight to your kitchen.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20about%20Naik%20Foods."
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.43ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.9-9.89 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-[#70BF4F] uppercase border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {["home", "about", "store", "blog", "contact"].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => navTo(page)}
                    className="hover:text-white hover:translate-x-1 transition-all cursor-pointer capitalize"
                  >
                    {page === "store" ? "Shop Catalog" : page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-[#70BF4F] uppercase border-b border-white/10 pb-2">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <button
                  onClick={() => navTo("store")}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left"
                >
                  Vidarbha Masalas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo("store")}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left"
                >
                  Konkan Pickles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo("store")}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left"
                >
                  Upwas Delicacies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo("store")}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left"
                >
                  Thalipith Bhajni
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo("store")}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer text-left"
                >
                  Pune Mukhvas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Storefront */}
          <div className="lg:col-span-4 space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10">
            <h4 className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Pune Storefront & Support
            </h4>
            <div className="space-y-3 text-xs text-white/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#70BF4F] shrink-0 mt-0.5" />
                <span>
                  Seva Mitra mandal chauk, near Fadget polis chauki, Shukrawar Peth, Pune 411002
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#70BF4F] shrink-0" />
                <a href="tel:+919730046247" className="hover:text-white font-bold">
                  +91 9730046247
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#70BF4F] shrink-0" />
                <a href="mailto:naikfoods001@gmail.com" className="hover:text-white">
                  naikfoods001@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <Clock size={16} className="text-[#70BF4F] shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Naik Foods. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500" />
            <span>for authentic Maharashtrian heritage • Design & Developed by Bits and Volts</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
