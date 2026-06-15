import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsCard } from "@/components/ui/NewsCard";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "../ui/CtaButton";
import { getNewsArticles } from "@/services/api";
import Link from "next/link";

export async function NewsSection() {
  // Fetch news asynchronously on the server during rendering
  const newsArticles = await getNewsArticles();

  return (
    <Section id="news" className="bg-background text-foreground">
      <Container>
        {/* Section header — centered, matching wireframe */}
        <div className="text-center mb-14">
          <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
            Tin Tức &amp; Cập Nhật
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
          </div>
          <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
            Cập nhật những thông tin mới nhất về sản phẩm, hoạt động và kiến
            thức sức khỏe từ Nutriphar
          </p>
        </div>

        {/* Redesigned Grid Layout: Left column is featured, right column has 2 stacked cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
          {/* Left Column - Featured (takes 7 columns on desktop) */}
          {newsArticles[0] && (
            <div className="md:col-span-1 lg:col-span-7 flex">
              <NewsCard
                title={newsArticles[0].title}
                excerpt={newsArticles[0].excerpt}
                image={newsArticles[0].image}
                date={newsArticles[0].date}
                slug={newsArticles[0].slug}
                variant="featured"
              />
            </div>
          )}

          {/* Right Column - Stacked cards (takes 5 columns on desktop) */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col gap-6 lg:gap-4">
            {newsArticles[1] && (
              <NewsCard
                title={newsArticles[1].title}
                excerpt={newsArticles[1].excerpt}
                image={newsArticles[1].image}
                date={newsArticles[1].date}
                slug={newsArticles[1].slug}
                variant="standard"
              />
            )}
            {newsArticles[2] && (
              <NewsCard
                title={newsArticles[2].title}
                excerpt={newsArticles[2].excerpt}
                image={newsArticles[2].image}
                date={newsArticles[2].date}
                slug={newsArticles[2].slug}
                variant="horizontal"
              />
            )}
          </div>
        </div>

        {/* View all button */}
        <div className="flex justify-end mt-12">
          <Link href="/news">
            <CtaButton
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              className="justify-between h-[48px]"
            >
              Xem tất cả tin tức
            </CtaButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
