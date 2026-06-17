"use client";

import { useState, useCallback } from "react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Mình dùng yến sào Nutriphar được 3 tháng rồi, sức khỏe cải thiện rõ rệt. Công việc văn phòng áp lực khiến mình hay bị stress và khó ngủ, nhưng từ khi duy trì thói quen chưng yến mỗi tuần, mình thấy cơ thể nhẹ nhõm hẳn. Da dẻ cũng trở nên hồng hào, căng mịn hơn trước rất nhiều. Thực sự đây là một khoản đầu tư vô cùng xứng đáng cho sức khoẻ bản thân và gia đình. Sản phẩm đóng gói đẹp mắt, chất lượng thì cực kỳ xuất sắc, mình sẽ tiếp tục ủng hộ lâu dài!",
    name: "Chị Nguyễn Thị Mai",
    title: "Khách hàng tại TP. Hồ Chí Minh",
    image: "/images/customer1.jpg",
  },
  {
    quote:
      "Tôi mua yến sào Nutriphar tặng ba mẹ dịp Tết vừa rồi, hai người dùng đều khen nức nở vì yến nở to và thơm tự nhiên. Đặc biệt là ba tôi từng bị di chứng hậu Covid khiến phổi yếu và hay ho khan về đêm. Sau khoảng hơn một tháng dùng yến chưng thường xuyên, những cơn ho đã thuyên giảm đáng kể, ông ăn uống ngon miệng và lên cân lại. Nhìn thấy sức khỏe ba mẹ ngày một tốt lên là niềm vui lớn lao của con cái. Vô cùng biết ơn Nutriphar đã mang đến một sản phẩm thực sự tuyệt vời!",
    name: "Anh Trần Văn Hùng",
    image: "/images/customer3.webp",
    title: "Khách hàng tại Khánh Hòa",
  },
  {
    quote:
      "Mình đang mang thai bé thứ hai ở tháng thứ 5, cơ thể thường xuyên đau nhức và thai nghén mệt mỏi rã rời. Được một chị bạn đồng nghiệp giới thiệu dùng thử yến sào Nutriphar, ban đầu mình cũng chần chừ nhưng khi trải nghiệm thì hoàn toàn bị thuyết phục. Yến có vị rất thanh, không bị tanh như một số loại khác mình từng thử, cực kỳ phù hợp với mẹ bầu. Mình cảm thấy cơ thể dồi dào năng lượng hơn hẳn, bé trong bụng cũng phát triển vượt chuẩn. Chắc chắn sẽ mua thêm để dùng dài lâu!",
    name: "Chị Phạm Thanh Hương",
    title: "Khách hàng tại Hà Nội",
    image: "/images/customer2.jpg",
  },
  {
    quote:
      "Tôi vốn bị chứng mất ngủ mãn tính hành hạ suốt nhiều năm nay, đêm nào cũng trằn trọc đến 2-3 giờ sáng mới chợp mắt. Từ ngày con gái đi làm mua biếu hộp yến tinh chế Nutriphar thượng hạng, tôi chưng dùng kiên trì mỗi tuần 3 lần thì thấy phép màu thực sự xảy ra. Tôi ngủ sâu giấc hơn hẳn, không còn bị giật mình nửa đêm, sáng dậy đầu óc tỉnh táo và không hề uể oải. Thêm vào đó, chứng trào ngược dạ dày cũng thuyên giảm rất nhiều. Quả là tiền nào của nấy.",
    name: "Bác Lê Văn Sơn",
    title: "Khách hàng tại Đà Nẵng",
    image: "/images/customer1.jpg",
  },
  {
    quote:
      "Là một người nội trợ cực kỳ kỹ tính trong việc chọn lựa thực phẩm tẩm bổ cho tổ ấm, điều mình ấn tượng đặc biệt ở Nutriphar chính là độ tinh khiết hoàn hảo. Từng sợi yến luôn nở cực kỳ to, khi chưng lên rất dôi, nước trong vắt và đặc biệt là giữ nguyên được độ dai giòn rụm sần sật vô cùng hấp dẫn. Cả nhà mình từ ông bà nội đến mấy đứa nhỏ ai cũng mê tít món yến chưng hạt sen táo đỏ. Mình hoàn toàn tin tưởng chất lượng của Nutriphar.",
    name: "Chị Trần Ngọc Hà",
    title: "Khách hàng tại Cần Thơ",
    image: "/images/customer3.webp",
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
          {/* Section header — centered, matching wireframe */}
          <div data-reveal className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Cảm Nhận Khách Hàng
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Những đánh giá chân thực và trải nghiệm thực tế từ các khách hàng đã và đang tin dùng yến sào Nutriphar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* Left: Content */}
            <div data-reveal>

              {/* Quote */}
              <div className="relative mb-8">
                {/* Opening quote */}
                <Quote className="w-10 h-10 text-[#D4AF37] mb-4 fill-[#D4AF37]" />

                <p className="text-[16px] lg:text-[17px] leading-[1.8] text-[#4A4A4A] font-body min-h-[120px] italic">
                  "{t.quote}"
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
