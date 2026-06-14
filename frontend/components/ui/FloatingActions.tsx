"use client";

import { useState, useEffect } from "react";
import { ChevronUp, Phone, Mail, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false); // Auto-close menu when scroll is near top
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isProductDetail = pathname?.startsWith("/products/") && pathname !== "/products";
  const mobileBottomClass = isProductDetail ? "bottom-24" : "bottom-6";

  return (
    <div
      className={`fixed ${mobileBottomClass} md:bottom-6 right-6 z-40 flex flex-col gap-3 items-center transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
    >
      {/* Expanded Contact Buttons Stack (appears above Main Contact Button) */}
      <div
        className={`flex flex-col gap-3 items-end transition-all duration-300 ease-in-out absolute bottom-[116px] right-0 origin-bottom-right ${isExpanded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-4 pointer-events-none"
          }`}
      >
        {/* Zalo Button */}
        <div className="flex items-center gap-2">
          <span className="bg-[#0068FF] text-white text-[12px] font-medium px-2.5 py-1.5 rounded-md shadow-md border border-white/10 whitespace-nowrap">
            Chat Zalo
          </span>
          <Link
            href="https://zalo.me/0988781879"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0068FF] text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
            aria-label="Liên hệ Zalo"
          >
            <span className="text-[11px] font-bold tracking-tighter">Zalo</span>
          </Link>
        </div>

        {/* Email Button */}
        <div className="flex items-center gap-2">
          <span className="bg-[#D4AF37] text-white text-[12px] font-medium px-2.5 py-1.5 rounded-md shadow-md border border-white/10 whitespace-nowrap">
            Gửi Email
          </span>
          <Link
            href="mailto:ad.nutriphar.pkd@gmail.com"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37] text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
            aria-label="Gửi Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>


        <div className="flex items-center gap-2">
          <span className="bg-accent/90 text-white text-[12px] font-medium px-2.5 py-1.5 rounded-md shadow-md border border-white/10 whitespace-nowrap">
            Hotline 1: 0258.6257.287
          </span>
          <Link
            href="tel:02586257287"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-accent   text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
            aria-label="Gọi điện thoại hotline 1"
          >
            <Phone className="w-4 h-4" />
          </Link>
        </div>

        {/* Hotline Button */}
        <div className="flex items-center gap-2">
          <span className="bg-accent/90 text-white text-[12px] font-medium px-2.5 py-1.5 rounded-md shadow-md border border-white/10 whitespace-nowrap">
            Hotline 2: 0988.781.879
          </span>
          <Link
            href="tel:0988781879"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
            aria-label="Gọi điện thoại hotline 2"
          >
            <Phone className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Contact Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group relative z-10 ${isExpanded ? "bg-gray-800" : "bg-accent hover:bg-[#8B1215]"
          }`}
        aria-label="Mở rộng liên hệ"
      >
        {isExpanded ? (
          <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="w-5 h-5 animate-pulse" />
        )}
        {/* Tooltip */}
        <span className="absolute right-14 bg-[#1C1C1C] text-white text-[12px] font-medium px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
          {isExpanded ? "Đóng liên hệ" : "Liên hệ với chúng tôi"}
        </span>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-primary border border-gray-200 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Cuộn lên đầu trang"
      >
        <ChevronUp className="w-6 h-6" />
        {/* Tooltip */}
        <span className="absolute right-14 bg-primary text-white text-[12px] font-medium px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
          Cuộn lên đầu trang
        </span>
      </button>
    </div>
  );
}
