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
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { categorySchema, type CategoryInput } from "@/services/category.service";
import type { Category } from "@/types";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  category: Category | null;
  onSave: (data: CategoryInput) => void;
}

export function CategoryDialog({
  open, onOpenChange, category, onSave,
}: CategoryDialogProps) {
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: {
      name: category?.name ?? "",
      image: category?.image ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name ?? "",
        image: category?.image ?? "",
      });
    }
  }, [open, category, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-md p-8 border-none bg-white shadow-2xl overflow-y-auto max-h-[90dvh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-display font-semibold text-2xl text-[#1A2F6B]">
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
          <DialogDescription className="font-body text-[#4A4A4A] text-[13px]">
            Điền các thuộc tính để phân nhóm các dòng sản phẩm của bạn.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Tên danh mục</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Đường dẫn hình ảnh (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="/images/example.png" className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} value={field.value ?? ""} />
                  </FormControl>
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
