import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getNewsArticleBySlug, getNewsArticles } from "@/services/api";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return { title: "Không tìm thấy bài viết | Nutriphar" };
  return {
    title: `${article.title} | Nutriphar`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch all articles to display related ones in the "Popular post" sidebar
  const allArticles = await getNewsArticles();
  const relatedArticles = allArticles.filter((art) => art.id !== article.id);

  return (
    <main className="flex-1 bg-white overflow-x-hidden pt-20">
      <Section className="!py-16 md:!py-20">
        <Container className="max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="text-[11.5px] uppercase tracking-[0.12em] font-semibold text-gray-400 flex flex-wrap items-center gap-2 mb-8 font-body">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <span className="text-gray-300 font-normal">/</span>
            <Link href="/news" className="hover:text-primary transition-colors">
              Tin tức
            </Link>
            {article.category && (
              <>
                <span className="text-gray-300 font-normal">/</span>
                <span className="text-gray-400 cursor-default">{article.category}</span>
              </>
            )}
            <span className="text-gray-300 font-normal">/</span>
            <span className="text-primary/80 line-clamp-1 max-w-[150px] sm:max-w-xs md:max-w-md normal-case font-medium">
              {article.title}
            </span>
          </nav>

          <article className="w-full">
            {/* 1. Header Metadata & Title & Lead Excerpt */}
            <div className="w-full mb-8">
              <div className="text-[12px] text-gray-500 font-body mb-3 font-semibold flex items-center gap-1.5">
                <span className="text-gray-900 uppercase tracking-widest">{article.date}</span>
                <span className="text-gray-300">•</span>
                <span>by Ban biên tập Nutriphar</span>
              </div>

              <h1 className="text-[28px] md:text-[40px] font-bold font-display text-gray-900 leading-[1.2] mb-5 tracking-tight max-w-4xl">
                {article.title}
              </h1>

              <p className="text-[#4A4A4A]/80 text-[15px] md:text-[16.5px] leading-relaxed max-w-4xl font-body">
                {article.excerpt}
              </p>
            </div>

            {/* 2. Full-Width Banner Image */}
            <div className="relative w-full aspect-[16/8] md:aspect-[21/9] overflow-hidden rounded-xs bg-[#F5F5F5] mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3. Outlined Pill Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-12">
              <span className="rounded-full border border-gray-300 px-4 py-1 text-[11.5px] font-semibold text-gray-600 font-body cursor-default hover:border-primary hover:text-primary transition-colors duration-300">
                {article.category || "Tin tức"}
              </span>
              <span className="rounded-full border border-gray-300 px-4 py-1 text-[11.5px] font-semibold text-gray-600 font-body cursor-default hover:border-primary hover:text-primary transition-colors duration-300">
                Nutriphar
              </span>
              <span className="rounded-full border border-gray-300 px-4 py-1 text-[11.5px] font-semibold text-gray-600 font-body cursor-default hover:border-primary hover:text-primary transition-colors duration-300">
                Sức khỏe
              </span>
            </div>

            {/* 4. Split 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Rich Text Content (8 Columns) */}
              <div className="lg:col-span-8">
                <div
                  className="font-body text-[#4A4A4A] leading-[1.8] text-[15px] md:text-[16px] space-y-6 [&>h4]:text-[20px] [&>h4]:font-bold [&>h4]:font-display [&>h4]:text-primary [&>h4]:mt-8 [&>h4]:mb-3.5 [&>p]:mb-4 [&>p]:leading-[1.8]"
                  dangerouslySetInnerHTML={{ __html: article.content || "" }}
                />
              </div>

              {/* Right Column: Popular Post Sidebar (4 Columns) */}
              <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l lg:border-gray-200/50 pt-10 lg:pt-0 lg:pl-10">
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
                  <h2 className="text-[18px] md:text-[20px] font-bold font-display text-gray-900">
                    Popular post
                  </h2>
                  <Link
                    href="/news"
                    className="text-[13px] font-bold text-primary hover:text-accent transition-colors duration-300 font-body flex items-center gap-1 group/view-all"
                  >
                    <span>Xem tất cả</span>
                    <span className="transition-transform duration-300 group-hover/view-all:translate-x-0.5">→</span>
                  </Link>
                </div>

                <div className="flex flex-col">
                  {relatedArticles.map((art) => (
                    <div
                      key={art.id}
                      className="border-b border-gray-100 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
                    >
                      <Link
                        href={art.slug}
                        className="group flex flex-col w-full"
                      >
                        {/* Card Thumbnail */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xs bg-[#F5F5F5] mb-4">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Card Meta */}
                        <div className="text-[11px] text-gray-500 font-body mb-2 font-semibold flex items-center gap-1.5">
                          <span className="text-gray-900 uppercase tracking-widest">{art.date}</span>
                          <span className="text-gray-300">•</span>
                          <span>by Ban biên tập</span>
                        </div>

                        {/* Card Title */}
                        <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight mb-2 font-display line-clamp-2">
                          {art.title}
                        </h3>

                        {/* Card Excerpt */}
                        <p className="text-[13px] text-gray-500 leading-relaxed font-body mb-3.5 line-clamp-2">
                          {art.excerpt}
                        </p>

                        {/* Card Pills */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full border border-gray-300 px-3 py-0.5 text-[10.5px] font-semibold text-gray-600 font-body">
                            {art.category || "Tin tức"}
                          </span>
                          <span className="rounded-full border border-gray-300 px-3 py-0.5 text-[10.5px] font-semibold text-gray-600 font-body">
                            News
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
