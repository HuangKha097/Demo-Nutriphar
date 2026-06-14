"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";

interface LoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSubmit: () => void;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  showPassword,
  setShowPassword,
  loading,
  onSubmit,
  onGoogleSubmit,
}: LoginFormProps) {
  return (
    <div>
      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={onGoogleSubmit}
        disabled={loading}
        className={`w-full h-[48px] bg-white hover:bg-gray-50/80 border border-[#E5E5E5] hover:border-gray-300 rounded-full flex items-center justify-center gap-3.5 shadow-2xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer select-none font-medium text-[14.5px] text-[#1C1C1C] mb-5 ${
          loading ? "opacity-70 pointer-events-none" : ""
        }`}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        <span>Đăng nhập với Google</span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-[1px] bg-gray-200 flex-1" />
        <span className="text-[12px] font-bold text-gray-400 font-body uppercase tracking-wider">
          Hoặc bằng Email
        </span>
        <div className="h-[1px] bg-gray-200 flex-1" />
      </div>

      {/* Normal Input Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 font-body uppercase tracking-widest">
            Địa chỉ Email
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@vidu.com"
              className="w-full h-[44px] pl-11 pr-4 bg-white border border-[#E5E5E5] rounded-md text-[13.5px] font-body outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 font-body uppercase tracking-widest">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[44px] pl-11 pr-11 bg-white border border-[#E5E5E5] rounded-md text-[13.5px] font-body outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between mt-1 text-[13px] font-body">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-primary w-4 h-4 cursor-pointer rounded-xs"
            />
            <span>Ghi nhớ tôi</span>
          </label>
          <Link
            href="#"
            className="font-bold text-accent hover:text-[#8B1215] transition-colors"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <CtaButton
          type="submit"
          disabled={loading}
          icon={loading ? <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          className="w-full mt-2"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </CtaButton>
      </form>
    </div>
  );
}
