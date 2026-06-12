"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
    <section ref={rootRef} className="relative w-full min-h-[94vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/herobackground.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.85]"
        />
        {/* Phủ gradient tách chữ khỏi nền tre */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(90deg, rgba(38, 23, 14, 0.72) 0%, rgba(38, 23, 14, 0.48) 38%, rgba(38, 23, 14, 0.08) 68%)"
          }}
        ></div>
      </div>

      {/* Lá dứa trang trí góc phải (Đã bọc thêm div để animate) */}


      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20 lg:pt-0">

          {/* Cột trái: Nội dung */}
          <div className="lg:col-span-7 pb-20 lg:py-0 text-center lg:text-left">
            <span data-reveal className="block text-[#D4AF37] font-semibold tracking-widest uppercase mb-4 text-[14px]">
              Thương hiệu yến sào cao cấp
            </span>
            <h1 data-reveal className="text-[48px] lg:text-[64px] font-semibold text-[#FFF6E8] mb-6 font-display leading-[1.15]">
              Món Quà Đến Từ <br /> Thiên Nhiên
            </h1>
            <p data-reveal className="text-[17px] lg:text-[18px] leading-[1.7] text-[#EADCCA] max-w-[580px] mx-auto lg:mx-0 mb-10 font-body">
              Nutriphar tự hào mang đến dòng yến sào thượng hạng được khai thác từ biển Khánh Hòa. Hòa quyện cùng công nghệ bảo quản tối ưu, giữ trọn vẹn dưỡng chất thiên nhiên cho sức khỏe gia đình bạn.
            </p>

            <div data-reveal className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-[#A4161A] hover:bg-[#D7263D] text-white font-medium text-[15px] lg:text-[16px] px-8 h-[52px] rounded-full border-none shadow-lg">
                Mua Ngay
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-[#D4AF37] border-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1C1C] font-medium text-[15px] lg:text-[16px] px-8 h-[52px] rounded-full transition-all">
                Tìm Hiểu Thêm
              </Button>
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
