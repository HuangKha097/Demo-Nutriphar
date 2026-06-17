"use client";

import { useState } from "react";
import { Container } from "./Container";
import { Section } from "./Section";
import { useToast } from "@/context/ToastContext";
import { Send, Sparkles, CheckCircle2 } from "lucide-react";

export function LeadFormSection() {
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    needs: "Tư vấn Sản phẩm cho người cao tuổi"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      showErrorToast("Vui lòng nhập họ và tên của bạn");
      return;
    }

    const contactInput = formData.contact.trim();
    if (!contactInput) {
      showErrorToast("Vui lòng nhập số điện thoại hoặc email liên hệ");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|84)[3|5|7|8|9][0-9]{8}$/;

    const isEmail = contactInput.includes("@");
    let isValid = false;

    if (isEmail) {
      isValid = emailRegex.test(contactInput);
      if (!isValid) {
        showErrorToast("Email không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
    } else {
      isValid = phoneRegex.test(contactInput.replace(/\s+/g, ""));
      if (!isValid) {
        showErrorToast("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 số.");
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showSuccessToast("Đăng ký nhận tư vấn thành công! Nutriphar sẽ liên hệ lại với bạn trong 5 phút.");

      // Reset form
      setFormData({
        name: "",
        contact: "",
        needs: "Tư vấn Sản phẩm cho người cao tuổi"
      });

      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <Section className="relative bg-gradient-to-br from-[#1A2F6B] via-[#112151] to-[#0E1C42] !py-16 md:!py-24 overflow-hidden border-t border-[#D4AF37]/25">
      {/* Premium Visual Refraction / Glow Overlay */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Brand kit grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">

            <h2 className="text-[32px] md:text-[44px] font-bold font-display uppercase tracking-wide mb-4 text-[#FFF6E8] leading-tight">
              Nhận Tư Vấn Miễn Phí
            </h2>

            {/* Custom three-dot gold divider line */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <div className="h-[2px] w-6 bg-[#D4AF37]/40 rounded-full" />
            </div>

            <p className="text-white/80 text-[15px] md:text-[16px] leading-[1.7] max-w-[580px] mx-auto font-body font-light">
              Hãy để lại thông tin liên hệ của bạn. Đội ngũ chuyên gia dinh dưỡng và dược sĩ chuyên môn cao từ Nutriphar sẽ gọi lại hỗ trợ giải đáp mọi thắc mắc trong vòng 5 phút.
            </p>
          </div>

          {/* Form container */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xs p-6 md:p-10 shadow-2xl relative"
          >
            {isSuccess && (
              <div className="absolute inset-0 bg-[#1A2F6B]/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 animate-fade-in rounded-xs">
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-4 animate-bounce" />
                <h3 className="text-[20px] md:text-[22px] font-bold font-display text-white mb-2">
                  Gửi Thông Tin Thành Công!
                </h3>
                <p className="text-white/80 text-[14.5px] max-w-sm font-body leading-relaxed">
                  Cảm ơn bạn đã tin dùng Nutriphar. Đội ngũ dược sĩ chuyên trách sẽ liên hệ hỗ trợ bạn qua thông tin vừa đăng ký.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-semibold text-white/90 uppercase tracking-widest font-body">
                  Họ và tên <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Nhập họ tên của bạn..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xs bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-[#D4AF37] focus:bg-white/15 outline-none transition-all duration-300 text-[14.5px] font-body"
                />
              </div>

              {/* Contact Input (Phone or Email) */}
              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-semibold text-white/90 uppercase tracking-widest font-body">
                  Số điện thoại / Email <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Nhập số điện thoại hoặc email..."
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xs bg-white/10 text-white placeholder-white/40 border border-white/20 focus:border-[#D4AF37] focus:bg-white/15 outline-none transition-all duration-300 text-[14.5px] font-body"
                />
              </div>

              {/* Needs Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-[12.5px] font-semibold text-white/90 uppercase tracking-widest font-body">
                  Nhu cầu tư vấn
                </label>
                <div className="relative">
                  <select
                    disabled={isSubmitting}
                    value={formData.needs}
                    onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                    className="w-full h-[48px] pl-4 pr-10 rounded-xs bg-white/10 text-white border border-white/20 focus:border-[#D4AF37] focus:bg-white/15 outline-none transition-all duration-300 text-[14px] font-body appearance-none cursor-pointer"
                  >
                    <option className="bg-[#1A2F6B] text-white" value="Tư vấn Sản phẩm cho người cao tuổi">Tư vấn Sản phẩm cho người cao tuổi</option>
                    <option className="bg-[#1A2F6B] text-white" value="Tư vấn Sản phẩm cho trẻ em">Tư vấn Sản phẩm cho trẻ em</option>
                    <option className="bg-[#1A2F6B] text-white" value="Mua hàng nhanh / Đặt hàng gấp">Mua hàng nhanh / Đặt hàng gấp</option>
                    <option className="bg-[#1A2F6B] text-white" value="Tư vấn sức khỏe cùng Dược sĩ">Tư vấn sức khỏe cùng Dược sĩ</option>
                    <option className="bg-[#1A2F6B] text-white" value="Hợp tác đại lý / Phân phối">Hợp tác đại lý / Phân phối</option>
                    <option className="bg-[#1A2F6B] text-white" value="Yêu cầu khác">Yêu cầu khác</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA Button container */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[280px] h-[52px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-primary font-bold tracking-widest uppercase text-[14px] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang gửi thông tin...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>Nhận tư vấn miễn phí</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
