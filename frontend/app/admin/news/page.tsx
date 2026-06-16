'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useAuth } from "@/contexts/auth-context";
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from "@/hooks/use-news-query";
import { usePermissions } from "@/hooks/use-permissions";
import { useUsers } from "@/hooks/use-users-query";
import type { News } from "@/types";
import { NewsTable } from "./components/NewsTable";
import { NewsDialog } from "./components/NewsDialog";
import { type NewsInput } from "@/services/news.service";

export default function NewsPage() {
  const { currentUserId } = useAuth();
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("news", "create");
  const canEdit = hasPermission("news", "edit");
  const canDelete = hasPermission("news", "delete");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const [editing, setEditing] = useState<News | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: newsData } = useNews({ page: currentPage, limit: pageSize, search: debouncedQuery });
  const paginatedNews = newsData?.data || [];
  const totalItems = newsData?.total || 0;

  const { data: usersData } = useUsers({ limit: 1000 });
  const users = usersData?.data || [];

  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const deleteMutation = useDeleteNews();

  const authorName = (id: string | undefined) => {
    if (!id) return "Admin Nutriphar";
    return users.find((u) => u.id === id)?.fullName ?? "Admin Nutriphar";
  };

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (n: News) => { setEditing(n); setOpen(true); };

  const handleSave = async (data: NewsInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, dto: data });
        toast.success("Đã cập nhật tin tức thành công");
      } else {
        await createMutation.mutateAsync({ ...data, authorId: currentUserId ?? "1" });
        toast.success("Đã thêm tin tức thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save news failed:", err);
      toast.error("Thao tác tin tức thất bại");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Đã xóa tin tức thành công");
    } catch (err) {
      console.error("Delete news failed:", err);
      toast.error("Xóa tin tức thất bại");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <NewsTable
        news={paginatedNews}
        authorName={authorName}
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

      {/* News Dialog */}
      <NewsDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        news={editing}
        onSave={handleSave}
      />

      {/* Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 max-w-sm border-none bg-white shadow-2xl animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[#1C1C1C] text-lg font-semibold">Xóa bài viết này?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#4A4A4A] text-sm">
              Hành động này không thể hoàn tác và sẽ gỡ bỏ bài viết khỏi trang tin tức của khách hàng.
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
