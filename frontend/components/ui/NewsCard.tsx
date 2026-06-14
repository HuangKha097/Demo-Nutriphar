import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  variant?: "featured" | "standard" | "horizontal";
}

export function NewsCard({
  title,
  excerpt,
  image,
  date,
  slug,
  variant = "standard",
}: NewsCardProps) {
  const isFeatured = variant === "featured";
  const isHorizontal = variant === "horizontal";

  return (
    <Link
      href={slug}
      className={`group flex flex-col border border-[#E5E5E5] hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-500 bg-white rounded-xs overflow-hidden ${
        isFeatured ? "h-full" : "h-auto"
      } ${
        isHorizontal ? "md:flex-row" : ""
      }`}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-[#F5F5F5] shrink-0 w-full ${
          isFeatured
            ? "h-[200px] sm:h-[240px] md:h-[260px] lg:h-[300px] border-b border-[#E5E5E5]"
            : isHorizontal
            ? "aspect-[16/10] md:aspect-auto md:w-[160px] lg:w-[190px] md:self-stretch md:border-r md:border-b-0 border-b border-[#E5E5E5]"
            : "h-[140px] sm:h-[160px] md:h-[170px] lg:h-[175px] border-b border-[#E5E5E5]"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 700px"
              : isHorizontal
              ? "(max-width: 768px) 100vw, 200px"
              : "(max-width: 768px) 100vw, 400px"
          }
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />

        {/* Featured Tag */}
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 z-10 rounded-xs shadow-md">
            Tin nổi bật
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`flex flex-col flex-1 ${
          isFeatured ? "p-5 md:p-6" : "p-4 md:p-5"
        }`}
      >
        {/* Date */}
        <time className="text-[12px] text-[#BDBDBD] font-body tracking-wide mb-1.5 block">
          {date}
        </time>

        {/* Title */}
        <h3
          className={`font-bold font-display leading-[1.3] text-[#1C1C1C] group-hover:text-primary transition-colors duration-300 ${
            isFeatured
              ? "text-[18px] md:text-[20px] lg:text-[22px] mb-2.5 line-clamp-2"
              : isHorizontal
              ? "text-[15px] md:text-[16px] mb-1.5 line-clamp-2"
              : "text-[16px] md:text-[18px] mb-2 line-clamp-2"
          }`}
        >
          {title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-[#D4AF37] mb-2.5 transition-all duration-500 group-hover:w-12" />

        {/* Excerpt */}
        <p
          className={`text-[#4A4A4A] leading-[1.6] font-body mb-4 ${
            isFeatured
              ? "text-[14px] line-clamp-3"
              : isHorizontal
              ? "text-[13px] line-clamp-2"
              : "text-[13px] md:text-[14px] line-clamp-2"
          }`}
        >
          {excerpt}
        </p>

        {/* Read more */}
        <span className="mt-auto inline-flex items-center gap-2 text-primary font-semibold text-[13px] font-body group-hover:gap-3 transition-all duration-300">
          Đọc thêm
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
