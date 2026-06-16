'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-products-query";
import { useCategoryOptions } from "@/hooks/use-categories-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { Product } from "@/types";
import { ProductTable } from "./components/ProductTable";
import { ProductDialog } from "./components/ProductDialog";
import { type ProductInput } from "@/services/product.service";

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
    <div className="space-y-6">
      <ProductTable
        products={paginatedProducts}
        categories={categories}
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
