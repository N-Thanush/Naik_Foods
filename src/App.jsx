import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StorePage from "./pages/StorePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import { products } from "./data/products";
import { Check } from "lucide-react";

export default function App() {
  // Sync page from URL hash or fallback to home
  const getInitialPage = () => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (["home", "about", "store", "blog", "contact"].includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.replace(/^\/in\/?/, "").replace(/^\//, "").toLowerCase();
    if (["about", "store", "blog", "contact"].includes(path)) {
      return path;
    }
    return "home";
  };

  const [page, setPage] = useState(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("naik_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem("naik_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Drawers & Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);

  // Toast notification
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 2800);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("naik_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("naik_wishlist", JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash.replace("#", "").toLowerCase();
      if (["home", "about", "store", "blog", "contact"].includes(h)) {
        setPage(h);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (newPage) => {
    setPage(newPage);
    window.location.hash = newPage === "home" ? "" : `#${newPage}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.title}" to basket!`);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.title}" from wishlist.`);
        return prev.filter((id) => id !== product.id);
      }
      showToast(`Saved "${product.title}" to wishlist!`);
      return [...prev, product.id];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#161915] flex flex-col justify-between selection:bg-[#70BF4F]/20 selection:text-[#4E8537]">
      {/* Sticky Navigation Header */}
      <Header
        currentPage={page}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onOpenProduct={(prod) => setActiveProductModal(prod)}
        onSearchSubmit={() => {
          if (page !== "store") {
            navigateTo("store");
          }
        }}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {page === "home" && (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            onOpenProduct={(prod) => setActiveProductModal(prod)}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onToggleWishlist={handleToggleWishlist}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
            }}
            onSelectRegion={(reg) => {
              setSelectedRegion(reg);
            }}
          />
        )}

        {page === "about" && <AboutPage onNavigate={navigateTo} />}

        {page === "store" && (
          <StorePage
            products={products}
            onOpenProduct={(prod) => setActiveProductModal(prod)}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onToggleWishlist={handleToggleWishlist}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={navigateTo}
          />
        )}

        {page === "blog" && <BlogPage onNavigate={navigateTo} />}

        {page === "contact" && <ContactPage onNavigate={navigateTo} />}
      </main>

      {/* Official Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigate={navigateTo}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onNavigate={navigateTo}
      />

      {/* Interactive Product Detail Modal */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          inWishlist={wishlistIds.includes(activeProductModal.id)}
          cartQty={
            cartItems.find((i) => i.product.id === activeProductModal.id)
              ?.quantity || 0
          }
          onUpdateQty={handleUpdateQty}
          onBuyNow={(prod, qty) => {
            handleAddToCart(prod, qty);
            setCartOpen(true);
          }}
        />
      )}

      {/* Floating WhatsApp Chat & Back to top */}
      <FloatingWhatsApp />

      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#161915] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in border border-white/20">
          <div className="w-5 h-5 rounded-full bg-[#70BF4F] flex items-center justify-center text-white shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}