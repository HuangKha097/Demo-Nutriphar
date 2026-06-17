import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Leaf, Award, ShieldCheck, Package } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Leaf,
    image: "/images/vecongty.jpg",
    title: "Chọn Nguyên Liệu",
    desc: "Tổ yến được tuyển chọn nghiêm ngặt từ hệ thống nhà yến đạt chuẩn GACP-WHO của Nutriphar tại Nha Trang - Khánh Hòa."
  },
  {
    step: "02",
    icon: Award,
    image: "/images/quytrinhsanxuat.jpg",
    title: "Tinh Chế Thủ Công",
    desc: "Làm sạch lông và tạp chất bằng phương pháp thủ công tỉ mỉ dưới bàn tay nghệ nhân, cam kết không dùng hóa chất tẩy rửa."
  },
  {
    step: "03",
    icon: ShieldCheck,
    image: "/images/quytrinhsanxuat.jpg",
    title: "Kiểm Định Chất Lượng",
    desc: "Tiệt trùng bằng tia UV và kiểm định các chỉ tiêu vi sinh khắt khe đạt tiêu chuẩn vệ sinh thực phẩm ISO 22000."
  },
  {
    step: "04",
    icon: Package,
    title: "Đóng Gói Thành Phẩm",
    image: "/images/vecongty.jpg",
    desc: "Quy trình đóng gói khép kín trong môi trường vô trùng, dán tem chống hàng giả, bảo quản vẹn nguyên hàm lượng dinh dưỡng."
  }
];

export function ManufacturingSection() {
  return (
    <Section className="relative bg-gradient-to-b from-white via-[#FAFAF7] to-white !py-16 md:!py-24 border-y border-[#E5E5E5]/40 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">

          <h2 className="text-[28px] md:text-[38px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
            Quy Trình Sản Xuất Hiện Đại
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
            <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
          </div>
          <p className="text-muted-foreground text-[14.5px] md:text-[16px] leading-[1.7] max-w-[620px] mx-auto font-body">
            Đảm bảo tính chuyên nghiệp, minh bạch và đảm bảo chất lượng. Mỗi tổ yến Nutriphar đều trải qua 4 bước kiểm soát nghiêm ngặt trước khi trao tay người dùng.
          </p>
        </div>

        {/* Infographic Steps Grid */}
        <div className="relative">
          {/* Horizontal connection line on Desktop passing through the middle of the circles */}
          <div className="absolute top-[96px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/45 to-[#D4AF37]/10 hidden lg:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group relative"
                >
                  {/* Step Image Circular Thumbnail */}
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-3 border-[#D4AF37]/25 group-hover:border-[#D4AF37] bg-white transition-all duration-500 shadow-md group-hover:shadow-2xl mb-6 z-10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Semi-transparent blue overlay on hover */}
                    <div className="absolute inset-0 bg-[#1A2F6B]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500">
                      <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-500 delay-75">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Step Badge at the bottom center of the circle */}
                  <div className="absolute top-[176px] bg-[#1A2F6B] text-[#D4AF37] font-display font-bold text-[12.5px] px-3.5 py-1 rounded-full shadow-md border border-[#D4AF37] z-20 group-hover:scale-105 transition-transform duration-300">
                    Bước {item.step}
                  </div>

                  {/* Icon, Title, and Description Below */}
                  <div className="mt-6 max-w-[260px] flex flex-col items-center">
                    <h3 className="text-[15.5px] font-bold text-primary font-display uppercase tracking-wide leading-tight mb-2.5 group-hover:text-[#8C6A00] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.6] text-[#4A4A4A] font-body font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

