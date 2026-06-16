"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";

// Outer Box card wrapper styled with rounded-xs and a thin border
export function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#E5E5E5]/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-xs p-6 md:p-8 relative overflow-hidden h-full flex flex-col justify-between group text-left ${className}`}>
      {children}
    </div>
  );
}

// Inner Input field wrapper styled with original rounded-xl and double-bezel borders
export const DoubleBezelInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label: string; id: string; icon?: React.ComponentType<any>; error?: string }
>(({ label, id, icon: Icon, error, className = "", ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 w-full text-left ${className}`}>
      <label htmlFor={id} className="text-[11.5px] font-bold uppercase tracking-widest text-slate-500 font-body">
        {label}
      </label>
      {/* Outer Bezel - rounded-xl, border */}
      <div className={`bg-[#FAFAF7] border p-1.5 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-300 focus-within:bg-white focus-within:ring-1 flex items-center gap-2 ${
        error
          ? "border-red-500/50 focus-within:border-red-500/50 focus-within:ring-red-500/10"
          : "border-[#E5E5E5]/60 focus-within:border-[#D4AF37]/50 focus-within:ring-[#D4AF37]/20"
      }`}>
        {Icon && (
          <div className={`pl-2.5 ${error ? "text-red-400" : "text-slate-400"}`}>
            <Icon className="w-4 h-4" strokeWidth={1.2} />
          </div>
        )}
        {/* Inner core input - rounded-lg */}
        <input
          id={id}
          ref={ref}
          {...props}
          className="w-full bg-transparent border-transparent shadow-none px-3.5 py-2 text-sm text-slate-800 rounded-lg focus:outline-none focus:ring-0 font-body transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
        />
      </div>
      {error && <span className="text-[11px] text-red-500 font-medium font-body mt-0.5">{error}</span>}
    </div>
  );
});
DoubleBezelInput.displayName = "DoubleBezelInput";

// Inner Textarea field wrapper styled with original rounded-xl and double-bezel borders
export const DoubleBezelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { label: string; id: string; icon?: React.ComponentType<any>; error?: string }
>(({ label, id, icon: Icon, error, className = "", ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 w-full text-left ${className}`}>
      <label htmlFor={id} className="text-[11.5px] font-bold uppercase tracking-widest text-slate-500 font-body">
        {label}
      </label>
      {/* Outer Bezel - rounded-xl, border */}
      <div className={`bg-[#FAFAF7] border p-1.5 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-300 focus-within:bg-white focus-within:ring-1 flex items-start gap-2 ${
        error
          ? "border-red-500/50 focus-within:border-red-500/50 focus-within:ring-red-500/10"
          : "border-[#E5E5E5]/60 focus-within:border-[#D4AF37]/50 focus-within:ring-[#D4AF37]/20"
      }`}>
        {Icon && (
          <div className={`pl-2.5 pt-3.5 ${error ? "text-red-400" : "text-slate-400"}`}>
            <Icon className="w-4 h-4" strokeWidth={1.2} />
          </div>
        )}
        {/* Inner core textarea - rounded-lg */}
        <textarea
          id={id}
          ref={ref}
          {...props}
          rows={3}
          className="w-full bg-transparent border-transparent shadow-none px-3.5 py-2 text-sm text-slate-800 rounded-lg focus:outline-none focus:ring-0 font-body transition-colors resize-none disabled:text-slate-400"
        />
      </div>
      {error && <span className="text-[11px] text-red-500 font-medium font-body mt-0.5">{error}</span>}
    </div>
  );
});
DoubleBezelTextarea.displayName = "DoubleBezelTextarea";

// Inner Button wrapper styled with original rounded-full and trailing icon circle
interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  showIcon?: boolean;
  loading?: boolean;
}

export function PremiumButton({
  children,
  variant = "primary",
  showIcon = false,
  loading = false,
  className = "",
  ...props
}: PremiumButtonProps) {
  const baseStyle = "group inline-flex items-center justify-between gap-3 rounded-full font-semibold text-[11px] tracking-widest uppercase font-body transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-[#1A2F6B] text-white hover:bg-[#11204C] shadow-sm pl-6 pr-2.5 py-2.5",
    secondary: "bg-[#FAFAF7] text-slate-700 border border-[#E5E5E5] hover:bg-slate-100 pl-6 pr-6 py-3.5",
    danger: "bg-[#A4161A] text-white hover:bg-[#800F12] shadow-sm pl-6 pr-2.5 py-2.5"
  };

  return (
    <CtaButton
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...(props as any)}
    >
      <span>{loading ? "Đang xử lý..." : children}</span>
      {showIcon && !loading && (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ${variant === "primary" ? "bg-white/10 text-[#D4AF37]" :
          variant === "danger" ? "bg-white/10 text-white" :
            "bg-slate-200/50 text-slate-600"
          }`}>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
        </div>
      )}
    </CtaButton>
  );
}

// Role badge translator
export function getRoleLabel(roleId: string | undefined): { text: string; classes: string } {
  switch (roleId) {
    case "role-admin":
      return { text: "Quản trị viên", classes: "bg-[#1A2F6B]/5 text-[#1A2F6B] border border-[#1A2F6B]/15" };
    case "role-manager":
      return { text: "Quản lý", classes: "bg-[#D4AF37]/5 text-[#8C6A00] border border-[#D4AF37]/20" };
    case "role-staff":
      return { text: "Nhân viên", classes: "bg-emerald-50 text-emerald-700 border border-emerald-150" };
    default:
      return { text: "Khách hàng", classes: "bg-slate-50 text-slate-600 border border-slate-150" };
  }
}
