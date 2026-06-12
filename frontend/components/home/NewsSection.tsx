import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsCard } from "@/components/ui/NewsCard";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

const newsArticles = [
  {
    id: 1,
    title: "Yến Sào Nutriphar Đạt Chứng Nhận Chất Lượng ISO 22000:2018",
    excerpt:
      "Công ty Cổ phần Dược phẩm Nutriphar vinh dự đạt chứng nhận ISO 22000:2018 về hệ thống quản lý an toàn thực phẩm, khẳng định cam kết chất lượng vượt trội.",
    image: "/images/quytrinhsanxuat.jpg",
    date: "15/05/2025",
    slug: "#",
  },
  {
    id: 2,
    title: "Khám Phá Quy Trình Sản Xuất Yến Sào Sạch Tại Nha Trang",
    excerpt:
      "Tham quan quy trình sản xuất yến sào từ khâu thu hoạch, làm sạch đến đóng gói tại nhà máy hiện đại của Nutriphar tại Nha Trang - Khánh Hòa.",
    image: "/images/vecongty.jpg",
    date: "28/04/2025",
    slug: "#",
  },
  {
    id: 3,
    title: "Lợi Ích Của Yến Sào Đối Với Sức Khỏe Phụ Nữ Mang Thai",
    excerpt:
      "Nghiên cứu khoa học cho thấy yến sào giàu glycoprotein, axit amin và khoáng chất thiết yếu, hỗ trợ sức khỏe toàn diện cho mẹ bầu và thai nhi.",
    image: "/images/khanhhoa-sea.jpg",
    date: "10/04/2025",
    slug: "#",
  },
];

export function NewsSection() {
  return (
    <Section className="bg-background text-foreground">
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

          {/* 3-column news grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {newsArticles.map((article) => (
              <div key={article.id}>
                <NewsCard
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={article.date}
                  slug={article.slug}
                />
              </div>
            ))}
          </div>

          {/* View all button */}
          <div className="text-center mt-12">
            <Button className="px-8 h-[48px] bg-accent hover:bg-[#8B1215] text-white text-[15px] font-medium rounded-full border-none shadow-md transition-all duration-300 flex items-center gap-2">
              Xem tất cả tin tức
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Container>
    </Section>
  );
}
