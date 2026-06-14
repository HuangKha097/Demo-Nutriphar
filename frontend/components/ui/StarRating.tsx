import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, className = "w-4 h-4" }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < rating ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
