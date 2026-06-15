import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsListClient } from "@/components/ui/NewsListClient";
import { getNewsArticles } from "@/services/api";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | Nutriphar",
  description: "Cập nhật những thông tin mới nhất về sản phẩm, hoạt động sản xuất và kiến thức chăm sóc sức khỏe y học thảo dược từ Nutriphar.",
};

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <main className="flex-1 bg-[#FDFBF7] overflow-x-hidden pt-20">
      {/* Intro Header Section with Soft Structuralism Vibe */}
      <Section className="relative !pt-24 md:!pt-32 !pb-6 md:!pb-8 overflow-hidden bg-gradient-to-b from-[#FAFAF7] to-[#FDFBF7]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#D4AF37]/5 opacity-30 blur-[120px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow Tag */}
            <span className="inline-block rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 mb-6 font-body">
              Nutriphar Updates
            </span>
            {/* Massive Typography Heading */}
            <h1 className="text-[38px] md:text-[56px] font-bold font-display tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent leading-[1.2]">
              Tin Tức &amp; Kiến Thức
            </h1>
            <p className="text-[#4A4A4A] text-[15px] md:text-[17px] leading-[1.8] max-w-2xl mx-auto font-body font-light">
              Khám phá các quy trình sản xuất y học nghiêm ngặt, nghiên cứu dinh dưỡng mới nhất từ đội ngũ dược sĩ và các tin tức sự kiện nổi bật của Nutriphar.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Listing Section */}
      <Section className="!pt-4 !pb-24 md:!pb-32 bg-[#FDFBF7]">
        <Container>
          <NewsListClient articles={articles} />
        </Container>
      </Section>
    </main>
  );
}
