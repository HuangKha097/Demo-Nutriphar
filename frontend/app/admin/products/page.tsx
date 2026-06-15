'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Package, Search } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

import { productSchema, type ProductInput } from "@/lib/schemas";
import type { Product } from "@/types";

import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-products-query";
import { useCategoryOptions } from "@/hooks/use-categories-query";
import { usePermissions } from "@/hooks/use-permissions";
import { Pagination } from "@/components/pagination";

const NONE = "__none__";

export default function ProductsPage() {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("products", "create");
  const canEdit = hasPermission("products", "edit");
  const canDelete = hasPermission("products", "delete");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: categoriesData } = useCategoryOptions();
  const categories = categoriesData || [];

  const { data: productsData } = useProducts({ page: currentPage, limit: pageSize, search: debouncedQuery });
  const paginatedProducts = productsData?.data || [];
  const totalItems = productsData?.total || 0;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "—";

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (p: Product) => { setEditing(p); setOpen(true); };

  const handleSave = async (data: ProductInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, dto: data });
        toast.success("Đã cập nhật sản phẩm thành công");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Đã thêm sản phẩm thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save product failed:", err);
      toast.error("Thao tác sản phẩm thất bại");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Đã xóa sản phẩm thành công");
    } catch (err) {
      console.error("Delete product failed:", err);
      toast.error("Xóa sản phẩm thất bại");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 text-foreground py-4 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Quản lý</span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">Sản phẩm dược phẩm</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Keyword Search */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm sản phẩm…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 rounded-full border-[#E5E5E5] bg-white text-[13px] focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] h-10 shadow-2xs font-body transition-all duration-300"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {canCreate && (
            <Button
              className="rounded-full px-6 py-2 bg-[#1A2F6B] hover:bg-[#A4161A] text-white shadow-sm font-semibold tracking-wide h-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              onClick={openNew}
            >
              <Plus className="h-4 w-4 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              <span>Sản phẩm mới</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Table Layout with Double-Bezel */}
      <div className="bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-xs">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E5E5E5]/60 hover:bg-transparent">
                  <TableHead className="w-20 pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Hình ảnh</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Sản phẩm</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Danh mục</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Giá bán</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Cập nhật</TableHead>
                  <TableHead className="w-24 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((p) => (
                  <TableRow key={p.id} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                    <TableCell className="pl-6 py-4">
                      {/* Image Double-Bezel Wrapper */}
                      <div className="bg-[#E5E5E5]/20 border border-[#E5E5E5]/40 p-1 rounded-xl shadow-3xs flex items-center justify-center shrink-0 w-12 h-12">
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-50 flex items-center justify-center">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[280px] py-4">
                      <div className="font-semibold text-[#1C1C1C] truncate font-display text-[15px]" title={p.name}>{p.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2 break-all font-body mt-0.5" title={p.description}>
                        {p.description}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#4A4A4A] font-body py-4">{catName(p.categoryId)}</TableCell>
                    <TableCell className="font-bold text-[#A4161A] font-display py-4">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(p.priceVal ?? p.price ?? 0))}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-body py-4">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("vi-VN") : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(p)}
                            className="rounded-full w-8 h-8 hover:bg-gray-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-primary" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(p.id)}
                            className="rounded-full w-8 h-8 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#A4161A] hover:text-[#D7263D]" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-16 font-body">
                      Không tìm thấy sản phẩm dược phẩm nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-[#E5E5E5]/60 bg-neutral-50/50 px-6 py-4 rounded-b-[calc(2rem-0.5rem)]">
            <Pagination
              totalItems={totalItems}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>

      {/* Product Edit / Add Dialog */}
      <ProductDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        product={editing}
        categories={categories}
        onSave={handleSave}
      />

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 max-w-sm border-none bg-white shadow-2xl animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[#1C1C1C] text-lg font-semibold">Xóa sản phẩm này?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#4A4A4A] text-sm">
              Hành động này không thể hoàn tác và sẽ loại bỏ sản phẩm khỏi cửa hàng trực tuyến.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel className="rounded-full px-5 py-2 h-9 text-xs font-semibold cursor-pointer border-gray-200">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-full px-5 py-2 h-9 text-xs font-semibold bg-[#A4161A] hover:bg-[#D7263D] text-white cursor-pointer transition-colors duration-300"
            >
              Xóa bỏ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProductDialog({
  open, onOpenChange, product, categories, onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  product: Product | null;
  categories: { id: string; name: string }[];
  onSave: (data: ProductInput) => void;
}) {
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
