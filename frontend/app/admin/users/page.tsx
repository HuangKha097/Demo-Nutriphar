'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/hooks/use-users-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { User } from "@/types";
import { UserTable } from "./components/UserTable";
import { UserDialog } from "./components/UserDialog";
import { type UserEditInput as UserInput } from "@/services/user.service";

export default function UsersPage() {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("users", "create");
  const canEdit = hasPermission("users", "edit");
  const canDelete = hasPermission("users", "delete");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const [editing, setEditing] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: usersData } = useUsers({ page: currentPage, limit: pageSize, search: debouncedQuery });
  const paginatedUsers = usersData?.data || [];
  const totalItems = usersData?.total || 0;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (u: User) => { setEditing(u); setOpen(true); };

  const handleSave = async (data: UserInput) => {
    try {
      if (editing) {
        const payload: Partial<UserInput> = {
          fullName: data.fullName,
          email: data.email,
          roleId: data.roleId
        };
        if (data.password) {
          payload.password = data.password;
        }
        await updateMutation.mutateAsync({ id: editing.id, dto: payload as any });
        toast.success("Đã cập nhật người dùng thành công");
      } else {
        await createMutation.mutateAsync(data as any);
        toast.success("Đã thêm người dùng thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save user failed:", err);
      toast.error("Thao tác người dùng thất bại");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Đã xóa người dùng thành công");
    } catch (err) {
      console.error("Delete user failed:", err);
      toast.error("Xóa người dùng thất bại");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <UserTable
        users={paginatedUsers}
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

      {/* User Dialog */}
      <UserDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        user={editing}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 max-w-sm border-none bg-white shadow-2xl animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[#1C1C1C] text-lg font-semibold">Xóa người dùng?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#4A4A4A] text-sm">
              Hành động này không thể hoàn tác và tài khoản này sẽ bị xóa vĩnh viễn khỏi hệ thống.
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
