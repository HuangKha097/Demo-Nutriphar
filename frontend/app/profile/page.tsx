"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useUser, useUpdateUser } from "@/hooks/use-users-query";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// Import modular subcomponents
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ProfileForm } from "./components/ProfileForm";
import { OrdersTable, MockOrder } from "./components/OrdersTable";
import { SecurityForm } from "./components/SecurityForm";
import { getRoleLabel } from "./components/ProfileUI";
import { type ProfileInput, type SecurityInput } from "@/services/user.service";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUserId, logout } = useAuth();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Queries & Mutations
  const { data: user, isLoading: userLoading } = useUser(currentUserId || "1");
  const updateUserMutation = useUpdateUser();

  // Active navigation tab (profile | orders | security)
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "security">("profile");

  // Local state for password submission loading indicator
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Mock Orders List
  const mockOrders: MockOrder[] = [
    {
      id: "NTP-89210",
      date: "12/06/2026",
      items: "Yến sào Khánh Hòa thượng hạng, Yến chưng nhân sâm",
      total: "3.450.000 ₫",
      status: "Đang giao"
    },
    {
      id: "NTP-87391",
      date: "28/05/2026",
      items: "Nước yến sào đông trùng hạ thảo (Lốc 6 hũ)",
      total: "870.000 ₫",
      status: "Đã giao"
    },
    {
      id: "NTP-84291",
      date: "10/05/2026",
      items: "Combo quà tặng cao cấp Hoàng Kim",
      total: "1.800.000 ₫",
      status: "Đã giao"
    },
    {
      id: "NTP-83210",
      date: "02/05/2026",
      items: "Viên uống bổ khớp Glucosamine NTP",
      total: "450.000 ₫",
      status: "Đã giao"
    },
    {
      id: "NTP-81990",
      date: "15/04/2026",
      items: "Sâm lát tẩm mật khẩu Hàn Quốc, Trà hồng sâm",
      total: "1.250.000 ₫",
      status: "Đã giao"
    },
    {
      id: "NTP-80321",
      date: "20/03/2026",
      items: "Tảo xoắn Spirulina nguyên chất",
      total: "620.000 ₫",
      status: "Đã giao"
    }
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    showSuccessToast("Đăng xuất tài khoản thành công!");
    router.push("/login");
  };

  // Submit Profile update
  const handleProfileSubmit = async (data: ProfileInput) => {
    if (!currentUserId) return;
    try {
      await updateUserMutation.mutateAsync({
        id: currentUserId,
        dto: data as any
      });
      showSuccessToast("Cập nhật thông tin tài khoản thành công!");
    } catch (err: any) {
      showErrorToast(err.message || "Không thể cập nhật hồ sơ");
    }
  };

  // Submit Password update
  const handlePasswordSubmit = async (data: SecurityInput) => {
    setUpdatingPassword(true);
    try {
      // Simulate API call delay (in actual integration, call password update mutation here)
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      showSuccessToast("Thay đổi mật khẩu tài khoản thành công!");
    } catch (err: any) {
      showErrorToast(err.message || "Không thể thay đổi mật khẩu");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (userLoading) {
    return (
      <main className="flex-1 bg-[#FAFAF7] flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-body">Đang tải hồ sơ cá nhân...</p>
        </div>
      </main>
    );
  }

  const roleInfo = getRoleLabel(user?.roleId);

  return (
    <main className="flex-1 bg-[#FAFAF7] overflow-x-hidden">
      <Section className="!py-24 md:!py-32">
        <Container>

          {/* Header Title with Eyebrow tag */}
          <div className="mb-14 text-left">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#8C6A00] bg-[#D4AF37]/5 font-body">
              Quản trị cá nhân
            </span>
            <h1 className="text-[32px] md:text-[44px] font-bold font-display uppercase tracking-wide text-primary mt-4 mb-2">
              Tài Khoản Thành Viên
            </h1>
            <p className="text-slate-500 text-[14px] md:text-[15px] font-body max-w-xl">
              Chào mừng quay trở lại, {user?.fullName || "Thành viên"}. Quản lý hồ sơ cá nhân và kiểm tra trạng thái đơn đặt hàng.
            </p>
          </div>

          {/* TWO COLUMN DASHBOARD LAYOUT: Sidebar (3 cols) + Main Panel (9 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Sidebar Navigation */}
            <div className="lg:col-span-3">
              <ProfileSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                fullName={user?.fullName || "Thành viên"}
                roleId={user?.roleId}
                handleLogout={handleLogout}
              />
            </div>

            {/* RIGHT COLUMN: Dynamic Main Content Pane */}
            <div className="lg:col-span-9 h-full">
              {activeTab === "profile" && (
                <ProfileForm
                  user={user}
                  updatingProfile={updateUserMutation.isPending}
                  handleProfileSubmit={handleProfileSubmit}
                  roleLabel={roleInfo.text}
                />
              )}

              {activeTab === "orders" && (
                <OrdersTable
                  orders={mockOrders}
                  showSuccessToast={showSuccessToast}
                />
              )}

              {activeTab === "security" && (
                <SecurityForm
                  updatingPassword={updatingPassword}
                  handlePasswordSubmit={handlePasswordSubmit}
                />
              )}
            </div>

          </div>

        </Container>
      </Section>
    </main>
  );
}
