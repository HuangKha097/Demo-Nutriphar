import { HeroSection } from "@/components/home/HeroSection";
import { ContactBanner } from "@/components/home/ContactBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ManufacturingSection } from "@/components/home/ManufacturingSection";
import { StatsSection } from "@/components/home/StatsSection";
import { NewsSection } from "@/components/home/NewsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-background">
      <HeroSection />

      <AboutSection />
      <ProductsSection />
      <ManufacturingSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsSection />
    </main>
  );
}
