"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/product-page-banner1.png",
    alt: "Nutriphar Premium Products Banner 1",
  },
  {
    src: "/images/product-page-banner2.svg",
    alt: "Nutriphar Premium Products Banner 2",
  },
  {
    src: "/images/product-page-banner3.svg",
    alt: "Nutriphar Premium Products Banner 3",
  },
  {
    src: "/images/product-page-banner4.jpg",
    alt: "Nutriphar Premium Products Banner 4",
  },
];

export function ProductsBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Reset autoplay timer when current slide changes or pause state changes
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [nextSlide, isPaused, currentSlide]);

  return (
    <div
      className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[540px] overflow-hidden group select-none bg-[#0e1a38]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Premium dark gradient shadow at the top for header text legibility */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E1C42]/95 via-[#0E1C42]/55 to-transparent z-20 pointer-events-none" />

      {/* Carousel Slides */}
      <div className="relative w-full h-full z-0">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 z-10 scale-100"
                  : "opacity-0 z-0 scale-95 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center w-full h-full"
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/55 text-white hover:scale-105 active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 duration-300 backdrop-blur-sm cursor-pointer shadow-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/55 text-white hover:scale-105 active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 duration-300 backdrop-blur-sm cursor-pointer shadow-md"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation Indicators (Dots) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-300 cursor-pointer ${
                isActive ? "w-6 bg-[#D4AF37] rounded-full" : "w-2 bg-white/60 hover:bg-white rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
