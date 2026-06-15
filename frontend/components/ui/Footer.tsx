import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0E1C42] text-white py-16 md:py-20 border-t border-[#D4AF37]/15">
      <Container>
        {/* Main Footer Split into 2 Blocks with an explicit spacer column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 mb-16">

          {/* LEFT BLOCK: Brand Info & Socials (4 Columns) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block mb-2">
              <Image src="/images/logo.svg" alt="Nutriphar" width={150} height={50} className="h-10 w-auto brightness-110" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm font-body">
              Cung cấp các sản phẩm chăm sóc sức khỏe tự nhiên, chất lượng cao, mang lại cuộc sống tốt đẹp hơn.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center text-white/70 transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center text-white/70 transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </Link>
              <Link
                href="mailto:ad.nutriphar.pkd@gmail.com"
                aria-label="Email"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center text-white/70 transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center text-white/70 transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.4 78.4 0 0012 4.27a78.5 78.5 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.3 48.3 0 000 6.48 9.4 9.4 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.2 45.2 0 006.5.33c3.5.05 6.57 0 10.2-.46a2.9 2.9 0 001.53-.78 2.49 2.49 0 00.61-1 10.6 10.6 0 00.48-3.35 57.1 57.1 0 00.08-4.21zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" /></svg>
              </Link>
            </div>
          </div>

          {/* Spacer Column on Desktop/Tablet to create visual separation */}
          <div className="hidden md:block md:col-span-1" />

          {/* RIGHT BLOCK: Links, Policies, and Contact (7 Columns) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 lg:gap-12">
            {/* Sub-column 1: Quick Links */}
            <div>
              <h4 className="text-[16px] uppercase tracking-wider font-bold mb-5 text-[#D4AF37] font-display">Liên kết nhanh</h4>
              <ul className="space-y-3 font-body">
                <li><Link href="/" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Trang chủ</Link></li>
                <li><Link href="/products" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Sản phẩm</Link></li>
                <li><Link href="/about" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Về chúng tôi</Link></li>
                <li><Link href="/news" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Tin tức</Link></li>
              </ul>
            </div>

            {/* Sub-column 2: Policies */}
            <div>
              <h4 className="text-[16px] uppercase tracking-wider font-bold mb-5 text-[#D4AF37] font-display">Chính sách</h4>
              <ul className="space-y-3 font-body">
                <li><Link href="#" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Chính sách bảo mật</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Điều khoản sử dụng</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Chính sách đổi trả</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-300">Chính sách giao hàng</Link></li>
              </ul>
            </div>

            {/* Sub-column 3: Contact Info */}
            <div>
              <h4 className="text-[16px] uppercase tracking-wider font-bold mb-5 text-[#D4AF37] font-display">Liên hệ</h4>
              <ul className="space-y-4 text-sm text-white/70 font-body">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-1" />
                  <span className="leading-relaxed">Vĩnh Ngọc - Nha Trang - Khánh Hòa</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <Link href="tel:0988781879" className="hover:text-[#D4AF37] transition-colors duration-300">0988.781.879</Link>
                    <Link href="tel:02586257287" className="hover:text-[#D4AF37] transition-colors duration-300">0258.6257.287</Link>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <Link href="mailto:ad.nutriphar.pkd@gmail.com" className="hover:text-[#D4AF37] transition-colors duration-300">ad.nutriphar.pkd@gmail.com</Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40 font-body">
          <p>&copy; {new Date().getFullYear()} Công ty Cổ phần Dược phẩm Nutriphar. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
