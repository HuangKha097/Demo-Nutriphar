"use client";

import { ShieldCheck, Heart, Sparkles, Target } from "lucide-react";
import { type CoreValue } from "@/services/api";

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  ShieldCheck,
  Heart,
  Target
};

interface CoreValuesGridProps {
  coreValues: CoreValue[];
}

export function CoreValuesGrid({ coreValues }: CoreValuesGridProps) {
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
          <div className="col-span-1 md:col-span-4 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-center group h-[350px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full relative z-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
                    <Icon1 className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A00] font-body block mb-1">
                      Giá trị cốt lõi
                    </span>
                    <h3 className="text-[20px] sm:text-[24px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                      {val1.title}
                    </h3>
                  </div>
                </div>
                <p className="text-[14.5px] leading-[1.7] text-slate-600 font-body">
                  {val1.description}
                </p>
              </div>
              <div className="h-56 lg:h-full min-h-[220px] w-full rounded-xs overflow-hidden relative group-hover:shadow-md transition-all duration-500">
                <img src="/images/quytrinhsanxuat.jpg" alt={val1.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        )}

        {/* Card 02 - Sidebar: Spans 2 columns on desktop */}
        {val2 && (
          <div className="col-span-1 md:col-span-2 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-5 md:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-[350px]">
            <div className="relative z-10 flex-1 flex flex-col h-full">
              <div className="h-32 w-full rounded-xs overflow-hidden relative group-hover:shadow-md transition-all duration-500 mb-4 shrink-0">
                <img src="/images/khanhhoa-sea.jpg" alt={val2.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
                    <Icon2 className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                    {val2.title}
                  </h3>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-slate-600 font-body line-clamp-3">
                  {val2.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card 03 - Twin Left: Spans 3 columns on desktop */}
        {val3 && (
          <div className="col-span-1 md:col-span-3 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-center group min-h-[240px]">
            <div className="flex flex-col sm:flex-row gap-6 h-full relative z-10 items-center">
              <div className="w-full sm:w-5/12 h-48 sm:h-[180px] rounded-xs overflow-hidden relative group-hover:shadow-md transition-all duration-500 shrink-0">
                <img src="/images/herobackground1.jpg" alt={val3.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-7/12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
                    <Icon3 className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                    {val3.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                  {val3.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card 04 - Twin Right: Spans 3 columns on desktop */}
        {val4 && (
          <div className="col-span-1 md:col-span-3 relative overflow-hidden bg-white border border-[#E5E5E5]/70 rounded-xs p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-center group min-h-[240px]">
            <div className="flex flex-col sm:flex-row-reverse gap-6 h-full relative z-10 items-center">
              <div className="w-full sm:w-5/12 h-48 sm:h-[180px] rounded-xs overflow-hidden relative group-hover:shadow-md transition-all duration-500 shrink-0">
                <img src="/images/vecongty.jpg" alt={val4.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-7/12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
                    <Icon4 className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold font-display text-primary leading-tight uppercase tracking-wide">
                    {val4.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.7] text-slate-600 font-body">
                  {val4.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
