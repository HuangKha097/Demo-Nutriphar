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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Semi-transparent dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <Container className="relative z-20 text-center text-white">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-4 font-body">
            Nutriphar Story
          </span>
          <h1 className="text-[36px] md:text-[52px] font-bold font-display tracking-wide text-[#F4D88A] leading-[1.2] mb-6 drop-shadow-md">
            Kiến Tạo Sức Khỏe Bền Vững
          </h1>
          <p className="text-[14.5px] md:text-[16.5px] text-white/95 leading-[1.8] max-w-2xl mx-auto font-body font-light drop-shadow-sm">
            Công ty Cổ phần Dược phẩm Nutriphar tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên, bảo toàn dưỡng chất tự nhiên hoàn hảo nhất cho người sử dụng.
          </p>
        </div>
      </Container>
    </section>
  );
}
