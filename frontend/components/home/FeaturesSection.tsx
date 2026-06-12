"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Leaf, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
];

export function FeaturesSection() {
  const rootRef = useGsapReveal();

  return (
    <Section>
      <div ref={rootRef as any}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} data-reveal className="flex flex-col items-center p-6 rounded-xs bg-muted/50">
                  <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-h3 mb-3">{feature.title}</h3>
                  <p className="text-body text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </Section>
  );
}
