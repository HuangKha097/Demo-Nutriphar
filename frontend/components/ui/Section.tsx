import { type Ref, type CSSProperties } from "react";

interface SectionProps {
  className?: string;
  id?: string;
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
  children: React.ReactNode;
}

export function Section({ className = "", id, ref, style, children }: SectionProps) {
  return (
    <section ref={ref} id={id} style={style} className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
