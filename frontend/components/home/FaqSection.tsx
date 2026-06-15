"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heart } from "lucide-react";

const highlights = [
  {
    title: "Thương Hiệu",
    description:
      "Nhãn hàng DRSANNESTPRO® ghi dấu ấn mạnh mẽ trong lĩnh vực Yến sào với khách hàng Việt trong suốt 10 năm qua.",
  },
  {
    title: "Chất Lượng - Uy Tín",
    description:
      'Luôn đáp ứng tiêu chuẩn thực phẩm bổ sung - là sản phẩm uy tín được khách hàng đón nhận trên toàn quốc. Với phương châm giữ vững chữ TÂM và TÍN để mãi luôn đồng hành cùng khách hàng, Nutriphar mong muốn mang đến những sản phẩm tốt nhất tới tận tay người dùng.',
  },
  {
    title: "Nha Trang - Khánh Hòa",
    description:
      "Tất cả các loại yến tươi chưng sẵn được sản xuất tại Nha Trang - Khánh Hòa với nguyên liệu từ thiên nhiên. Sản phẩm được tạo nên từ công nghệ máy móc hiện đại, khai thác và bảo tồn môi trường sống của Yến. Từ khâu sản xuất đã được nâng niu bởi những người thợ lành nghề đến hệ thống phân phối cả nước. Nutriphar mong muốn sẽ truyền tải được thông điệp của sản phẩm với cả sự trân trọng, tình yêu khi được chọn làm quà tặng cũng như bồi bổ sức khỏe.",
  },
];

export function FaqSection() {
  const rootRef = useGsapReveal();

  return (
    <Section className="bg-background text-foreground">
      <div ref={rootRef as any} className="relative z-10">
        <Container>
          {/* Section title — centered, matching wireframe */}
          <div data-reveal className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Nước Yến Sào Nutriphar
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Giá trị vàng cho sức khỏe gia đình từ nguồn yến sào thiên nhiên bổ dưỡng tinh chế khép kín.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <div
                key={i}
                data-reveal
                className={`flex gap-6 items-start bg-white/80 backdrop-blur-sm rounded-xs p-6 md:p-8 border border-primary/10 shadow-md ${i === highlights.length - 1 ? "md:col-span-2" : ""
                  }`}
              >
                {/* Heart icon */}
                <div className="shrink-0 mt-1">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Heart className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[22px] md:text-[26px] font-bold font-display uppercase tracking-wide mb-3 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
