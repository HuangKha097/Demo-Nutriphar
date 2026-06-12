"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Button } from "./Button";
import { Globe, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const textColor = isAtTop ? "text-white/90" : "text-[#1C1C1C]";
  const iconColor = isAtTop ? "text-white/90 hover:text-[#D4AF37]" : "text-[#1C1C1C] hover:text-[#D4AF37]";
  const navLinkColor = isAtTop
    ? "text-white/90 hover:text-[#D4AF37]"
    : "text-[#1C1C1C] hover:text-[#D4AF37]";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${isAtTop
        ? "bg-transparent shadow-none"
        : "bg-[#FAFAF7]/94 backdrop-blur-[12px] shadow-sm"
        }`}
    >
      {/* Promo banner */}
      <div className={`w-full overflow-hidden py-1.5 transition-colors duration-500 ${isAtTop ? "bg-white/10 backdrop-blur-sm" : "bg-accent"}`}>
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
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav — centered (shifts left when search is open) */}
          <nav className={`hidden md:flex items-center gap-8 absolute -translate-x-1/2 transition-[left] duration-300 ease-in-out ${isSearchOpen ? "left-[30%]" : "left-1/2"
            }`}>
            <Link href="/" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
              Trang chủ
            </Link>
            <Link href="#" className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${navLinkColor}`}>
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
          <div className="flex items-center gap-4 shrink-0">
            {/* Search area */}
            <div className="flex items-center gap-2">
              {/* Search input — expands when open */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "w-[200px] lg:w-[280px] opacity-100" : "w-0 opacity-0"
                }`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className={`w-full h-[36px] px-4 rounded-full text-[14px] font-body outline-none transition-colors duration-300 ${isAtTop
                      ? "bg-white/15 text-white placeholder-white/50 border border-white/20 focus:bg-white/25"
                      : "bg-gray-100 text-[#1C1C1C] placeholder-gray-400 border border-gray-200 focus:border-primary/40"
                    }`}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsSearchOpen(false);
                  }}
                />
              </div>

              {/* Search toggle button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`transition-colors duration-500 ${iconColor}`}
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

            <Button className="hidden md:inline-flex px-6 bg-accent hover:bg-[#8B1215] text-accent-foreground text-[15px] lg:text-[16px] font-medium border-none shadow-md rounded-full">
              Đăng nhập
            </Button>
            <button className={`md:hidden transition-colors duration-500 ${iconColor}`}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
