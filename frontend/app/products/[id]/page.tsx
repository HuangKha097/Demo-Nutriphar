import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/services/api";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product ? `${product.name} | Nutriphar` : "Sản phẩm | Nutriphar",
    description: product ? product.description : "Chi tiết sản phẩm yến sào cao cấp từ Nutriphar.",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Fetch related products of the same category via the API client
  const { products: categoryProducts } = await getProducts({
    category: product.category,
    limit: 5
  });

  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="flex-1 bg-[#FAFAF7]">
      <Section className="!pt-32 !pb-20 md:!pt-40 md:!pb-28">
        <Container>
          <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </Container>
      </Section>
    </main>
  );
}

// Generate static routes at build time
export async function generateStaticParams() {
  const { products } = await getProducts({ limit: 100 });
  return products.map((product) => ({
    id: product.id,
  }));
}
