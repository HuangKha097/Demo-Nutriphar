import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { AboutHero } from "@/components/ui/AboutHero";
import { getAboutData } from "@/services/api";
import { CoreValuesGrid } from "@/components/ui/CoreValuesGrid";
import { ShieldCheck, Heart, Sparkles, Target, Users, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Về chúng tôi | Nutriphar",
  description: "Công ty Cổ phần Dược phẩm Nutriphar tự hào là đơn vị tiên phong trong lĩnh vực nghiên cứu, sản xuất và phân phối các sản phẩm chăm sóc sức khỏe từ thiên nhiên.",
};

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  ShieldCheck,
  Heart,
  Target
};

export default async function AboutPage() {
  // Fetch details asynchronously from the API service layer
  const aboutData = await getAboutData();

  return (
    <main className="flex-1 bg-background overflow-x-hidden">
      {/* Intro Hero Section */}
      <AboutHero />

      {/* Core Values Section */}
      <Section className="bg-[#FAFAF7] !pt-10 md:!pt-12 !pb-12 md:!pb-16 border-b border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Giá Trị Cốt Lõi
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Tại Nutriphar, những giá trị này là kim chỉ nam cho mọi hoạt động nghiên cứu, sản xuất và chăm sóc khách hàng của chúng tôi.
            </p>
          </div>

          <CoreValuesGrid coreValues={aboutData.coreValues} />
        </Container>
      </Section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Timeline/Milestones Section */}
      <Section className="bg-[#FAFAF7] !py-12 md:!py-16 border-y border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Hành Trình Phát Triển
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Nhìn lại những cột mốc đáng nhớ đánh dấu sự trưởng thành và phát triển bền vững của Nutriphar.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1A2F6B] via-[#D4AF37] to-[#A4161A] transform md:-translate-x-1/2 opacity-30"></div>

            <div className="flex flex-col gap-10 md:gap-14">
              {aboutData.timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center relative gap-8 md:gap-0 ${i % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white transform -translate-x-[7px] md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 shadow-md z-10 hidden md:block"></div>

                  <div className={`w-full md:w-1/2 text-left flex flex-col justify-center ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <span className="text-[32px] md:text-[40px] font-bold text-primary font-display block leading-none mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#1C1C1C] font-display mb-3">
                      {event.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-[1.7] text-muted-foreground font-body">
                      {event.description}
                    </p>
                  </div>

                  <div className={`w-full md:w-1/2 flex justify-center mt-6 md:mt-0 ${i % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                    {event.image ? (
                      <div className="relative w-full h-40 sm:h-48 lg:h-52 rounded-xs overflow-hidden shadow-md group">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    ) : (
                      <div className="relative w-full h-40 sm:h-48 lg:h-52 rounded-xs overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">Hình ảnh {event.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Certifications Section */}
      <Section className="bg-white !py-12 md:!py-16 border-b border-[#E5E5E5]/60">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Chứng Nhận & Cam Kết Chất Lượng
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Nutriphar tự hào đạt đầy đủ các tiêu chuẩn kiểm định an toàn vệ sinh y tế cao nhất để bảo vệ sức khỏe người dùng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.certifications.map((cert, i) => (
              <div
                key={i}
                className="bg-[#FAFAF7] p-6 lg:p-8 rounded-xs border border-[#E5E5E5] hover:border-primary/40 shadow-sm transition-all duration-300 flex flex-col justify-start group"
              >
                {cert.image && (
                  <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-6 relative border border-[#E5E5E5]/50 bg-white shadow-xs">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-[11px] font-bold tracking-widest text-[#8C6A00] uppercase font-body">
                      Nutriphar Cert
                    </span>
                  </div>
                  <h3 className="text-[17px] md:text-[18px] font-bold font-display text-primary mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[12.5px] md:text-[13px] font-semibold text-[#A4161A] font-body mb-3">
                    {cert.subtitle}
                  </p>
                  <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-muted-foreground font-body">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership & Expert Team Section */}
      <Section className="bg-[#FAFAF7] !py-12 md:!py-16">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[36px] md:text-[48px] font-bold font-display uppercase tracking-wide mb-4 bg-gradient-to-r from-[#8C6A00] via-[#D4AF37] to-[#8C6A00] bg-clip-text text-transparent">
              Đội Ngũ Ban Lãnh Đạo & Chuyên Gia
            </h2>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto font-body">
              Quy tụ đội ngũ sáng lập tận tâm cùng những dược sĩ hàng đầu trong ngành nghiên cứu và phát triển y học thảo dược.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aboutData.teamMembers.map((member, i) => (
              <div
                key={i}
                className="relative flex flex-col lg:block overflow-hidden rounded-xs border border-[#E5E5E5] bg-white group shadow-sm hover:shadow-xl transition-all duration-300 w-full"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#1A2F6B]/5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 lg:group-hover:scale-105"
                  />
                  {!member.image && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                      <Users className="w-12 h-12" />
                    </div>
                  )}
                </div>

                {/* Info Overlay (Desktop: hover to slide-up, Mobile: static display below) */}
                <div className="p-6 lg:p-4 bg-white text-slate-800 border-t border-[#E5E5E5]/60 flex-1 flex flex-col justify-between lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:h-[40%] lg:bg-white/80 lg:backdrop-blur-md lg:border-t lg:border-white/20 lg:translate-y-full lg:group-hover:translate-y-0 lg:transition-transform lg:duration-500 lg:ease-out z-10">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Member Name */}
                      <h3 className="text-[18px] lg:text-[19px] font-bold font-display text-[#1A2F6B] mb-0.5">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-[12.5px] lg:text-[13px] font-semibold text-slate-500 tracking-wide uppercase font-body mb-2 lg:mb-1">
                        {member.role}
                      </p>

                      {/* Bio Quote */}
                      <div className="relative my-2 lg:my-1 pl-3 border-l-2 border-[#D4AF37]/60">
                        <p className="text-[12.5px] lg:text-[13px] leading-[1.5] text-slate-600 italic font-body line-clamp-2 lg:line-clamp-3">
                          &quot;{member.bio}&quot;
                        </p>
                      </div>
                    </div>

                    {/* Experience section */}
                    <div className="mt-3 lg:mt-1 pt-3 lg:pt-1 border-t border-[#E5E5E5]/60 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                      <p className="text-[11.5px] lg:text-[12px] font-medium tracking-wide text-slate-600 font-body">
                        {member.experience}
                      </p>
                    </div>
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
