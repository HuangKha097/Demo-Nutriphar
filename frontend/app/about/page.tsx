import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsSection } from "@/components/home/BenefitsSection";

export const metadata: Metadata = {
  title: "Về chúng tôi | Nutriphar",
  description: "Công ty Cổ phần Dược phẩm Nutriphar tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Intro Hero Section with Brand Blue gradient background */}
      <Section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-[#1A2F6B] via-[#0E1C42] to-[#122355]">
        {/* Subtle luxury gold decorative glow element */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-[40%] bg-[#D4AF37] opacity-15 blur-[120px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-4 font-body">
              Nutriphar Story
            </span>
            <h1 className="text-[40px] md:text-[56px] font-bold font-display tracking-wide mb-8 bg-gradient-to-r from-[#F4D88A] via-[#D4AF37] to-[#F4D88A] bg-clip-text text-transparent leading-[1.2]">
              Kiến Tạo Sức Khỏe Bền Vững
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
              <div className="bg-white/95 backdrop-blur-md p-8 rounded-xs border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                <h3 className="text-xl font-bold text-[#1A2F6B] mb-4 font-display">Sứ Mệnh Của Chúng Tôi</h3>
                <p className="text-[16px] leading-[1.8] text-[#4A4A4A] font-body">
                  Với sứ mệnh <strong>&quot;Kiến tạo sức khỏe bền vững cho cộng đồng&quot;</strong>, Nutriphar cam kết mang đến những sản phẩm chất lượng, an toàn và hiệu quả nhất, được phát triển bởi đội ngũ chuyên gia hàng đầu trong ngành y dược.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-md p-8 rounded-xs border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                <h3 className="text-xl font-bold text-[#1A2F6B] mb-4 font-display">Cam Kết Chất Lượng</h3>
                <p className="text-[16px] leading-[1.8] text-[#4A4A4A] font-body">
                  Chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên, bảo toàn dưỡng chất tự nhiên hoàn hảo nhất cho người sử dụng.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <BenefitsSection />
    </main>
  );
}
