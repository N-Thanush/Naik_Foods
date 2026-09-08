import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  Sparkles,
  Share2,
  Check,
} from "lucide-react";
import { blogs } from "../data/blogs";

export default function BlogPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeArticle, setActiveArticle] = useState(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    "all",
    "Healthy Snacking",
    "Fasting & Upwas",
    "Heritage Recipes",
    "Regional Cuisine",
    "Food Knowledge",
  ];

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "all") return blogs;
    return blogs.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F2F7F5] to-white pt-8 sm:pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F2F7F5] border border-[#70BF4F]/30 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-[#4E8537]">
              <Sparkles size={13} className="text-[#70BF4F]" />
              Recipes &amp; Culinary Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#161915] mt-3 tracking-tight leading-tight">
              Stories, Spice Guides &amp; Maharashtrian Secrets
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Explore authentic fasting traditions, grandmother’s spice secrets, and regional cooking techniques from Vidarbha to the Konkan coast.
            </p>
          </div>
        </div>
      </section>

      {/* Main Blog Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#70BF4F] text-white shadow-xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>

        {/* Featured Top Article */}
        {filteredBlogs.length > 0 && (
          <div
            onClick={() => setActiveArticle(filteredBlogs[0])}
            className="group mb-12 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100 relative">
              <img
                src={filteredBlogs[0].image}
                alt={filteredBlogs[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#70BF4F] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                Featured Story
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold mb-3">
                  <span className="text-[#70BF4F] font-bold">
                    {filteredBlogs[0].category}
                  </span>
                  <span>•</span>
                  <span>{filteredBlogs[0].readTime}</span>
                  <span>•</span>
                  <span>{filteredBlogs[0].date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161915] group-hover:text-[#70BF4F] transition-colors leading-tight">
                  {filteredBlogs[0].title}
                </h2>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">
                  {filteredBlogs[0].excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F2F7F5] text-[#4E8537] font-black text-xs flex items-center justify-center">
                    PN
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    {filteredBlogs[0].author}
                  </span>
                </div>

                <span className="text-xs font-extrabold text-[#70BF4F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.slice(1).map((blog) => (
            <article
              key={blog.id}
              onClick={() => setActiveArticle(blog)}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mb-2">
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <Clock size={12} />
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#161915] group-hover:text-[#70BF4F] transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-600">{blog.author}</span>
                  <span className="text-[#70BF4F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveArticle(null)}
          ></div>

          {/* Dialog Container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-fade-in my-auto max-h-[92vh] flex flex-col">
            {/* Header bar */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <span className="text-xs font-bold text-[#70BF4F] uppercase tracking-wider">
                {activeArticle.category} • {activeArticle.readTime}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share Article"
                  className="w-8 h-8 rounded-full bg-white text-gray-600 hover:text-black flex items-center justify-center border border-gray-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center border border-gray-200 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Scrollable Area */}
            <div className="p-6 sm:p-10 overflow-y-auto">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#161915] leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-3 mt-4 pb-6 border-b border-gray-100 text-xs text-gray-500">
                <div className="w-9 h-9 rounded-full bg-[#70BF4F] text-white font-bold flex items-center justify-center text-sm">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{activeArticle.author}</p>
                  <p className="text-[11px]">{activeArticle.authorRole} • {activeArticle.date}</p>
                </div>
              </div>

              {/* Article Hero Image */}
              <div className="my-6 rounded-2xl overflow-hidden aspect-[16/9] shadow-md">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Markdown/HTML styled Body */}
              <div className="prose prose-stone max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: activeArticle.content
                      .replace(/### (.*)/g, "<h3 class='text-xl font-black text-[#161915] mt-6 mb-2'>$1</h3>")
                      .replace(/#### (.*)/g, "<h4 class='text-lg font-bold text-[#4E8537] mt-4 mb-1'>$1</h4>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-900'>$1</strong>"),
                  }}
                />
              </div>

              {/* Footer CTA */}
              <div className="mt-10 p-6 rounded-2xl bg-[#F2F7F5] border border-[#70BF4F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-sm text-[#161915]">
                    Loved this story?
                  </h4>
                  <p className="text-xs text-gray-500">
                    Taste the authentic ingredients featured in this article.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate("store");
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#70BF4F] text-white font-bold text-xs shadow-md hover:bg-[#4E8537] transition-colors cursor-pointer"
                >
                  Shop Ingredients Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
