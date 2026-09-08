import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-[#F2F7F5] hover:text-[#70BF4F] hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20about%20Naik%20Foods."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer group"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.43ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.9-9.89 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>
    </div>
  );
}
