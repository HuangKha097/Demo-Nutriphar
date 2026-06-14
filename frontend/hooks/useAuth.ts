"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import {
  loginWithCredentials,
  registerWithCredentials,
  loginWithGoogle,
} from "@/services/api";

export function useAuth() {
  const router = useRouter();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Navigation and view toggles
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Toggle login vs register view
  const toggleView = () => {
    setIsLogin((prev) => !prev);
    // Reset secondary values when switching modes
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  // Perform Google authentication
  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      showSuccessToast(
        isLogin
          ? `Đăng nhập thành công với Google: ${result.user.email}`
          : `Đăng ký tài khoản Google thành công: ${result.user.email}`
      );
      router.push("/");
    } catch (err: any) {
      showErrorToast(err.message || "Xác thực bằng Google thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Handle standard credentials submit
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field presence checks
    if (!email.trim() || !password) {
      showErrorToast("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!isLogin) {
      if (!name.trim()) {
        showErrorToast("Vui lòng nhập họ và tên!");
        return;
      }
      if (password !== confirmPassword) {
        showErrorToast("Mật khẩu xác nhận không khớp!");
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const result = await loginWithCredentials(email, password);
        showSuccessToast(`Đăng nhập thành công! Chào mừng ${result.user.name || result.user.email}`);
        
        // Handle remember-me cookie or local storage simulation
        if (rememberMe) {
          localStorage.setItem("remembered_email", email);
        } else {
          localStorage.removeItem("remembered_email");
        }
      } else {
        const result = await registerWithCredentials(name, email, password);
        showSuccessToast(`Tạo tài khoản thành công! Hãy đăng nhập.`);
        // Toggle view back to login and populate email
        setIsLogin(true);
        setEmail(email);
        setPassword("");
        setConfirmPassword("");
      }
      router.push("/");
    } catch (err: any) {
      showErrorToast(err.message || (isLogin ? "Đăng nhập thất bại" : "Đăng ký thất bại"));
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
