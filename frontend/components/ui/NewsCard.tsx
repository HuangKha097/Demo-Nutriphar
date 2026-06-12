import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

export function NewsCard({ title, excerpt, image, date, slug }: NewsCardProps) {
  return (
    <Link
      href={slug}
      className="group flex flex-col h-full border border-[#E5E5E5] hover:border-[#D4AF37]/40 transition-colors duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#E5E5E5] bg-[#F5F5F5]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-5">
        {/* Date */}
        <time className="text-[13px] text-[#BDBDBD] font-body tracking-wide mb-2">
          {date}
        </time>

        {/* Title */}
        <h3 className="text-[18px] md:text-[20px] font-bold font-display leading-[1.35] text-[#1C1C1C] mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-[#D4AF37] mb-3 transition-all duration-500 group-hover:w-12" />

        {/* Excerpt */}
        <p className="text-[14px] text-[#4A4A4A] leading-[1.7] font-body line-clamp-3 mb-4">
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
