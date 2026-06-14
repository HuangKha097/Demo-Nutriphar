"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function LoginPage() {
  const {
    isLogin,
    loading,
    showPassword,
    setShowPassword,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    toggleView,
    handleGoogleAuth,
    handleCredentialsSubmit,
  } = useAuth();

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4 md:p-8 font-body">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-[13px] font-bold text-primary hover:text-accent transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      {/* Main card box - split screen layout */}
      <div className="w-full max-w-[1024px] bg-white rounded-xs border border-[#E5E5E5]/60 shadow-[0_24px_80px_rgba(28,28,28,0.06)] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* LEFT COLUMN: Auth Form */}
        <div className="p-8 md:p-12 flex flex-col justify-between items-stretch">
          {/* Logo container */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.svg"
                alt="Nutriphar"
                width={150}
                height={50}
                priority
                className="h-9 w-auto"
              />
            </Link>

            {/* Welcome messages */}
            <div className="mb-6">
              <h1 className="text-[24px] md:text-[28px] font-bold font-display text-primary tracking-wide mb-1.5">
                {isLogin ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}
              </h1>
              <p className="text-[13.5px] text-gray-500 font-body leading-relaxed">
                {isLogin
                  ? "Chào mừng bạn quay trở lại! Chọn phương thức để tiếp tục."
                  : "Đăng ký thành viên Nutriphar để hưởng ngập tràn đặc quyền ưu đãi."}
              </p>
            </div>

            {/* Render appropriate form component */}
            {isLogin ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                onSubmit={handleCredentialsSubmit}
                onGoogleSubmit={handleGoogleAuth}
              />
            ) : (
              <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                onSubmit={handleCredentialsSubmit}
                onGoogleSubmit={handleGoogleAuth}
              />
            )}
          </div>

          {/* Toggle login vs register */}
          <div className="text-center mt-6">
            <span className="text-[13.5px] text-gray-500 font-body">
              {isLogin ? "Bạn chưa có tài khoản? " : "Bạn đã có tài khoản? "}
            </span>
            <button
              onClick={toggleView}
              className="text-[13.5px] font-bold text-accent hover:text-[#8B1215] transition-colors cursor-pointer select-none"
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Premium branding showcase */}
        <div className="hidden md:block relative w-full h-full overflow-hidden bg-[#FAFAF7] select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/herobackground.jpg"
            alt="Nutriphar Login Showcase"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.02] transition-transform duration-700 hover:scale-[1.02]"
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Premium Glassmorphic Badge */}
          <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white shadow-lg pointer-events-none max-w-[420px] transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-white/90 font-mono">Nutriphar Premium</span>
            </div>
            <p className="font-display text-[22px] font-bold leading-snug mb-2.5 text-white">
              "Dinh dưỡng thượng hạng từ thiên nhiên cho sức khỏe bền vững"
            </p>
            <div className="h-[2px] w-12 bg-[#D4AF37] mb-3" />
            <p className="text-[13px] text-white/80 leading-relaxed font-body">
              Cam kết 100% yến sào tự nhiên vùng đảo yến Khánh Hòa, đồng hành cùng bạn nâng tầm sức khỏe mỗi ngày.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
