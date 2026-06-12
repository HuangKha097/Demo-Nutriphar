import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/images/logo.svg" alt="Nutriphar" width={150} height={50} className="h-10 w-auto" />
            </Link>
            <p className="text-background/70 text-sm mb-6 max-w-sm">
              Cung cấp các sản phẩm chăm sóc sức khỏe tự nhiên, chất lượng cao, mang lại cuộc sống tốt đẹp hơn.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-yellow">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Trang chủ</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Sản phẩm</Link></li>
              <li><Link href="/about" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-yellow">Chính sách</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-brand-yellow text-sm transition-colors">Giao hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-yellow">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>Địa chỉ: 123 Đường Sức Khỏe, TP. Hồ Chí Minh</li>
              <li>Điện thoại: (028) 3838 8888</li>
              <li>Email: contact@nutriphar.vn</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Công ty cổ phần dược phẩm Nutriphar. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
