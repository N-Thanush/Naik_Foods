import React, { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Store,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Check store opening hours based on IST time (9 AM to 8 PM)
  const isOpenNow = (() => {
    try {
      const now = new Date();
      // UTC + 5.5 hours for IST
      const istHours =
        (now.getUTCHours() + 5 + Math.floor((now.getUTCMinutes() + 30) / 60)) % 24;
      return istHours >= 9 && istHours < 20;
    } catch {
      return true;
    }
  })();

  // Exact Google Maps Embed URL requested by user
  const GOOGLE_MAPS_EMBED_URL =
    "https://maps.google.com/maps?ll=18.508546,73.8573&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=6999264158676992409&output=embed";

  // External Maps link for navigation
  const GOOGLE_MAPS_LINK =
    "https://www.google.com/maps?ll=18.508546,73.8573&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=6999264158676992409";

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText("18.508546, 73.8573");
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in the required fields.");
      return;
    }
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Where is the physical Naik Foods storefront located?",
      a: "Our flagship store is located at Seva Mitra Mandal Chowk, near Fadget Police Chowki, Shukrawar Peth, Pune 411002. You can sample and purchase all fresh batches of authentic masalas, pickles, and snacks directly in-store.",
    },
    {
      q: "Where do you ship across India?",
      a: "We ship nationwide via trusted express courier partners. Orders above ₹999 qualify for Free Standard Delivery. All products are vacuum-sealed and packed in crush-resistant food grade containers in Pune.",
    },
    {
      q: "What is the shelf life of your pickles and masalas?",
      a: "Our pickles are cured with pure cold-pressed groundnut & til oils without synthetic acetic acid, lasting 9 to 12 months. Hand-pounded masalas maintain peak fragrance for 6 to 8 months in an airtight glass or ceramic container.",
    },
    {
      q: "Do you take bulk or wedding gifting orders?",
      a: "Yes! We curate custom Maharashtrian gift hampers for weddings, festivals (Diwali, Gudi Padwa, Makar Sankranti), and corporate events. Contact us directly on WhatsApp at +91 9730046247 for wholesale catalog pricing.",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F2F7F5] to-white pt-8 sm:pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-[#F2F7F5] border border-[#70BF4F]/30 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-[#4E8537]">
                <Sparkles size={13} className="text-[#70BF4F]" />
                Pune Flagship Storefront &amp; Support
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#161915] mt-3 tracking-tight leading-tight">
                Visit Us or Reach Out
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                Whether you want to sample our hand-pounded masalas in Shukrawar Peth, inquire about delivery, or order custom gifting hampers, we're here to assist you.
              </p>
            </div>

            {/* Live Store Status Pill */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
              <span
                className={`w-3 h-3 rounded-full ${
                  isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              ></span>
              <div className="text-xs">
                <p className="font-extrabold text-[#161915]">
                  {isOpenNow ? "Store Open Now" : "Currently Closed"}
                </p>
                <p className="text-gray-400 text-[11px]">
                  Mon – Sun: 9:00 AM – 8:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Interactive Store Card & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Storefront Overview Card */}
            <div className="bg-[#FAFCFA] p-6 sm:p-7 rounded-3xl border border-[#EAEDE9] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F2F7F5] text-[#70BF4F] flex items-center justify-center shrink-0 border border-[#70BF4F]/20 shadow-xs">
                    <Store size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#161915] leading-tight">
                      Shukrawar Peth Store
                    </h3>
                    <p className="text-xs text-[#70BF4F] font-bold">
                      Flagship Heritage Location
                    </p>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#161915] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Navigation size={12} />
                  <span>Directions</span>
                </a>
              </div>

              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                <p className="font-semibold text-gray-900">
                  Seva Mitra Mandal Chowk, near Fadget Police Chowki
                </p>
                <p>Shukrawar Peth, Pune 411002, Maharashtra, India</p>
              </div>

              {/* Quick Actions Strip */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={handleCopyCoords}
                  className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#70BF4F] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCoords ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Coordinates (18.5085, 73.8573)</span>
                    </>
                  )}
                </button>

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#4E8537] hover:border-[#70BF4F] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Store Amenities */}
              <div className="pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#70BF4F]" />
                  <span>In-store Tasting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#70BF4F]" />
                  <span>Open 7 Days a Week</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#70BF4F]" />
                  <span>UPI / Card / Cash</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#70BF4F]" />
                  <span>Fresh Daily Batches</span>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-md relative bg-gray-100 aspect-[16/10] sm:aspect-[16/11]">
              <iframe
                title="Naik Foods Shukrawar Peth Store Location"
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Quick Contact Micro-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="bg-[#FAFCFA] p-5 rounded-2xl border border-[#EAEDE9] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7F5] text-[#70BF4F] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:+919730046247"
                    className="font-extrabold text-sm text-[#161915] hover:text-[#70BF4F] transition-colors"
                  >
                    +91 9730046247
                  </a>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Mon–Sat: 9am–8pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#FAFCFA] p-5 rounded-2xl border border-[#EAEDE9] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F2F7F5] text-[#70BF4F] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    Email Inquiries
                  </span>
                  <a
                    href="mailto:naikfoods001@gmail.com"
                    className="font-extrabold text-xs text-[#161915] hover:text-[#70BF4F] transition-colors break-all"
                  >
                    naikfoods001@gmail.com
                  </a>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Replies within 24h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/80 shadow-lg">
            <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
              Send a Direct Message
            </span>
            <h3 className="text-2xl font-black text-[#161915] mt-1">
              Have an order question or need bulk hampers?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill in the form below and our Pune customer care team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="py-14 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#70BF4F] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-extrabold text-[#161915]">
                  Message Received!
                </h4>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting us, <strong>{formData.name}</strong>. Our Pune storefront team has received your note regarding <em>"{formData.subject}"</em> and will reply to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "Order Inquiry",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#70BF4F] text-white font-bold text-xs shadow-md hover:bg-[#4E8537] transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full text-sm border border-gray-200 rounded-2xl p-3.5 focus:border-[#70BF4F] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@domain.com"
                      className="w-full text-sm border border-gray-200 rounded-2xl p-3.5 focus:border-[#70BF4F] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="9876543210"
                      className="w-full text-sm border border-gray-200 rounded-2xl p-3.5 focus:border-[#70BF4F] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full text-sm border border-gray-200 rounded-2xl p-3.5 focus:border-[#70BF4F] outline-none transition-colors bg-white font-medium text-gray-800"
                    >
                      <option value="Order Inquiry">Order Inquiry &amp; Tracking</option>
                      <option value="Bulk / Gifting">Bulk / Wedding Gifting</option>
                      <option value="Product Question">Product &amp; Recipe Question</option>
                      <option value="Storefront Visit">Storefront Visit &amp; Sampling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us what you need or ask about our ingredients..."
                    className="w-full text-sm border border-gray-200 rounded-2xl p-3.5 focus:border-[#70BF4F] outline-none transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#70BF4F] hover:bg-[#4E8537] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="text-center mb-8">
          <span className="text-xs font-black tracking-widest text-[#70BF4F] uppercase">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#161915] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#161915] flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#70BF4F]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
