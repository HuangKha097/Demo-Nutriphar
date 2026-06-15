"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Activity, ShieldCheck, BrainCircuit, Wind, Zap, Baby, Bone, Heart } from "lucide-react";

const benefits = [
  {
    icon: Activity,
    title: "Kích Thích Tiêu Hóa",
    description: "Yến sào chứa các loại axit amin thiết yếu, giúp kích thích tiêu hóa, tăng cường khả năng hấp thụ dưỡng chất.",
  },
  {
    icon: ShieldCheck,
    title: "Tăng Cường Chức Năng Gan",
    description: "Hỗ trợ gan giải độc, bảo vệ gan khỏi tổn thương do các tác nhân gây hại như rượu bia, thuốc lá.",
  },
  {
    icon: BrainCircuit,
    title: "Cải Thiện Hệ Thần Kinh",
    description: "Glutamic acid giúp tăng cường trí nhớ. Cải thiện giấc ngủ, giảm căng thẳng, mệt mỏi.",
  },
  {
    icon: Wind,
    title: "Tăng Cường Chức Năng Phổi",
    description: "Giúp cải thiện sức khỏe phổi, đặc biệt tốt cho những người hay bị viêm phổi, hen suyễn.",
  },
  {
    icon: Zap,
    title: "Dinh Dưỡng & Năng Lượng",
    description: "Giúp da dẻ mịn màng, chống lão hóa. Yến sào giúp tóc chắc khỏe, óng mượt.",
  },
  {
    icon: Baby,
    title: "Trẻ Ăn Ngon, Ngủ Ngon",
    description: "Tăng sức đề kháng, tăng cường hệ miễn dịch để trẻ phát triển khoẻ mạnh, thông minh.",
  },
  {
    icon: Bone,
    title: "Sức Khoẻ Xương Khớp",
    description: "Yến sào chứa nhiều canxi, giúp xương chắc khỏe, ngăn ngừa loãng xương, chống viêm khớp.",
  },
  {
    icon: Heart,
    title: "Dinh Dưỡng Cho Bà Bầu",
    description: "Giảm ốm nghén, mệt mỏi. Chứa DHA, canxi, sắt, vitamin… hỗ trợ phát triển trí não thai nhi.",
  },
];

export function BenefitsSection() {
  const leftBenefits = benefits.slice(0, 4);
  const rightBenefits = benefits.slice(4, 8);

  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateLineCoordinates = () => {
      if (!containerRef.current || !centerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();
      
      const x2 = centerRect.left - containerRect.left + centerRect.width / 2;
      const y2 = centerRect.top - containerRect.top + centerRect.height / 2;

      const newLines = benefits.map((_, i) => {
        const iconEl = iconRefs.current[i];
        if (!iconEl) return { x1: 0, y1: 0, x2, y2 };
        const iconRect = iconEl.getBoundingClientRect();
        const x1 = iconRect.left - containerRect.left + iconRect.width / 2;
        const y1 = iconRect.top - containerRect.top + iconRect.height / 2;
        return { x1, y1, x2, y2 };
      });

      setLines(newLines);
    };

    updateLineCoordinates();
    
    // Multiple delayed updates to ensure lines coordinates map perfectly after hydration and layout settle
    const timer1 = setTimeout(updateLineCoordinates, 100);
    const timer2 = setTimeout(updateLineCoordinates, 500);
    const timer3 = setTimeout(updateLineCoordinates, 1500);

    window.addEventListener("resize", updateLineCoordinates);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", updateLineCoordinates);
    };
  }, []);

  return (
    <Section className="bg-background !py-10 md:!py-24 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-mobile {
          0% { transform: translateY(0px) scale(2.0); }
          50% { transform: translateY(-10px) scale(2.0); }
          100% { transform: translateY(0px) scale(2.0); }
        }
        @keyframes float-desktop {
          0% { transform: translateY(0px) scale(2.5); }
          50% { transform: translateY(-20px) scale(2.5); }
          100% { transform: translateY(0px) scale(2.5); }
        }
        .animate-float-mobile {
          animation: float-mobile 4s ease-in-out infinite;
        }
        .animate-float-desktop {
          animation: float-desktop 5s ease-in-out infinite;
        }
      `}} />

      {/* Ánh sáng nền khổng lồ bao trùm */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-[#8C6A00]/5 to-[#D4AF37]/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Container thu hẹp để gom các thẻ gần trung tâm, tránh trôi ra xa mép màn hình */}
      <Container className="relative z-10 max-w-6xl">
        <div ref={containerRef} className="relative w-full">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Công Dụng Chi Tiết
            </h2>
            <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
              Mỗi sản phẩm Nutriphar đều mang lại những lợi ích vượt trội, đáp ứng từng nhu cầu cụ thể của cơ thể bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-center">

            {/* CỘT TRÁI: Bo cong gắt vào trong */}
            <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-16 relative z-30">
              {leftBenefits.map((benefit, index) => {
                // Hàng 1 và 4 đâm sâu vào 160px (translate-x-40)
                // Hàng 2 và 3 lùi ra ngoài một chút (-translate-x-8) để chừa chỗ cho ảnh phình ra
                let curveClass = "";
                if (index === 0 || index === 3) curveClass = "lg:translate-x-40";
                else curveClass = "lg:-translate-x-8";

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group relative flex flex-col items-start lg:items-end text-left lg:text-right transition-all duration-500 bg-white/70 backdrop-blur-[8px] border border-[#EADCCA]/40 shadow-[0_4px_15px_rgba(0,0,0,0.015)] p-5 rounded-[20px] lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:shadow-none w-full max-w-[420px] lg:max-w-[340px] mx-auto ${curveClass}`}
                  >
                    <div className="flex flex-row lg:flex-row-reverse items-center gap-4 mb-3 w-full justify-start lg:justify-start">
                      <div 
                        ref={(el) => { iconRefs.current[index] = el; }}
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 relative z-20"
                      >
                        <benefit.icon className="w-5 h-5 lg:w-7 lg:h-7" />
                      </div>
                      <h3 className="text-[17px] lg:text-[20px] font-bold text-foreground group-hover:text-[#D4AF37] transition-colors relative z-20">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-[14px] lg:text-[15px] leading-relaxed w-full">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CỘT GIỮA: Chứa ảnh sản phẩm nổi bật */}
            <div ref={centerRef} className="order-1 lg:order-2 relative flex justify-center items-center py-8 lg:py-0 w-full max-w-[320px] lg:max-w-[650px] mx-auto z-30">
              <div className="absolute w-[220px] h-[220px] lg:w-[600px] lg:h-[600px] bg-[#D4AF37]/20 rounded-full blur-[60px] lg:blur-[120px] animate-pulse" />
              <div className="absolute w-[240px] h-[240px] lg:w-[650px] lg:h-[650px] border-[2px] border-dashed border-[#D4AF37]/50 rounded-full animate-[spin_80s_linear_infinite]" />
              <div className="absolute w-[200px] h-[200px] lg:w-[580px] lg:h-[580px] border-[1px] border-[#D4AF37]/30 rounded-full" />
              <div className="absolute w-[160px] h-[160px] lg:w-[500px] lg:h-[500px] border-[1px] border-[#8C6A00]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

              {/* Hình ảnh khổng lồ - sử dụng animation responsive tương ứng cho mobile / desktop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/yensao.png"
                alt="Yến sào thượng hạng Nutriphar"
                className="relative z-10 w-[95%] lg:w-[110%] h-auto object-contain drop-shadow-[0_20px_40px_rgba(212,175,55,0.3)] lg:drop-shadow-[0_30px_60px_rgba(212,175,55,0.5)] animate-float-mobile lg:animate-float-desktop pointer-events-none"
              />
            </div>

            {/* CỘT PHẢI: Bo cong gắt vào trong */}
            <div className="order-3 lg:order-3 flex flex-col gap-6 lg:gap-16 relative z-30">
              {rightBenefits.map((benefit, index) => {
                // Đối xứng với bên trái
                let curveClass = "";
                if (index === 0 || index === 3) curveClass = "lg:-translate-x-40";
                else curveClass = "lg:translate-x-8";

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index + 4)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group flex flex-col items-start text-left transition-all duration-500 bg-white/70 backdrop-blur-[8px] border border-[#EADCCA]/40 shadow-[0_4px_15px_rgba(0,0,0,0.015)] p-5 rounded-[20px] lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:shadow-none w-full max-w-[420px] lg:max-w-[340px] mx-auto ${curveClass}`}
                  >
                    <div className="flex flex-row items-center gap-4 mb-3 w-full justify-start">
                      <div 
                        ref={(el) => { iconRefs.current[index + 4] = el; }}
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 relative z-20"
                      >
                        <benefit.icon className="w-5 h-5 lg:w-7 lg:h-7" />
                      </div>
                      <h3 className="text-[17px] lg:text-[20px] font-bold text-foreground group-hover:text-[#D4AF37] transition-colors relative z-20">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-[14px] lg:text-[15px] leading-relaxed w-full">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* SVG các đường kẻ nối từ tâm ảnh ra các công dụng */}
          {lines.length > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-20">
              <defs>
                <linearGradient id="line-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8C6A00" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="line-grad-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8C6A00" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {lines.map((line, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <g key={i}>
                    {/* Đường viền phát sáng khi hover */}
                    {isHovered && (
                      <line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="#D4AF37"
                        strokeWidth={4}
                        strokeLinecap="round"
                        opacity={0.35}
                        filter="url(#glow)"
                      />
                    )}
                    {/* Đường kết nối chính */}
                    <line
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={isHovered ? "url(#line-grad-active)" : "url(#line-grad-inactive)"}
                      strokeWidth={isHovered ? 2 : 1}
                      strokeDasharray={isHovered ? "none" : "5 5"}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                    {/* Hạt tròn sáng chạy dọc từ tâm ảnh (x2, y2) ra các công dụng (x1, y1) */}
                    <circle
                      r={isHovered ? 5.5 : 3.5}
                      fill="#D4AF37"
                      opacity={isHovered ? 1 : 0.45}
                      filter={isHovered ? "url(#glow)" : undefined}
                    >
                      <animate
                        attributeName="cx"
                        from={line.x2}
                        to={line.x1}
                        dur={isHovered ? "1.8s" : "4s"}
                        repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                      />
                      <animate
                        attributeName="cy"
                        from={line.y2}
                        to={line.y1}
                        dur={isHovered ? "1.8s" : "4s"}
                        repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>
          )}

        </div>
      </Container>
    </Section>
  );
}