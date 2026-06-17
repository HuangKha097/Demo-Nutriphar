"use client";

import { Star } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";

interface ReviewSummaryProps {
  averageRating: string;
  totalReviews: number;
  ratingDistribution: { star: number; percentage: number }[];
}

export function ReviewSummary({ averageRating, totalReviews, ratingDistribution }: ReviewSummaryProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xs p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col items-center justify-center shrink-0 min-w-[140px]">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[36px] md:text-[42px] font-bold font-display text-[#1C1C1C] leading-none">
            {averageRating}
          </span>
          <span className="text-[16px] text-gray-400 font-medium">/ 5.0</span>
        </div>
        <StarRating rating={Math.round(Number(averageRating))} className="w-4 h-4 mb-1.5" />
        <span className="text-[12px] text-gray-500 font-body">dựa trên {totalReviews} đánh giá</span>
      </div>
      
      <div className="flex-1 w-full flex flex-col gap-2 max-w-[400px]">
        {ratingDistribution.map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 w-[24px] shrink-0 justify-end">
              <span className="text-[13px] font-bold text-gray-700 leading-none">{star}</span>
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37] mb-0.5" />
            </div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#12224F] rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }} 
              />
            </div>
            <span className="text-[12px] text-gray-500 w-[28px] text-right font-medium shrink-0">
              {percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
