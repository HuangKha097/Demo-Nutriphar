"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { productSchema, type ProductInput } from "@/services/product.service";
import type { Product } from "@/types";

const NONE = "__none__";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  product: Product | null;
  categories: { id: string; name: string }[];
  onSave: (data: ProductInput) => void;
}

export function ProductDialog({
  open, onOpenChange, product, categories, onSave,
}: ProductDialogProps) {
  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: Number(product?.priceVal ?? product?.price ?? 0),
      categoryId: product?.categoryId ?? null,
      image: product?.image ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: Number(product?.priceVal ?? product?.price ?? 0),
        categoryId: product?.categoryId ?? null,
        image: product?.image ?? "",
      });
    }
  }, [open, product, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-lg p-8 border-none bg-white shadow-2xl overflow-y-auto max-h-[90dvh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-display font-semibold text-2xl text-[#1A2F6B]">
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogDescription className="font-body text-[#4A4A4A] text-[13px]">
            Điền thông tin chi tiết sản phẩm để xuất bản lên hệ thống cửa hàng.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Mô tả chi tiết</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className="rounded-xl border-[#E5E5E5] bg-white focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm resize-none" {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Giá bán (VND)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1000"
                        className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Danh mục</FormLabel>
                    <Select
                      value={field.value ?? NONE}
                      onValueChange={(v) => field.onChange(v === NONE ? null : v)}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm"><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value={NONE} className="text-xs">— Trống —</SelectItem>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id} className="text-xs">{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>
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
