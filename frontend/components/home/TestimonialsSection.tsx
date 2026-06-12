"use client";

import { useState, useCallback } from "react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Mình dùng yến sào Nutriphar được 3 tháng rồi, sức khỏe cải thiện rõ rệt. Da dẻ mịn màng hơn, ngủ ngon hơn. Sản phẩm chất lượng thật sự, mình rất hài lòng và sẽ tiếp tục ủng hộ!",
    name: "Chị Nguyễn Thị Mai",
    title: "Khách hàng tại TP. Hồ Chí Minh",
    image: "/images/customer1.jpg",
  },
  {
    quote:
      "Tôi mua yến sào Nutriphar tặng ba mẹ, hai người dùng đều khen ngon và thấy khỏe hơn. Đặc biệt là ba tôi bị yếu phổi, sau khi dùng thường xuyên đã cải thiện đáng kể. Cảm ơn Nutriphar!",
    name: "Anh Trần Văn Hùng",
    image: "/images/customer3.webp",
    title: "Khách hàng tại Khánh Hòa",
  },
  {
    quote:
      "Mình đang mang thai tháng thứ 5, được bạn giới thiệu dùng yến sào Nutriphar. Vị rất thơm ngon, dễ uống. Mình cảm thấy ít mệt mỏi hơn nhiều so với trước. Sẽ giới thiệu cho các mẹ bầu khác!",
    name: "Chị Phạm Thanh Hương",
    title: "Khách hàng tại Hà Nội",
    image: "/images/customer2.jpg",
  },
];

export function TestimonialsSection() {
  const rootRef = useGsapReveal();
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const t = testimonials[current];
  const progress = ((current + 1) / testimonials.length) * 100;

  return (
    <Section className="bg-gradient-to-br from-[#FFF9EE] via-[#FAFAF7] to-[#F5ECD7]">
      <div ref={rootRef as any}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* Left: Content */}
            <div data-reveal>
              {/* Section label & title */}
              <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
                Khách hàng nói gì
              </span>
              <h2 className="text-[36px] md:text-[48px] font-bold font-display tracking-wide mb-10 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
                Cảm Nhận Khách Hàng
              </h2>

              {/* Quote */}
              <div className="relative mb-8">
                {/* Opening quote */}
                <Quote className="w-10 h-10 text-[#D4AF37] mb-4 fill-[#D4AF37]" />

                <p className="text-[16px] lg:text-[17px] leading-[1.8] text-[#4A4A4A] font-body min-h-[120px]">
                  {t.quote}
                </p>

                {/* Closing quote */}
                <Quote className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37] mt-4 ml-auto rotate-180" />
              </div>

              {/* Author */}
              <div className="mb-8">
                <p className="text-[16px] font-bold text-[#1C1C1C] font-display">
                  {t.name}
                </p>
                <p className="text-[14px] text-[#4A4A4A] font-body">
                  {t.title}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                {/* Arrows */}
                <button
                  onClick={goPrev}
                  className="w-[44px] h-[44px] flex items-center justify-center bg-accent hover:bg-[#8B1215] text-white transition-all duration-300 rounded-full shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  className="w-[44px] h-[44px] flex items-center justify-center bg-accent hover:bg-[#8B1215] text-white transition-all duration-300 rounded-full shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-[3px] bg-gray-200 rounded-full overflow-hidden ml-2">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div data-reveal className="relative flex flex-col">
              <div className="rounded-xs overflow-hidden   h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === current
                      ? "w-3 h-3 bg-[#D4AF37]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </Container>
      </div>
    </Section>
  );
}
