"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";

const IMAGES = [
  "/images/vecongty.jpg",
  "/images/quytrinhsanxuat.jpg",
  "/images/khanhhoa-sea.jpg"
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


    </section>
  );
}
