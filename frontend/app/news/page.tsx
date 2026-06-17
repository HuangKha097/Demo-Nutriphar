import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsListClient } from "@/components/ui/NewsListClient";
import { getNewsArticles } from "@/services/api";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | Nutriphar",
  description: "Cập nhật những thông tin mới cập nhật về sản phẩm, hoạt động sản xuất và kiến thức chăm sóc sức khỏe y học thảo dược từ Nutriphar.",
};

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <main className="flex-1 bg-[#FDFBF7] overflow-x-hidden pt-20">
      {/* Main Listing Section */}
      <Section className="!pt-12 !pb-24 md:!pb-32 bg-[#FDFBF7]">
        <Container>
          <NewsListClient articles={articles} />
        </Container>
      </Section>
    </main>
  );
}
