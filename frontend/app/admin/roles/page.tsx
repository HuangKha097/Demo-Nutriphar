'use client';

import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from "@/hooks/use-roles-query";
import { useUsers } from "@/hooks/use-users-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { Role } from "@/types/role";
import { RoleTable } from "./components/RoleTable";
import { RoleDialog } from "./components/RoleDialog";
import { type RoleCreateInput } from "@/services/role.service";

export default function RolesPage() {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("roles", "create");
  const canEdit = hasPermission("roles", "edit");
  const canDelete = hasPermission("roles", "delete");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: rolesData } = useRoles();
  const paginatedRoles = rolesData || [];
  const totalItems = rolesData?.length || 0;

  const { data: usersData } = useUsers({ limit: 1000 });
  const users = usersData?.data || [];

  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const deleteMutation = useDeleteRole();

  const userCount = (id: string) => users.filter((u) => u.roleId === id).length;

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (r: Role) => { setEditing(r); setOpen(true); };

  const handleSave = async (dto: RoleCreateInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, dto: dto as any });
        toast.success("Đã cập nhật vai trò thành công");
      } else {
        await createMutation.mutateAsync(dto as any);
        toast.success("Đã tạo vai trò thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save role failed:", err);
      toast.error("Thao tác vai trò thất bại");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Đã xóa vai trò thành công");
    } catch (err) {
      console.error("Delete role failed:", err);
      toast.error("Xóa vai trò thất bại");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <RoleTable
        roles={paginatedRoles}
        userCount={userCount}
        canCreate={canCreate}
        canEdit={canEdit}
        canDelete={canDelete}
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize) || 1}
        onPageChange={setCurrentPage}
        onNew={openNew}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />

      {/* Role Dialog */}
      <RoleDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        role={editing}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-[1.5rem] p-6 max-w-sm border-none bg-white shadow-2xl animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-[#1C1C1C] text-lg font-semibold">Xóa vai trò?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#4A4A4A] text-sm">
              Những người dùng được gán vai trò này sẽ mất toàn bộ quyền truy cập.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel className="rounded-full px-5 py-2 h-9 text-xs font-semibold cursor-pointer border-gray-200">Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-full px-5 py-2 h-9 text-xs font-semibold bg-[#A4161A] hover:bg-[#D7263D] text-white cursor-pointer transition-colors duration-300"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
