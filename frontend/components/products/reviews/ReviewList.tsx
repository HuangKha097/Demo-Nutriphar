"use client";

import { Star } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Review } from "@/services/api";

interface ReviewListProps {
  totalReviews: number;
  filteredReviews: Review[];
  allReviewsCount: number;
  filterRating: number | null;
  setFilterRating: (rating: number | null) => void;
}

export function ReviewList({ 
  totalReviews, 
  filteredReviews, 
  allReviewsCount, 
  filterRating, 
  setFilterRating 
}: ReviewListProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  };

  return (
    <div className="lg:col-span-7 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pt-1">
        <h3 className="text-[16px] md:text-[18px] font-bold font-display text-[#1C1C1C]">
          Đánh giá từ khách hàng ({totalReviews})
        </h3>
        
        {/* Filter */}
        {allReviewsCount > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap transition-colors ${
                filterRating === null 
                  ? "bg-[#12224F] text-white shadow-sm" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {[5, 4, 3, 2, 1].map(star => (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                className={`flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap transition-colors ${
                  filterRating === star 
                    ? "bg-[#12224F] text-white shadow-sm" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {star} <Star className={`w-3 h-3 ${filterRating === star ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-400 fill-gray-400"}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {allReviewsCount === 0 ? (
        <div className="text-gray-500 py-8 text-[13px] text-center border border-dashed border-[#E5E5E5] rounded-xs bg-white">
          Chưa có đánh giá nào cho sản phẩm này.<br />Hãy là người đầu tiên đánh giá!
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-gray-500 py-8 text-[13px] text-center border border-dashed border-[#E5E5E5] rounded-xs bg-white">
          Không có đánh giá {filterRating} sao nào.
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white border border-[#E5E5E5]/80 rounded-xs p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-bold text-[#1C1C1C] font-body text-[14px]">{review.userName}</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">{formatDate(review.date)}</span>
                </div>
                <StarRating rating={review.rating} className="w-3 h-3 mt-1" />
              </div>
              <p className="text-[#4A4A4A] text-[13.5px] leading-[1.5]">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
