'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories-query";
import { useProducts } from "@/hooks/use-products-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { Category } from "@/types";
import { CategoryTable } from "./components/CategoryTable";
import { CategoryDialog } from "./components/CategoryDialog";
import { type CategoryInput } from "@/services/category.service";

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
    <div className="space-y-6">
      <CategoryTable
        categories={paginatedCategories}
        getProductCount={getProductCount}
        canCreate={canCreate}
        canEdit={canEdit}
        canDelete={canDelete}
        query={query}
        onQueryChange={(val) => {
          setQuery(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize) || 1}
        onPageChange={setCurrentPage}
        onNew={openNew}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />

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
