"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StackingWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context;

    // Give a slight delay to allow layout to settle (especially 3D Canvas) before calculating heights
    const timeoutId = setTimeout(() => {
      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".stacking-panel");
        
        panels.forEach((panel, i) => {
          // Bỏ qua panel cuối cùng để có thể cuộn mượt mà xuống Footer
          if (i === panels.length - 1) return;

          ScrollTrigger.create({
            trigger: panel,
            // Xử lý section dài: Nếu dài hơn màn hình, ghim ở cạnh dưới. Ngược lại ghim ở cạnh trên.
            start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        });
        
        // Cập nhật lại ScrollTrigger sau khi mọi thứ đã render
        ScrollTrigger.refresh();
      }, wrapperRef);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ctx) ctx.revert(); // Đảm bảo khôi phục DOM về nguyên trạng trước khi React unmount
    };
  }, []);

  const panels = React.Children.map(children, (child, i) => {
    return (
      <div 
        className={`stacking-panel relative w-full ${i > 0 ? 'shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.3)]' : ''}`}
        style={{ zIndex: i + 1 }}
      >
        {child}
      </div>
    );
  });

  return (
    <div ref={wrapperRef} className="relative w-full">
      {panels}
    </div>
  );
}
