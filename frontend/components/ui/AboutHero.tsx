"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";

const IMAGES = [
  "/images/vecongty.jpg",
  "/images/quytrinhsanxuat.jpg",
  "/images/herobackground.jpg"
];

export function AboutHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[55vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow (Full Width) */}
      <div className="absolute inset-0 z-0">
        {IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Nutriphar company banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      <Container className="relative z-20 text-center text-white">
        <div className="max-w-3xl mx-auto animate-fade-in">

          <h1 className="text-[36px] md:text-[52px] font-bold font-display uppercase tracking-wide bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent leading-[1.2] mb-4">
            Kiến Tạo Sức Khỏe Bền Vững
          </h1>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
          </div>
          <p className="text-[14.5px] md:text-[16.5px] text-white/95 leading-[1.8] max-w-2xl mx-auto font-body font-light drop-shadow-sm">
            Công ty Cổ phần Dược phẩm Nutriphar tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên, bảo toàn dưỡng chất tự nhiên hoàn hảo nhất cho người sử dụng.
          </p>
        </div>
      </Container>
    </section>
  );
}
