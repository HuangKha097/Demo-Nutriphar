"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Save } from "lucide-react";
import {
  PremiumCard,
  DoubleBezelInput
} from "./ProfileUI";
import { CtaButton } from "@/components/ui/CtaButton";
import { securitySchema, type SecurityInput } from "@/services/user.service";

interface SecurityFormProps {
  updatingPassword: boolean;
  handlePasswordSubmit: (data: SecurityInput) => Promise<void>;
}

export function SecurityForm({
  updatingPassword,
  handlePasswordSubmit
}: SecurityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SecurityInput>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: SecurityInput) => {
    try {
      await handlePasswordSubmit(data);
      reset();
    } catch (err) {
      // Errors are handled by the parent mutation or caller
      console.error(err);
    }
  };

  return (
    <PremiumCard>
      <div className="flex flex-col gap-6 w-full text-left">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E5E5]/30">
          <div className="w-9 h-9 rounded-lg bg-[#1A2F6B]/5 flex items-center justify-center text-primary">
            <Key className="w-4 h-4" strokeWidth={1.2} />
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-primary font-display uppercase tracking-wide">
              Mật Khẩu & Bảo Mật
            </h2>
            <p className="text-[12px] text-slate-500 font-body">
              Quản lý mã khóa bảo vệ tài khoản thành viên của bạn.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoubleBezelInput
              id="oldPassword"
              label="Mật Khẩu Hiện Tại"
              type="password"
              placeholder="••••••••"
              icon={Key}
              error={errors.oldPassword?.message}
              {...register("oldPassword")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoubleBezelInput
              id="newPassword"
              label="Mật Khẩu Mới"
              type="password"
              placeholder="••••••••"
              icon={Key}
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />
            <DoubleBezelInput
              id="confirmPassword"
              label="Xác Nhận Mật Khẩu Mới"
              type="password"
              placeholder="••••••••"
              icon={Key}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="flex justify-end pt-2">
            <CtaButton
              type="submit"
              icon={<Save className="h-4 w-4 text-white" />}
              className="w-60 justify-between bg-primary hover:bg-[#12224F]"
              disabled={updatingPassword}
            >
              {updatingPassword ? "Đang xử lý..." : "Thay đổi mật khẩu"}
            </CtaButton>
          </div>
        </form>
      </div>
    </PremiumCard>
  );
}
