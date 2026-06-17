"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  className = "w-4 h-4",
  interactive = false,
  onRatingChange
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div 
      className={`flex items-center gap-0.5 ${interactive ? "cursor-pointer" : ""}`}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = hoverRating > 0 ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <Star
            key={i}
            onClick={() => interactive && onRatingChange?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            className={`${className} transition-colors ${
              isFilled 
                ? "fill-[#D4AF37] text-[#D4AF37]" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}
