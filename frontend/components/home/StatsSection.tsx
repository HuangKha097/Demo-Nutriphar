"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const stats = [
  { value: "Top 10", label: "Thương hiệu hàng đầu" },
  { value: "10,000+", label: "Khách hàng thân thiết" },
  { value: "100%", label: "Hài lòng chất lượng" },
  { value: "Ưu đãi", label: "Ngập tràn mỗi tháng" },
];

export function StatsSection() {
  const rootRef = useGsapReveal();

  return (
    <Section className="relative z-10 bg-primary text-primary-foreground py-20">
      <div ref={rootRef as any}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-foreground/20 text-center">
            {stats.map((stat, i) => (
              <div key={i} data-reveal className="flex flex-col items-center justify-center px-4">
                <span className="text-display font-bold text-brand-yellow mb-2">{stat.value}</span>
                <span className="text-lead text-primary-foreground/90 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
