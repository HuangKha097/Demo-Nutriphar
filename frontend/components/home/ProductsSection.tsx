"use client";

import { useState } from "react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";

const categories = ["Tất cả", "Có đường", "Không đường", "Collagen", "Combo"];

const products = [
  {
    name: "Nước Yến Sào Có Đường",
    description: "Yến sào thiên nhiên Nha Trang Khánh Hòa, 300mg tổ yến, hộp 6 lọ 70ml",
    price: "350.000đ",
    originalPrice: "420.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Bán chạy",
    rating: 5,
    reviewCount: 128,
    category: "Có đường",
  },
  {
    name: "Nước Yến Sào Không Đường",
    description: "Dành cho người ăn kiêng & tiểu đường, 300mg tổ yến, hộp 6 lọ 70ml",
    price: "380.000đ",
    originalPrice: "450.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Mới",
    rating: 5,
    reviewCount: 86,
    category: "Không đường",
  },
  {
    name: "Yến Sào Collagen",
    description: "Bổ sung collagen làm đẹp da, 300mg tổ yến + collagen, hộp 6 lọ 70ml",
    price: "420.000đ",
    originalPrice: "520.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Hot",
    rating: 4,
    reviewCount: 64,
    category: "Collagen",
  },
  {
    name: "Combo 3 Hộp Yến Sào",
    description: "Tiết kiệm 20% khi mua combo, tặng kèm 1 lọ yến sào cao cấp",
    price: "999.000đ",
    originalPrice: "1.260.000đ",
    image: "/images/Nuoc-yen-sao-co-duong.png",
    badge: "Tiết kiệm",
    rating: 5,
    reviewCount: 215,
    category: "Combo",
  },
];

export function ProductsSection() {
  const rootRef = useGsapReveal();
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredProducts = activeCategory === "Tất cả"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <Section className="bg-gradient-to-b from-[#FAFAF7] to-[#F5F0E8]">
      <div ref={rootRef as any}>
        <Container>
          {/* Section header */}
          <div data-reveal className="text-center mb-8">
            <span className="inline-block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              Sản phẩm nổi bật
            </span>
            <h2 className="text-[36px] md:text-[48px] font-bold font-display tracking-wide bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Yến Sào DRSANNESTPRO
            </h2>
          </div>

          {/* Category tabs */}
          <div data-reveal className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium font-body transition-all duration-300 ${activeCategory === cat
                    ? "bg-[#D4AF37] text-white shadow-md"
                    : "bg-white text-[#4A4A4A] hover:bg-[#D4AF37]/10 hover:text-[#8C6A00] border border-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <div key={i} data-reveal>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* View all button */}
          <div data-reveal className="flex justify-center mt-10">
            <Button className="px-8 h-[48px] bg-accent hover:bg-[#8B1215] text-white text-[15px] font-medium rounded-full border-none shadow-md transition-all duration-300 flex items-center gap-2">
              Xem tất cả sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Container>
      </div>
    </Section>
  );
}
