"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const rootRef = useGsapReveal();
  const leafWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (leafWrapperRef.current) {
      gsap.from(leafWrapperRef.current, {
        x: 250, // Slide in from the right
        y: -250, // Slide down from the top
        opacity: 0,
        rotation: 20, // More rotation for natural "growing" effect
        duration: 2,
        ease: "power3.out",
        delay: 0.2, // Start a bit faster
      });
    }
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="relative w-full h-[100vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/herobackground2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>


      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20 lg:pt-0">

          {/* Cột trái: Nội dung */}
          <div className="lg:col-span-7 pb-20 lg:py-0 text-center lg:text-left">
            <span data-reveal className="block text-[#D4AF37] font-semibold tracking-widest uppercase mb-4 text-[14px]" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}>
              Thương hiệu yến sào cao cấp
            </span>
            <h1 data-reveal className="text-[48px] lg:text-[64px] font-semibold text-[#FFF6E8] mb-6 font-display leading-[1.15]" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.35)" }}>
              Món Quà Đến Từ <br /> Thiên Nhiên
            </h1>
            <p data-reveal className="text-[17px] lg:text-[18px] leading-[1.7] text-[#EADCCA] max-w-[580px] mx-auto lg:mx-0 mb-10 font-body" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.35)" }}>
              Nutriphar tự hào mang đến dòng yến sào thượng hạng được khai thác từ biển Khánh Hòa. Hòa quyện cùng công nghệ bảo quản tối ưu, giữ trọn vẹn dưỡng chất thiên nhiên cho sức khỏe gia đình bạn.
            </p>

            <div data-reveal className="relative z-20 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
              <CtaButton
                icon={<ArrowRight className="w-4 h-4 text-white" />}
                className="w-auto h-[46px] md:h-[52px] text-[14px] md:text-[16px] pl-6 pr-1.5 md:pl-8 md:pr-2 bg-accent hover:bg-[#8B1215] shadow-lg border-none"
              >
                Mua Ngay
              </CtaButton>
              <button className="w-auto bg-transparent border-white border-2 text-white hover:bg-white/10 hover:opacity-80 font-medium text-[14px] md:text-[16px] px-6 md:px-8 h-[46px] md:h-[52px] rounded-full transition-all duration-300 active:scale-[0.98] cursor-pointer">
                Tìm Hiểu Thêm
              </button>
            </div>
          </div>

          <div data-reveal className="hidden lg:flex lg:col-span-5 relative w-full h-[600px] items-center justify-center">
            {/* Glow mềm màu champagne */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#D4AF37] opacity-30 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Ảnh sản phẩm */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/yensaohero.png"
              alt="Yến sào thượng hạng Nutriphar"
              className="w-full h-auto object-contain relative z-10 scale-380 drop-shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
