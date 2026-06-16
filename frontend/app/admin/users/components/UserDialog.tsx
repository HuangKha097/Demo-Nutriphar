"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from "@/components/ui/form";
import { userCreateSchema, userEditSchema, type UserEditInput as UserInput } from "@/services/user.service";
import { useRoles } from "@/hooks/use-roles-query";
import type { User } from "@/types";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  user: User | null;
  onSave: (data: UserInput) => void;
}

export function UserDialog({
  open, onOpenChange, user, onSave,
}: UserDialogProps) {
  const { data: rolesData } = useRoles();
  const roles = rolesData || [];

  const form = useForm<UserInput>({
    resolver: zodResolver(user ? userEditSchema : userCreateSchema) as any,
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      password: "",
      roleId: user?.roleId ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        fullName: user?.fullName ?? "",
        email: user?.email ?? "",
        password: "",
        roleId: user?.roleId ?? "",
      });
    }
  }, [open, user, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-md p-8 border-none bg-white shadow-2xl overflow-y-auto max-h-[90dvh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-display font-semibold text-2xl text-[#1A2F6B]">
            {user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </DialogTitle>
          <DialogDescription className="font-body text-[#4A4A4A] text-[13px]">
            Nhập thông tin người dùng. Lưu ý về mật khẩu.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Họ và tên</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                  </FormControl>
                  {user && <FormDescription className="text-[11px] text-gray-400">Để trống nếu muốn giữ nguyên mật khẩu hiện tại.</FormDescription>}
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Vai trò</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm"><SelectValue placeholder="Chọn vai trò" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((r) => <SelectItem key={r.id} value={r.id} className="cursor-pointer">{r.roleName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4 border-t border-[#E5E5E5]/60 gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-full px-6 h-11 text-xs font-bold font-body cursor-pointer transition-all border-gray-200 hover:bg-red-500 text-red-500">Hủy</Button>
              <Button type="submit" className="rounded-full px-6 h-11 text-xs font-bold font-body bg-[#1A2F6B] hover:bg-[#A4161A] text-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm">Lưu lại</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
