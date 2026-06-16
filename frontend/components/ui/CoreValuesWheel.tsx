"use client";

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
  // Extract individual core values safely
  const val1 = coreValues[0];
  const val2 = coreValues[1];
  const val3 = coreValues[2];
  const val4 = coreValues[3];

  // Map corresponding icons or default to Sparkles/ShieldCheck
  const Icon1 = val1 ? (iconMap[val1.iconName] || Sparkles) : Sparkles;
  const Icon2 = val2 ? (iconMap[val2.iconName] || ShieldCheck) : ShieldCheck;
  const Icon3 = val3 ? (iconMap[val3.iconName] || Heart) : Heart;
  const Icon4 = val4 ? (iconMap[val4.iconName] || Target) : Target;

  return (
    <div className="w-full py-4">
      {/* Bento Grid Layout: 6-column grid on desktop, collapses to single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-6xl mx-auto">
        
        {/* Card 01 - Main Content: Spans 4 columns on desktop */}
        {val1 && (
          <div className="col-span-1 md:col-span-4 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group min-h-[260px]">
            {/* Watermark Number */}
            <span className="absolute top-4 right-6 text-[72px] md:text-[96px] font-bold font-display text-[#D4AF37]/8 leading-none pointer-events-none select-none">
              01
            </span>
            
            {/* Inner Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start h-full">
              {/* Left Column: Title and Icon */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15">
                  <Icon1 className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A00] font-body block mb-1">
                    Giá trị cốt lõi 01
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                    {val1.title}
                  </h3>
                </div>
              </div>
              
              {/* Right Column: Description */}
              <div className="lg:col-span-3 lg:pt-2 flex items-center h-full">
                <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                  {val1.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card 02 - Sidebar: Spans 2 columns on desktop */}
        {val2 && (
          <div className="col-span-1 md:col-span-2 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group min-h-[260px]">
            {/* Watermark Number */}
            <span className="absolute top-4 right-6 text-[72px] md:text-[96px] font-bold font-display text-[#D4AF37]/8 leading-none pointer-events-none select-none">
              02
            </span>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15">
                <Icon2 className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A00] font-body block mb-1">
                  Giá trị cốt lõi 02
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                  {val2.title}
                </h3>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                {val2.description}
              </p>
            </div>
          </div>
        )}

        {/* Card 03 - Twin Left: Spans 3 columns on desktop */}
        {val3 && (
          <div className="col-span-1 md:col-span-3 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group min-h-[260px]">
            {/* Watermark Number */}
            <span className="absolute top-4 right-6 text-[72px] md:text-[96px] font-bold font-display text-[#D4AF37]/8 leading-none pointer-events-none select-none">
              03
            </span>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15">
                <Icon3 className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A00] font-body block mb-1">
                  Giá trị cốt lõi 03
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                  {val3.title}
                </h3>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                {val3.description}
              </p>
            </div>
          </div>
        )}

        {/* Card 04 - Twin Right: Spans 3 columns on desktop */}
        {val4 && (
          <div className="col-span-1 md:col-span-3 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group min-h-[260px]">
            {/* Watermark Number */}
            <span className="absolute top-4 right-6 text-[72px] md:text-[96px] font-bold font-display text-[#D4AF37]/8 leading-none pointer-events-none select-none">
              04
            </span>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15">
                <Icon4 className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A00] font-body block mb-1">
                  Giá trị cốt lõi 04
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                  {val4.title}
                </h3>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                {val4.description}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
