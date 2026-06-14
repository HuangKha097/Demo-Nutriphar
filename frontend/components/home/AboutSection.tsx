"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  const rootRef = useGsapReveal();

  return (
    <Section className="bg-gradient-to-br from-[#FFF9EE] via-[#FFF6E8] to-[#F5ECD7]">
      <div ref={rootRef as any}>
        <Container>
          {/* Top: Title & Subtitle */}
          <div data-reveal className="mb-10">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              About Nutriphar
            </span>
            <h2 className="text-[36px] md:text-[48px] font-bold font-display tracking-wide bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Về Công Ty Nutriphar
            </h2>
          </div>

          {/* Content area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Image */}
            <div data-reveal className="overflow-hidden relative z-10 max-h-[420px] aspect-[4/3] lg:aspect-auto lg:h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Ve-Yen-Thi-Web.png"
                alt="Về Công Ty Nutriphar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Text + Hotline + Button */}
            <div data-reveal className="flex flex-col justify-center">
              <p className="text-[16px] lg:text-[17px] leading-[1.8] text-[#4A4A4A] font-body mb-6">
                <span className="font-bold text-accent">Công ty Cổ phần Dược phẩm Nutriphar</span> tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên. Với sứ mệnh &quot;Kiến tạo sức khỏe bền vững cho cộng đồng&quot;, chúng tôi cam kết mang đến những sản phẩm chất lượng, an toàn và hiệu quả, được phát triển bởi đội ngũ chuyên gia hàng đầu trong ngành y dược.
              </p>
              <p className="text-[15px] leading-[1.8] text-[#4A4A4A] font-body mb-8">
                Hotline liên hệ: <span className="font-bold text-accent">0988.781.879</span>
              </p>
              <div>
                <Link href="/about">
                  <CtaButton
                    icon={<ArrowRight className="w-4 h-4 text-white" />}
                    className="px-8 h-[48px]"
                  >
                    Tìm hiểu thêm
                  </CtaButton>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
