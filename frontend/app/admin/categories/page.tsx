'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, FolderTree, Search } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

import { categorySchema, type CategoryInput } from "@/lib/schemas";
import type { Category } from "@/types";

import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories-query";
import { useProducts } from "@/hooks/use-products-query";
import { usePermissions } from "@/hooks/use-permissions";
import { Pagination } from "@/components/pagination";

export default function CategoriesPage() {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("categories", "create");
  const canEdit = hasPermission("categories", "edit");
  const canDelete = hasPermission("categories", "delete");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: categoriesData } = useCategories({ page: currentPage, limit: pageSize, search: debouncedQuery });
  const paginatedCategories = categoriesData?.data || [];
  const totalItems = categoriesData?.total || 0;

  const { data: allProductsData } = useProducts({ limit: 1000 });
  const allProducts = allProductsData?.data || [];

  const getProductCount = (catId: string) => {
    return allProducts.filter(p => p.categoryId === catId).length;
  };

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setOpen(true); };

  const handleSave = async (data: CategoryInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, dto: data });
        toast.success("Đã cập nhật danh mục thành công");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Đã thêm danh mục thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save category failed:", err);
      toast.error("Thao tác danh mục thất bại");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Đã xóa danh mục thành công");
    } catch (err) {
      console.error("Delete category failed:", err);
      toast.error("Xóa danh mục thất bại");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 text-foreground py-4 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Cấu trúc</span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">Danh mục sản phẩm</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm danh mục…"
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
              <span>Danh mục mới</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Table with Double Bezel */}
      <div className="bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-xs">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E5E5E5]/60 hover:bg-transparent">
                  <TableHead className="w-20 pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Hình ảnh</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Tên danh mục</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Số sản phẩm</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Cập nhật</TableHead>
                  <TableHead className="w-24 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((c) => (
                  <TableRow key={c.id} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                    <TableCell className="pl-6 py-4">
                      {/* Image Double-Bezel Wrapper */}
                      <div className="bg-[#E5E5E5]/20 border border-[#E5E5E5]/40 p-1 rounded-xl shadow-3xs flex items-center justify-center shrink-0 w-12 h-12">
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-50 flex items-center justify-center">
                          {c.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.image}
                              alt={c.name}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <FolderTree className="h-5 w-5 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-primary max-w-[220px] truncate font-display text-[15px] py-4" title={c.name}>
                      {c.name}
                    </TableCell>
                    <TableCell className="font-medium text-[#4A4A4A] font-body py-4">
                      {getProductCount(c.id)} sản phẩm
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-body py-4">
                      {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString("vi-VN") : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(c)}
                            className="rounded-full w-8 h-8 hover:bg-gray-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-primary" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(c.id)}
                            className="rounded-full w-8 h-8 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#A4161A] hover:text-[#D7263D]" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedCategories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-16 font-body">
                      Không tìm thấy danh mục nào
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

      {/* Category Dialog */}
      <CategoryDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        category={editing}
        onSave={handleSave}
      />

      {/* Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 max-w-sm border-none bg-white shadow-2xl animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[#1C1C1C] text-lg font-semibold">Xóa danh mục này?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#4A4A4A] text-sm">
              Tất cả các sản phẩm thuộc danh mục này sẽ tạm thời bị hủy liên kết danh mục.
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

function CategoryDialog({
  open, onOpenChange, category, onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  category: Category | null;
  onSave: (data: CategoryInput) => void;
}) {
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
