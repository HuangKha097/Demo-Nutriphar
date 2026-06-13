"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Activity, ShieldCheck, BrainCircuit, Wind, Zap, Baby, Bone, Heart, ChevronDown } from "lucide-react";
import { useState } from "react";

const benefits = [
  {
    icon: Activity,
    title: "Kích Thích Tiêu Hóa",
    description: "Yến sào chứa các loại axit amin thiết yếu, giúp kích thích tiêu hóa, tăng cường khả năng hấp thụ dưỡng chất. Hỗ trợ điều trị các bệnh lý về đường tiêu hóa, như viêm loét dạ dày, tá tràng, viêm đại tràng,…",
  },
  {
    icon: ShieldCheck,
    title: "Tăng Cường Chức Năng Gan",
    description: "Hỗ trợ gan giải độc gan, bảo vệ gan khỏi tổn thương do các tác nhân gây hại như rượu bia, thuốc lá, và các chất độc hại khác.",
  },
  {
    icon: BrainCircuit,
    title: "Cải Thiện Hệ Thần Kinh",
    description: "Glutamic acid trong yến sào giúp tăng cường trí nhớ, khả năng ghi nhớ. Yến sào giúp cải thiện giấc ngủ, giảm căng thẳng, mệt mỏi, giúp não bộ hoạt động tốt hơn.",
  },
  {
    icon: Wind,
    title: "Tăng Cường Chức Năng Phổi",
    description: "Những người có chức năng phổi kém, hay bị viêm phổi, hen suyễn, hoặc ung thư phổi nên sử dụng tổ yến thường xuyên để giúp cải thiện sức khỏe phổi.",
  },
  {
    icon: Zap,
    title: "Dinh Dưỡng Và Năng Lượng",
    description: "Giúp da dẻ mịn màng, tươi trẻ, chống lão hóa. Giúp giảm mụn, nám, tàn nhang. Yến sào giúp tóc chắc khỏe, óng mượt.",
  },
  {
    icon: Baby,
    title: "Giúp Trẻ Ăn Ngon, Ngủ Ngon",
    description: "Tăng sức đề kháng, tăng cường hệ miễn dịch để trẻ phát triển khoẻ mạnh, Thông minh. Bổ sung thêm nguồn dinh dưỡng giúp bé phát triển tốt về hệ xương, trí não, hệ tiêu hoá,…",
  },
  {
    icon: Bone,
    title: "Tăng Cường Sức Khoẻ Xương Khớp",
    description: "Kết hợp nhũ hương cùng Yến sào chứa nhiều canxi, giúp xương chắc khỏe, ngăn ngừa loãng xương. Yến sào chứa nhiều chất chống oxy hóa, giúp chống lại các tác nhân gây viêm, đau khớp.",
  },
  {
    icon: Heart,
    title: "Dinh Dưỡng Cho Bà Bầu Và Thai",
    description: "Tăng cường sức đề kháng, giúp giảm căng thẳng, mệt mỏi, giảm ốm nghén. Chứa protein, canxi, sắt, vitamin,…giúp bổ sung dinh dưỡng cho thai nhi. Yến sào chứa nhiều DHA Hỗ trợ phát triển trí não thai nhi……",
  },
];

export function BenefitsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleBenefit = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Section className="bg-background !py-10 md:!py-14">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
            Công Dụng Chi Tiết
          </h2>
          <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
            Mỗi sản phẩm Nutriphar đều mang lại những lợi ích vượt trội, đáp ứng từng nhu cầu cụ thể của cơ thể bạn.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 xl:gap-24 items-center">
          {/* Cột trái: Ảnh sản phẩm */}
          <div className="w-full md:w-[40%] relative h-[400px] lg:h-[600px] flex items-center justify-center shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/yensao.png"
              alt="Yến sào thượng hạng Nutriphar"
              className="w-full h-auto object-contain relative z-10 scale-440"
            />
          </div>

          {/* Cột phải: Danh sách công dụng */}
          <div className="w-full md:w-[60%] flex flex-col gap-y-2 lg:gap-y-3 relative z-20">
            {benefits.map((benefit, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div key={index} className="group flex flex-col border-b border-border/40 pb-2 last:border-0 last:pb-0">
                  <h3 
                    onClick={() => toggleBenefit(index)}
                    className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-foreground relative pl-6 transition-colors hover:text-primary py-3 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center">
                      <span className={`absolute left-0 top-[23px] lg:top-[24px] w-2 h-2 rounded-full bg-primary transition-transform duration-300 ${
                        isExpanded ? "scale-125 bg-accent" : "group-hover:scale-125"
                      }`} />
                      {benefit.title}
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-accent" : "group-hover:text-primary"
                      }`} 
                    />
                  </h3>
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded 
                        ? "grid-rows-[1fr] opacity-100" 
                        : "grid-rows-[0fr] opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground text-[15px] leading-[1.7] pl-6 pb-3">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
