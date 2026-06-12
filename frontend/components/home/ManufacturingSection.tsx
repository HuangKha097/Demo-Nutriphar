import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ManufacturingSection() {
  return (
    <Section className="bg-muted">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* Block trái: Content */}
            <div>
              <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
                Quy Trình Sản Xuất Hiện Đại
              </h2>
              <p className="text-body text-muted-foreground">
                Với trang thiết bị hiện đại nhập khẩu từ nước ngoài, sản xuất theo quy trình khép kín, nguyên liệu nhập từ các công ty được cấp phép, nguồn gốc xuất xứ rõ ràng, nguồn Yến được mang về từ các nhà yến uy tín và nguồn yến đảo tại <span className="font-bold text-accent">Nha Trang – Khánh Hòa</span>, người lao động được đào tạo bài bản, tay nghề cao, từ đó cho ra đời các loại sản phẩm đạt chất lượng cao nhất mà công ty nhắm đến. Công ty lấy chất lượng và uy tín đặt lên hàng đầu, Ban lãnh đạo công ty quyết tâm tạo ra những sản phẩm đáp ứng kỳ vọng của người tiêu dùng, cam kết 100% yến thật, không pha tạp chất, không độn, không sử dụng bất cứ một loại hóa chất nào trong quy trình sản xuất.
              </p>
            </div>

            {/* Block phải: Ảnh */}
            <div className="rounded-xs overflow-hidden h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/quytrinhsanxuat.jpg"
                alt="Quy trình sản xuất Nutriphar"
                className="w-full h-90% object-cover"
              />
            </div>

          </div>
        </Container>
    </Section>
  );
}
