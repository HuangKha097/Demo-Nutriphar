"use client";

import { useState } from "react";
import { ShieldCheck, Heart, Sparkles, Target } from "lucide-react";
import { type CoreValue } from "@/services/api";

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  ShieldCheck,
  Heart,
  Target
};

interface CoreValuesWheelProps {
  coreValues: CoreValue[];
}

export function CoreValuesWheel({ coreValues }: CoreValuesWheelProps) {
  // Initially activeIndex is 3 (index of "Đột Phá Nghiên Cứu" - bottom right quadrant)
  // to match the user's sketch of the exploded slice
  const [activeIndex, setActiveIndex] = useState<number>(3);

  const activeValue = coreValues[activeIndex];
  const ActiveIcon = activeValue ? (iconMap[activeValue.iconName] || ShieldCheck) : ShieldCheck;

  // Configurations for each quadrant
  const quadrants = [
    {
      index: 0,
      label: "01",
      roundedClass: "rounded-tl-full",
      activeTransform: "-translate-x-4 -translate-y-4 border-[#D4AF37] bg-[#1A2F6B] text-white shadow-xl scale-[1.02]",
      inactiveTransform: "translate-x-0 translate-y-0 bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#D4AF37]/50 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-md",
      contentAlign: "justify-end items-end pb-8 pr-8"
    },
    {
      index: 1,
      label: "02",
      roundedClass: "rounded-tr-full",
      activeTransform: "translate-x-4 -translate-y-4 border-[#D4AF37] bg-[#1A2F6B] text-white shadow-xl scale-[1.02]",
      inactiveTransform: "translate-x-0 translate-y-0 bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#D4AF37]/50 hover:translate-x-2 hover:-translate-y-2 hover:shadow-md",
      contentAlign: "justify-end items-start pb-8 pl-8"
    },
    {
      index: 2,
      label: "03",
      roundedClass: "rounded-bl-full",
      activeTransform: "-translate-x-4 translate-y-4 border-[#D4AF37] bg-[#1A2F6B] text-white shadow-xl scale-[1.02]",
      inactiveTransform: "translate-x-0 translate-y-0 bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#D4AF37]/50 hover:-translate-x-2 hover:translate-y-2 hover:shadow-md",
      contentAlign: "justify-start items-end pt-8 pr-8"
    },
    {
      index: 3,
      label: "04",
      roundedClass: "rounded-br-full",
      activeTransform: "translate-x-4 translate-y-4 border-[#D4AF37] bg-[#1A2F6B] text-white shadow-xl scale-[1.02]",
      inactiveTransform: "translate-x-0 translate-y-0 bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#D4AF37]/50 hover:translate-x-2 hover:translate-y-2 hover:shadow-md",
      contentAlign: "justify-start items-start pt-8 pl-8"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      {/* Left Column: Interactive Quadrant Wheel */}
      <div className="lg:col-span-6 flex justify-center items-center py-8">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px] grid grid-cols-2 grid-rows-2 gap-2.5 select-none">
          
          {/* Centered Brand Emblem Ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FAFAF7] border-2 border-[#D4AF37] flex items-center justify-center z-20 shadow-md">
            <span className="font-display font-bold text-xs text-[#D4AF37] tracking-widest">NTP</span>
          </div>

          {quadrants.map((quad) => {
            const value = coreValues[quad.index];
            if (!value) return null;
            const Icon = iconMap[value.iconName] || ShieldCheck;
            const isActive = activeIndex === quad.index;

            return (
              <button
                key={quad.index}
                onClick={() => setActiveIndex(quad.index)}
                onMouseEnter={() => setActiveIndex(quad.index)}
                className={`relative flex flex-col p-4 sm:p-6 w-full h-full border transition-all duration-500 ease-out cursor-pointer ${quad.roundedClass} ${quad.contentAlign} ${
                  isActive ? quad.activeTransform : quad.inactiveTransform
                }`}
                aria-label={`Giá trị cốt lõi ${quad.label}: ${value.title}`}
              >
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500 ${isActive ? "text-[#D4AF37]" : "text-[#D4AF37]"}`} strokeWidth={1.5} />
                  <span className="text-[11px] sm:text-[12.5px] font-bold font-display uppercase tracking-wider block leading-tight max-w-[110px] sm:max-w-[130px]">
                    {value.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] opacity-60 font-body tracking-wider">{quad.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Display Active Core Value Description Card */}
      <div className="lg:col-span-6 flex flex-col justify-center min-h-[280px] p-6 sm:p-10 bg-white border border-[#E5E5E5]/80 rounded-xs shadow-xs relative overflow-hidden transition-all duration-500 hover:shadow-md">
        
        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />

        {activeValue && (
          <div key={activeIndex} className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E0F1FC] text-primary flex items-center justify-center">
                <ActiveIcon className="w-5 h-5 text-primary" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] font-body">
                GIÁ TRỊ CỐT LÕI 0{activeIndex + 1} / 04
              </span>
            </div>
            
            <h3 className="text-[24px] sm:text-[32px] font-bold font-display text-primary leading-tight">
              {activeValue.title}
            </h3>

            {/* Decorative line */}
            <div className="h-[2px] w-12 bg-[#D4AF37] rounded-full" />

            <p className="text-[15px] sm:text-[16px] leading-[1.8] text-neutral-700 font-body mt-2">
              {activeValue.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
