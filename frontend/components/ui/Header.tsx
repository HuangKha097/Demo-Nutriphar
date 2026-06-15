"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { CtaButton } from "./CtaButton";
import { Globe, Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const productCategories = [
  "Yến sào Khánh Hòa",
  "Yến chưng sẵn",
  "Nước yến dinh dưỡng",
  "Quà tặng cao cấp"
];

export function Header() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const existing = localStorage.getItem("cart");
      if (existing) {
        try {
          const items = JSON.parse(existing);
          const totalQty = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
          setCartCount(totalQty);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  useEffect(() => {
    setIsAtTop(window.scrollY <= 50);
    setIsProductsDropdownOpen(false);
    setIsMobileProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update at top state
      setIsAtTop(currentScrollY <= 50);

      // Scroll logic: hide on scroll down (past 100px), show on scroll up
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    // Set initial state
    setIsAtTop(window.scrollY <= 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isHomePage = pathname === "/";
  const shouldBeTransparent = isAtTop && isHomePage;

  const textColor = shouldBeTransparent ? "text-white/90" : "text-[#1C1C1C]";
  const iconColor = shouldBeTransparent ? "text-white/90 hover:text-[#D4AF37]" : "text-[#1C1C1C] hover:text-[#D4AF37]";
  const navLinkColor = shouldBeTransparent
    ? "text-white/90 hover:text-[#D4AF37]"
    : "text-[#1C1C1C] hover:text-[#D4AF37]";

  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    const handleScrollForHash = () => {
      if (pathname === "/") {
        const newsSection = document.getElementById("news");
        if (newsSection) {
          const rect = newsSection.getBoundingClientRect();
          // If the news section's top is in the upper part of the viewport
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveHash("#news");
            return;
          }
        }
        if (window.scrollY < 200) {
          setActiveHash("");
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScrollForHash, { passive: true });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScrollForHash);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.split("#")[1];
      return pathname === "/" && activeHash === `#${hash}`;
    }
    if (href === "/") {
      return pathname === "/" && activeHash === "";
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const getNavLinkStyles = (href: string) => {
    const active = isLinkActive(href);
    const baseClasses = "relative text-[15px] lg:text-[16px] font-medium transition-colors duration-300 whitespace-nowrap after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-[#D4AF37] after:rounded-full after:transition-all after:duration-300";

    if (active) {
      return `${baseClasses} text-[#D4AF37] after:w-full`;
    }

    const inactiveTextColor = shouldBeTransparent
      ? "text-white/90 hover:text-[#D4AF37]"
      : "text-[#1C1C1C] hover:text-[#D4AF37]";

    return `${baseClasses} ${inactiveTextColor} after:w-0 hover:after:w-full`;
  };

  const getMobileNavLinkStyles = (href: string) => {
    const active = isLinkActive(href);
    const baseClasses = "text-[16px] font-semibold transition-colors font-body py-1 border-b border-[#E5E5E5]/50 flex items-center justify-between";
    if (active) {
      return `${baseClasses} text-[#D4AF37]`;
    }
    return `${baseClasses} text-[#1C1C1C] hover:text-[#D4AF37]`;
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isMobileMenuOpen
            ? "bg-transparent shadow-none"
            : shouldBeTransparent
              ? "bg-transparent shadow-none"
              : "bg-white/95 backdrop-blur-[12px] shadow-sm border-b border-[#E5E5E5]/40"
          }`}
      >
        {/* Promo banner */}
        <div className={`w-full overflow-hidden py-1.5 transition-colors duration-500 ${shouldBeTransparent ? "bg-white/10 backdrop-blur-sm" : "bg-accent"}`}>
          <div className="flex animate-marquee text-white/90 whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4 text-[12px] md:text-[13px] font-body tracking-wide">
                <span> Giảm 15% cho đơn hàng đầu tiên</span>
                <span className="text-[#D4AF37]">✦</span>
                <span> Miễn phí vận chuyển đơn từ 500K</span>
                <span className="text-[#D4AF37]">✦</span>
                <span> Flash Sale — Yến sào cao cấp chỉ từ 299K</span>
                <span className="text-[#D4AF37]">✦</span>
                <span> Tặng kèm nước yến khi mua combo 6 hộp</span>
                <span className="text-[#D4AF37]">✦</span>
              </div>
            ))}
          </div>
        </div>
        <Container>
          <div className="flex h-[76px] lg:h-[80px] items-center justify-between relative">
            {/* Logo — left */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Nutriphar"
                width={150}
                height={50}
                priority
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Nav — centered (shifts left when search is open) */}
            <nav className={`hidden md:flex items-center gap-8 absolute -translate-x-1/2 transition-[left] duration-300 ease-in-out ${isSearchOpen ? "left-[30%]" : "left-1/2"
              }`}>
              <Link href="/" className={getNavLinkStyles("/")}>
                Trang chủ
              </Link>
              <div
                className="relative py-2 group"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <Link
                  href="/products"
                  className={`flex items-center gap-1 cursor-pointer ${getNavLinkStyles("/products")}`}
                >
                  <span>Sản phẩm</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsDropdownOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
                </Link>
                {/* Premium Dropdown Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 transition-all duration-300 ${isProductsDropdownOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="bg-white/95 backdrop-blur-[12px] shadow-xl border border-[#E5E5E5]/40 p-1.5 rounded-xs flex flex-col gap-0.5">
                    <Link
                      href="/products"
                      className="block px-4 py-2.5 text-[14px] font-bold text-[#1C1C1C] hover:bg-[#D4AF37]/10 hover:text-[#8C6A00] transition-colors rounded-xs"
                    >
                      Tất cả sản phẩm
                    </Link>
                    <div className="h-[1px] bg-gray-100/80 my-1 mx-2" />
                    {productCategories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="block px-4 py-2.5 text-[13.5px] font-medium text-[#1C1C1C]/80 hover:bg-[#D4AF37]/10 hover:text-[#8C6A00] transition-colors rounded-xs"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/about" className={getNavLinkStyles("/about")}>
                Về chúng tôi
              </Link>
              <Link href="/news" className={getNavLinkStyles("/news")}>
                Tin tức
              </Link>
            </nav>

            {/* Actions — right */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Search area */}
              <div className="flex items-center gap-2">
                {/* Search input — expands when open (Desktop), always visible (Mobile) */}
                <div className={`w-[160px] sm:w-[220px] md:overflow-hidden md:transition-all md:duration-300 md:ease-in-out ${isSearchOpen ? "md:w-[200px] lg:w-[280px] md:opacity-100" : "md:w-0 md:opacity-0"
                  }`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Tìm kiếm..."
                    className={`w-full h-[36px] px-4 rounded-full text-[14px] font-body outline-none transition-colors duration-300 ${shouldBeTransparent
                      ? "bg-white/15 text-white placeholder-white/50 border border-white/20 focus:bg-white/25"
                      : "bg-gray-100 text-[#1C1C1C] placeholder-gray-400 border border-gray-200 focus:border-primary/40"
                      }`}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsSearchOpen(false);
                    }}
                  />
                </div>

                {/* Search toggle button — Desktop only */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`hidden md:block transition-colors duration-500 ${iconColor}`}
                  aria-label="Toggle search"
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
              </div>

              <Link
                href="/cart"
                className={`relative transition-colors duration-500 hover:text-accent p-1.5 flex items-center justify-center ${iconColor}`}
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Language toggle */}
              <button className={`hidden md:flex items-center gap-1 text-[13px] font-medium transition-colors duration-500 ${iconColor}`}>
                <Globe className="h-4 w-4" />
                <span>VI</span>
              </button>

              <div className="hidden md:block">
                <Link href="/login">
                  <CtaButton
                    icon={<User className="h-4 w-4 text-white" />}
                    className="pl-5 pr-1.5 py-1 text-[13.5px] shadow-sm bg-primary hover:bg-[#12224F]"
                  >
                    Đăng nhập
                  </CtaButton>
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden transition-colors duration-500 ${iconColor}`}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer container */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-[#FAFAF7] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div>
            {/* Header of the drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <Image
                  src="/images/logo.svg"
                  alt="Nutriphar"
                  width={130}
                  height={40}
                  priority
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#1C1C1C] hover:text-[#D4AF37] transition-colors p-1"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 pt-8">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getMobileNavLinkStyles("/")}
              >
                <span>Trang chủ</span>
                {isLinkActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
              </Link>
              <div className="flex flex-col">
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className={`w-full cursor-pointer flex items-center justify-between text-[16px] font-semibold transition-colors font-body py-1 border-b border-[#E5E5E5]/50 ${isLinkActive("/products") ? "text-[#D4AF37]" : "text-[#1C1C1C] hover:text-[#D4AF37]"
                    }`}
                >
                  <span>Sản phẩm</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`pl-4 flex flex-col gap-2.5 overflow-hidden transition-all duration-300 ${isMobileProductsOpen ? "max-h-[300px] mt-3 pb-2" : "max-h-0"
                    }`}
                >
                  <Link
                    href="/products"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileProductsOpen(false);
                    }}
                    className="text-[14.5px] font-semibold text-gray-800 hover:text-[#D4AF37] py-1 border-b border-[#E5E5E5]/30 block"
                  >
                    Tất cả sản phẩm
                  </Link>
                  {productCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileProductsOpen(false);
                      }}
                      className="text-[14px] font-medium text-gray-600 hover:text-[#D4AF37] py-1 border-b border-[#E5E5E5]/30 block"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getMobileNavLinkStyles("/about")}
              >
                <span>Về chúng tôi</span>
                {isLinkActive("/about") && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
              </Link>
              <Link
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className={getMobileNavLinkStyles("/news")}
              >
                <span>Tin tức</span>
                {isLinkActive("/news") && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
              </Link>
            </nav>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col gap-5 pt-6 border-t border-[#E5E5E5]">
            {/* Language toggle on mobile */}
            <button className="flex items-center gap-2 text-[14px] font-medium text-[#1C1C1C] hover:text-[#D4AF37] transition-colors font-body">
              <Globe className="h-4 w-4 text-[#D4AF37]" />
              <span>Tiếng Việt (VI)</span>
            </button>

            {/* Login button */}
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
              <CtaButton
                icon={<User className="h-4 w-4 text-white" />}
                className="w-full justify-between bg-primary hover:bg-[#12224F]"
              >
                Đăng nhập
              </CtaButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
