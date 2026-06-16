"use client";


import {
  User as UserIcon,
  ShoppingBag,
  Key,
  LogOut,
  MapPin
} from "lucide-react";
import { getRoleLabel } from "./ProfileUI";
import { CtaButton } from "@/components/ui/CtaButton";

interface ProfileSidebarProps {
  activeTab: "profile" | "orders" | "security" | "addresses";
  setActiveTab: (tab: "profile" | "orders" | "security" | "addresses") => void;
  fullName: string;
  roleId: string | undefined;
  handleLogout: () => void;
}

export function ProfileSidebar({
  activeTab,
  setActiveTab,
  fullName,
  roleId,
  handleLogout
}: ProfileSidebarProps) {
  const roleInfo = getRoleLabel(roleId);

  return (
    <div className="bg-white border border-[#E5E5E5]/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] rounded-xs p-6 relative overflow-hidden flex flex-col justify-between select-none text-left">

      {/* Sidebar Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#FAFAF7] border border-[#E5E5E5]/50 flex items-center justify-center font-bold font-display text-primary shadow-xs">
          {fullName ? fullName.substring(0, 2).toUpperCase() : "US"}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-primary font-display uppercase tracking-wide leading-tight line-clamp-1">
            {fullName}
          </span>
          <span className="text-[11px] text-slate-400 font-body">
            {roleInfo.text}
          </span>
        </div>
      </div>

      {/* Navigation Tabs List (Inner tab button: rounded-xl) */}
      <ul className="flex flex-col gap-2 w-full p-0 m-0 list-none">
        <li
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12.5px] font-bold uppercase tracking-wider font-body transition-all duration-300 text-left justify-start cursor-pointer ${activeTab === "profile"
            ? "bg-[#1A2F6B] text-white shadow-xs"
            : "bg-transparent text-slate-600 hover:bg-[#FAFAF7] hover:text-primary"
            }`}
        >
          <UserIcon className="w-4 h-4" strokeWidth={activeTab === "profile" ? 2 : 1.2} />
          <span>Thông tin tài khoản</span>
        </li>

        <li
          onClick={() => setActiveTab("orders")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12.5px] font-bold uppercase tracking-wider font-body transition-all duration-300 text-left justify-start cursor-pointer ${activeTab === "orders"
            ? "bg-[#1A2F6B] text-white shadow-xs"
            : "bg-transparent text-slate-600 hover:bg-[#FAFAF7] hover:text-primary"
            }`}
        >
          <ShoppingBag className="w-4 h-4" strokeWidth={activeTab === "orders" ? 2 : 1.2} />
          <span>Đơn hàng của tôi</span>
        </li>

        <li
          onClick={() => setActiveTab("addresses")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12.5px] font-bold uppercase tracking-wider font-body transition-all duration-300 text-left justify-start cursor-pointer ${activeTab === "addresses"
            ? "bg-[#1A2F6B] text-white shadow-xs"
            : "bg-transparent text-slate-600 hover:bg-[#FAFAF7] hover:text-primary"
            }`}
        >
          <MapPin className="w-4 h-4" strokeWidth={activeTab === "addresses" ? 2 : 1.2} />
          <span>Địa chỉ giao hàng</span>
        </li>

        <li
          onClick={() => setActiveTab("security")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12.5px] font-bold uppercase tracking-wider font-body transition-all duration-300 text-left justify-start cursor-pointer ${activeTab === "security"
            ? "bg-[#1A2F6B] text-white shadow-xs"
            : "bg-transparent text-slate-600 hover:bg-[#FAFAF7] hover:text-primary"
            }`}
        >
          <Key className="w-4 h-4" strokeWidth={activeTab === "security" ? 2 : 1.2} />
          <span>Bảo mật & Mật khẩu</span>
        </li>
      </ul>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#E5E5E5]/60 my-6" />

      {/* Logout Button */}
      <CtaButton
        icon={<LogOut className="h-4 w-4 text-white" />}
        className="w-60 justify-between bg-primary hover:bg-[#12224F]"
      >
        Đăng xuất
      </CtaButton>

    </div>
  );
}
