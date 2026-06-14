"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { StarRating } from "@/components/ui/StarRating";
import { useToast } from "@/context/ToastContext";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  priceVal: number;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badge,
  rating = 5,
  reviewCount = 0,
  priceVal,
}: ProductCardProps) {
  const { success: showSuccessToast } = useToast();
  return (
    <Link
      href={`/products/${id}`}
      className="group relative flex flex-col rounded-xs overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-1 h-full"
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#A4161A] to-[#D7263D] rounded-full shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#FFF9EE] to-[#FFF3D6]">
        {/* Subtle glow behind product */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60%] h-[60%] bg-[#D4AF37] opacity-[0.08] blur-[40px] rounded-full" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Quick action overlay */}
        <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <StarRating rating={rating} className="w-3.5 h-3.5" />
            {reviewCount > 0 && (
              <span className="text-[12px] text-gray-400 font-body">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="text-[15px] lg:text-[16px] font-semibold text-[#1C1C1C] mb-1 font-display leading-tight line-clamp-2 group-hover:text-[#8C6A00] transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-gray-500 font-body leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[12px] text-gray-400 line-through font-body">
                {originalPrice}
              </span>
            )}
            <span className="text-[18px] lg:text-[20px] font-bold text-[#A4161A] font-display">
              {price}
            </span>
          </div>

          <span
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              
              const defaultSize = name.toLowerCase().includes("hũ") || description.toLowerCase().includes("hũ")
                ? "Hộp 6 hũ"
                : "Hộp 50g";

              const existing = localStorage.getItem("cart");
              const cart = existing ? JSON.parse(existing) : [];
              const existingItemIndex = cart.findIndex(
                (item: any) => item.id === id && item.size === defaultSize
              );

              if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
              } else {
                cart.push({
                  id,
                  name,
                  price,
                  priceVal,
                  image,
                  size: defaultSize,
                  quantity: 1
                });
              }

              localStorage.setItem("cart", JSON.stringify(cart));
              window.dispatchEvent(new Event("cart-updated"));
              showSuccessToast(`Đã thêm thành công 1 ${defaultSize} của "${name}" vào giỏ hàng!`);
            }}
            className="flex items-center justify-center gap-2 px-4 h-[40px] bg-accent hover:bg-[#D7263D] text-white text-[13px] font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Mua</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
