"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const rootRef = useGsapReveal();

  return (
    <section className="bg-primary py-4">
      <div ref={rootRef as any}>
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">



            {/* Contact Info */}
            <div data-reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-primary-foreground text-sm">
              <Link href="tel:0988781879" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>0988.781.879</span>
              </Link>
              <Link href="tel:02586257287" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>0258.6257.287</span>
              </Link>
              <Link href="mailto:ad.nutriphar.pkd@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" />
                <span>ad.nutriphar.pkd@gmail.com</span>
              </Link>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Vĩnh Ngọc - Nha Trang - Khánh Hòa</span>
              </div>
            </div>

            {/* Social Icons */}
            <div data-reveal className="flex items-center gap-3 shrink-0">
              <Link
                href="#"
                aria-label="Facebook"
                className="h-8 w-8 rounded bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="h-8 w-8 rounded bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
              </Link>
              <Link
                href="mailto:ad.nutriphar.pkd@gmail.com"
                aria-label="Email"
                className="h-8 w-8 rounded bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="h-8 w-8 rounded bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.4 78.4 0 0012 4.27a78.5 78.5 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.3 48.3 0 000 6.48 9.4 9.4 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.2 45.2 0 006.5.33c3.5.05 6.57 0 10.2-.46a2.9 2.9 0 001.53-.78 2.49 2.49 0 00.61-1 10.6 10.6 0 00.48-3.35 57.1 57.1 0 00.08-4.21zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" /></svg>
              </Link>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
