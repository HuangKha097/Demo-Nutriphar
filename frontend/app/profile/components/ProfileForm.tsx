"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  MapPin,
  Save
} from "lucide-react";
import {
  PremiumCard,
  DoubleBezelInput,
  DoubleBezelTextarea
} from "./ProfileUI";
import { CtaButton } from "@/components/ui/CtaButton";
import { profileSchema, type ProfileInput } from "@/services/user.service";

interface ProfileFormProps {
  user: any;
  updatingProfile: boolean;
  handleProfileSubmit: (data: ProfileInput) => Promise<void>;
  roleLabel: string;
}

export function ProfileForm({
  user,
  updatingProfile,
  handleProfileSubmit,
  roleLabel
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      address: user?.address || "",
    }
  });

  // Sync form default values when user query finishes loading asynchronously
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  return (
    <PremiumCard>
      <div className="flex flex-col gap-6 w-full text-left">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E5E5]/30">
          <div className="w-9 h-9 rounded-lg bg-[#1A2F6B]/5 flex items-center justify-center text-primary">
            <UserIcon className="w-4 h-4" strokeWidth={1.2} />
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-primary font-display uppercase tracking-wide">
              Hồ Sơ Cá Nhân
            </h2>
            <p className="text-[12px] text-slate-500 font-body">
              Cập nhật thông tin liên lạc và địa chỉ giao hàng của bạn.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleProfileSubmit)} className="flex flex-col gap-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoubleBezelInput
              id="fullName"
              label="Họ và Tên"
              type="text"
              placeholder="Nhập họ và tên..."
              icon={UserIcon}
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <DoubleBezelInput
              id="email"
              label="Địa Chỉ Email"
              type="email"
              value={user?.email || ""}
              placeholder="example@mail.com"
              icon={Mail}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoubleBezelInput
              id="phone"
              label="Số Điện Thoại"
              type="text"
              placeholder="Nhập số điện thoại..."
              icon={Phone}
              error={errors.phone?.message}
              {...register("phone")}
            />
            <DoubleBezelInput
              id="role"
              label="Vai Trò Hệ Thống"
              type="text"
              value={roleLabel}
              disabled
              icon={Shield}
            />
          </div>

          <DoubleBezelTextarea
            id="address"
            label="Địa Chỉ Giao Hàng Mặc Định"
            placeholder="Nhập địa chỉ chi tiết..."
            icon={MapPin}
            error={errors.address?.message}
            {...register("address")}
          />

          <div className="flex justify-end pt-2">
            <CtaButton
              type="submit"
              icon={<Save className="h-4 w-4 text-white" />}
              className="w-60 justify-between bg-primary hover:bg-[#12224F]"
              disabled={updatingProfile}
            >
              {updatingProfile ? "Đang lưu..." : "Lưu thay đổi"}
            </CtaButton>
          </div>
        </form>
      </div>
    </PremiumCard>
  );
}
