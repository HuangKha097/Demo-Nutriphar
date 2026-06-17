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
  return (
    <div className={`flex items-center gap-0.5 ${interactive ? "cursor-pointer" : ""}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          onClick={() => interactive && onRatingChange?.(i + 1)}
          className={`${className} transition-colors ${
            i < rating 
              ? "fill-[#D4AF37] text-[#D4AF37]" 
              : "fill-gray-200 text-gray-200"
          } ${interactive ? "hover:fill-[#D4AF37] hover:text-[#D4AF37]" : ""}`}
        />
      ))}
    </div>
  );
}
