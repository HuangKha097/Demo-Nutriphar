import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { Award, ShieldCheck, Heart, Sparkles, Target, Users, Calendar, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Về chúng tôi | Nutriphar",
  description: "Công ty Cổ phần Dược phẩm Nutriphar tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên.",
};

const coreValues = [
  {
    icon: Sparkles,
    title: "Chất Lượng Thượng Hạng",
    description: "Cam kết 100% yến thật tự nhiên khai thác trực tiếp từ vùng yến đảo Khánh Hòa, bảo toàn trọn vẹn 18 loại axit amin và khoáng chất quý giá.",
  },
  {
    icon: ShieldCheck,
    title: "Uy Tín Vững Bền",
    description: "Trung thực trong nguồn gốc và chất lượng. Quy trình sản xuất nghiêm ngặt nói không với chất bảo quản, phụ gia hay chất độn hóa học.",
  },
  {
    icon: Heart,
    title: "Tận Tâm Chăm Sóc",
    description: "Coi khách hàng như người thân, không ngừng nghiên cứu công thức cải tiến để tối ưu hóa sự hấp thụ dinh dưỡng cho từng lứa tuổi.",
  },
  {
    icon: Target,
    title: "Đột Phá Nghiên Cứu",
    description: "Kết hợp tinh hoa y học truyền thống cùng công nghệ sản xuất hiện đại và quy trình kiểm định khắt khe đạt chuẩn y tế GMP.",
  },
];

const timelineEvents = [
  {
    year: "2018",
    title: "Khởi Đầu Đầy Khát Vọng",
    description: "Thành lập Công ty Cổ phần Dược phẩm Nutriphar, tập trung đầu tư xây dựng chuỗi nhà yến đạt tiêu chuẩn kiểm soát vi khí hậu khép kín.",
  },
  {
    year: "2020",
    title: "Chuẩn Hóa Quốc Tế",
    description: "Nhà máy sản xuất chính thức đi vào hoạt động công suất cao, xuất sắc đạt chứng nhận an toàn thực phẩm ISO 22000 & HACCP quốc tế.",
  },
  {
    year: "2022",
    title: "Vươn Tầm Quốc Gia",
    description: "Ra mắt dòng sản phẩm yến chưng sẵn cao cấp kết hợp dược liệu quý, vinh dự lọt Top các thương hiệu yến sào được tin dùng hàng đầu.",
  },
  {
    year: "2025",
    title: "Đổi Mới & Xuất Khẩu",
    description: "Ứng dụng thành công công nghệ sấy thăng hoa giữ trọn hoạt tính sinh học, chính thức xuất khẩu sản phẩm sang thị trường Đông Nam Á.",
  },
];

const certifications = [
  {
    title: "Đạt Chuẩn GMP",
    subtitle: "Thực hành sản xuất tốt",
    description: "Hệ thống nhà máy vận hành đồng bộ theo tiêu chuẩn y tế quốc tế khắt khe.",
  },
  {
    title: "Chứng Chỉ ISO 22000",
    subtitle: "An toàn thực phẩm toàn cầu",
    description: "Hệ thống quản lý chất lượng đạt tiêu chuẩn châu Âu nghiêm ngặt.",
  },
  {
    title: "Tiêu Chuẩn HACCP",
    subtitle: "Kiểm soát mối nguy sinh học",
    description: "Cam kết ngăn ngừa mọi rủi ro vệ sinh trong suốt dây chuyền chế biến.",
  },
  {
    title: "Cam Kết 100% Yến Thật",
    subtitle: "Bảo hiểm chất lượng",
    description: "Cam kết bồi hoàn giá trị nếu phát hiện pha trộn tạp chất hoặc chất độn.",
  },
];

const teamMembers = [
  {
    name: "Dược Sĩ Nguyễn Văn A",
    role: "Trưởng phòng Nghiên cứu & Phát triển (R&D)",
    experience: "15+ năm kinh nghiệm nghiên cứu thảo dược",
    bio: "Mỗi công thức yến sào kết hợp dược liệu đều được tôi và đội ngũ tối ưu hóa tỷ lệ sinh học để cơ thể hấp thu tối đa dinh dưỡng quý báu.",
  },
  {
    name: "Bà Trần Thị B",
    role: "Sáng lập viên & Tổng Giám đốc (CEO)",
    experience: "Người mang khát vọng nâng tầm yến sào Việt",
    bio: "Nutriphar không chỉ bán sản phẩm chăm sóc sức khỏe, chúng tôi trao gửi giải pháp sức khỏe bền vững đi từ cái Tâm và uy tín hàng đầu.",
  },
  {
    name: "Dược Sĩ Lê Hoàng C",
    role: "Giám đốc Kiểm soát Chất lượng (QA/QC)",
    experience: "Thành viên ban kiểm định chất lượng y tế",
    bio: "Từng lô sản phẩm xuất xưởng đều phải vượt qua 3 tầng kiểm định vi sinh lý hóa khắt khe để đảm bảo sự an tâm tuyệt đối cho khách hàng.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background overflow-x-hidden">
      {/* Intro Hero Section with Brand Blue gradient background */}
      <Section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-[#1A2F6B] via-[#0E1C42] to-[#122355]">
        {/* Subtle luxury gold decorative glow element */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-[40%] bg-[#D4AF37] opacity-15 blur-[120px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-4 font-body">
              Nutriphar Story
            </span>
            <h1 className="text-[40px] md:text-[56px] font-bold font-display tracking-wide mb-8 bg-gradient-to-r from-[#F4D88A] via-[#D4AF37] to-[#F4D88A] bg-clip-text text-transparent leading-[1.2]">
              Kiến Tạo Sức Khỏe Bền Vững
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
              <div className="bg-white/95 backdrop-blur-md p-8 rounded-xs border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                <h3 className="text-xl font-bold text-[#1A2F6B] mb-4 font-display">Sứ Mệnh Của Chúng Tôi</h3>
                <p className="text-[15px] leading-[1.8] text-[#4A4A4A] font-body">
                  Với sứ mệnh <strong>&quot;Kiến tạo sức khỏe bền vững cho cộng đồng&quot;</strong>, Nutriphar cam kết mang đến những sản phẩm chất lượng, an toàn và hiệu quả nhất, được phát triển bởi đội ngũ chuyên gia hàng đầu trong ngành y dược.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-md p-8 rounded-xs border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                <h3 className="text-xl font-bold text-[#1A2F6B] mb-4 font-display">Cam Kết Chất Lượng</h3>
                <p className="text-[15px] leading-[1.8] text-[#4A4A4A] font-body">
                  Chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên, bảo toàn dưỡng chất tự nhiên hoàn hảo nhất cho người sử dụng.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Values Section */}
      <Section className="bg-[#FAFAF7] !py-16 md:!py-24 border-b border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-16">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              Core Values
            </span>
            <h2 className="text-[32px] md:text-[42px] font-bold font-display tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
              Tại Nutriphar, những giá trị này là kim chỉ nam cho mọi hoạt động nghiên cứu, sản xuất và chăm sóc khách hàng của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white p-8 rounded-xs border border-[#E5E5E5] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E0F1FC] text-primary flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-[18px] font-bold font-display text-[#1C1C1C] group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-muted-foreground font-body">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Corporate Timeline / Milestones Section */}
      <Section className="bg-[#FAFAF7] !py-16 md:!py-24 border-y border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-16">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              Nutriphar Journey
            </span>
            <h2 className="text-[32px] md:text-[42px] font-bold font-display tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Hành Trình Phát Triển
            </h2>
            <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
              Nhìn lại những cột mốc đáng nhớ đánh dấu sự trưởng thành và phát triển bền vững của Nutriphar.
            </p>
          </div>

          {/* Timeline container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line (desktop only) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1A2F6B] via-[#D4AF37] to-[#A4161A] transform md:-translate-x-1/2 opacity-30"></div>

            <div className="flex flex-col gap-10">
              {timelineEvents.map((event, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-stretch relative ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                  {/* Bullet Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white transform -translate-x-[7px] md:-translate-x-1/2 top-1.5 shadow-md z-10"></div>

                  {/* Left spacer / content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left md:text-right flex flex-col justify-start">
                    {i % 2 === 0 ? (
                      <>
                        <span className="text-[28px] font-bold text-primary font-display block leading-none mb-1">
                          {event.year}
                        </span>
                        <h3 className="text-[18px] font-semibold text-[#1C1C1C] font-display">
                          {event.title}
                        </h3>
                      </>
                    ) : (
                      <div className="md:hidden">
                        <span className="text-[28px] font-bold text-primary font-display block leading-none mb-1">
                          {event.year}
                        </span>
                        <h3 className="text-[18px] font-semibold text-[#1C1C1C] font-display">
                          {event.title}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Right spacer / content */}
                  <div className="w-full md:w-1/2 pl-12 md:px-8 text-left flex flex-col justify-start">
                    {i % 2 !== 0 ? (
                      <>
                        <span className="text-[28px] font-bold text-primary font-display hidden md:block leading-none mb-1">
                          {event.year}
                        </span>
                        <h3 className="text-[18px] font-semibold text-[#1C1C1C] font-display hidden md:block">
                          {event.title}
                        </h3>
                        <p className="text-[14px] leading-[1.6] text-muted-foreground font-body mt-2">
                          {event.description}
                        </p>
                      </>
                    ) : (
                      <p className="text-[14px] leading-[1.6] text-muted-foreground font-body mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Quality Certifications & Assurances Section */}
      <Section className="bg-white !py-16 md:!py-24 border-b border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-16">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              Quality Assurance
            </span>
            <h2 className="text-[32px] md:text-[42px] font-bold font-display tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Chứng Nhận & Cam Kết Chất Lượng
            </h2>
            <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
              Nutriphar tự hào đạt đầy đủ các tiêu chuẩn kiểm định an toàn vệ sinh y tế cao nhất để bảo vệ sức khỏe người dùng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <div 
                key={i} 
                className="bg-[#FAFAF7] p-8 rounded-xs border border-[#E5E5E5] hover:border-primary/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-[12px] font-bold tracking-widest text-[#8C6A00] uppercase font-body">
                      Nutriphar Cert
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold font-display text-primary mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[13px] font-semibold text-[#A4161A] font-body mb-3">
                    {cert.subtitle}
                  </p>
                  <p className="text-[14px] leading-[1.6] text-muted-foreground font-body">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership & Expert Team Section */}
      <Section className="bg-[#FAFAF7] !py-16 md:!py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="block text-[#D4AF37] font-semibold tracking-widest uppercase text-[13px] mb-3 font-body">
              Expertise & Leadership
            </span>
            <h2 className="text-[32px] md:text-[42px] font-bold font-display tracking-wide mb-6 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Đội Ngũ Ban Lãnh Đạo & Chuyên Gia
            </h2>
            <p className="text-lead text-muted-foreground max-w-2xl mx-auto">
              Quy tụ đội ngũ sáng lập tận tâm cùng những dược sĩ hàng đầu trong ngành nghiên cứu và phát triển y học thảo dược.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xs border border-[#E5E5E5] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Profile Placeholder Gradient */}
                <div className="h-44 bg-gradient-to-br from-[#1A2F6B]/80 to-[#D4AF37]/40 flex items-center justify-center text-white p-6 relative">
                  <Users className="w-12 h-12 opacity-30 absolute right-4 bottom-4" />
                  <div className="text-center">
                    <span className="text-[12px] font-bold tracking-widest uppercase text-[#F4D88A] block mb-1">
                      Nutriphar Member
                    </span>
                    <p className="text-[14px] font-medium font-body opacity-90">{member.experience}</p>
                  </div>
                </div>

                {/* Info details */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[19px] font-bold font-display text-primary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-semibold text-[#A4161A] font-body mb-4">
                      {member.role}
                    </p>
                    <p className="text-[14px] leading-[1.7] text-muted-foreground italic font-body">
                      &quot;{member.bio}&quot;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
