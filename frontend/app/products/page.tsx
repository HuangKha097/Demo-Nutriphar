import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductsContent } from "@/components/products/ProductsContent";
import { ProductsBannerCarousel } from "@/components/products/ProductsBannerCarousel";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sản phẩm | Nutriphar",
  description: "Khám phá danh mục sản phẩm yến sào Khánh Hòa thượng hạng, yến hũ chưng sẵn dinh dưỡng và các hộp quà tặng sức khỏe sang trọng từ Nutriphar.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-background">

      {/* Products Catalog grid & filter layout */}
      <Section className="!pt-32 !pb-10 md:!pt-40 md:!pb-14 bg-background">
        <Container>
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-muted-foreground font-body">Đang tải danh sách sản phẩm...</div>}>
            <ProductsContent />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}

