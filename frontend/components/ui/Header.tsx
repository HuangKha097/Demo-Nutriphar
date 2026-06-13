"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Button } from "./Button";
import { Globe, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsAtTop(window.scrollY <= 50);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 50);
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

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ease-in-out ${
        isMobileMenuOpen
          ? "bg-transparent shadow-none"
          : shouldBeTransparent
          ? "bg-transparent shadow-none"
          : "bg-[#FAFAF7]/94 backdrop-blur-[12px] shadow-sm border-b border-[#E5E5E5]/40"
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
            <Link href="/" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
              Trang chủ
            </Link>
            <Link href="/products" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
              Sản phẩm
            </Link>
            <Link href="/about" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
              Về chúng tôi
            </Link>
            <Link href="#" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
              Tin tức
            </Link>
          </nav>

          {/* Actions — right */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search area */}
            <div className="flex items-center gap-2">
              {/* Search input — expands when open (Desktop), always visible (Mobile) */}
              <div className={`w-[130px] sm:w-[180px] md:overflow-hidden md:transition-all md:duration-300 md:ease-in-out ${isSearchOpen ? "md:w-[200px] lg:w-[280px] md:opacity-100" : "md:w-0 md:opacity-0"
                }`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  className={`w-full h-[36px] px-4 rounded-full text-[14px] font-body outline-none transition-colors duration-300 ${isAtTop
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

            <button className={`transition-colors duration-500 ${iconColor}`}>
              <ShoppingCart className="h-5 w-5" />
            </button>
            {/* Language toggle */}
            <button className={`hidden md:flex items-center gap-1 text-[13px] font-medium transition-colors duration-500 ${iconColor}`}>
              <Globe className="h-4 w-4" />
              <span>VI</span>
            </button>

            <div className="hidden md:block">
              <Button className="px-6 bg-accent hover:bg-[#8B1215] text-accent-foreground text-[15px] lg:text-[16px] font-medium border-none shadow-md rounded-full">
                Đăng nhập
              </Button>
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
                className="text-[16px] font-semibold text-[#1C1C1C] hover:text-[#D4AF37] transition-colors font-body py-1 border-b border-[#E5E5E5]/50"
              >
                Trang chủ
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-[#1C1C1C] hover:text-[#D4AF37] transition-colors font-body py-1 border-b border-[#E5E5E5]/50"
              >
                Sản phẩm
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-[#1C1C1C] hover:text-[#D4AF37] transition-colors font-body py-1 border-b border-[#E5E5E5]/50"
              >
                Về chúng tôi
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-semibold text-[#1C1C1C] hover:text-[#D4AF37] transition-colors font-body py-1 border-b border-[#E5E5E5]/50"
              >
                Tin tức
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
            <Button
              className="w-full py-3 bg-accent hover:bg-[#8B1215] text-accent-foreground text-[16px] font-medium border-none shadow-md rounded-full flex justify-center items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
