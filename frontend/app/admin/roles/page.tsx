'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

import { can, emptyPermissions, type Permissions } from "@/lib/permissions";
import { roleCreateSchema, type RoleCreateInput } from "@/lib/schemas";
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from "@/hooks/use-roles-query";
import { useUsers } from "@/hooks/use-users-query";
import { usePermissions } from "@/hooks/use-permissions";
import type { Role } from "@/types/role";
import { Pagination } from "@/components/pagination";
import { useAuth } from "@/contexts/auth-context";

const RESOURCES = ["products", "categories", "users", "roles", "news"] as const;
const ACTIONS = ["view", "create", "edit", "delete"] as const;

export default function RolesPage() {
  const { currentUserId } = useAuth();
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission("roles", "create");
  const canEdit = hasPermission("roles", "edit");
  const canDelete = hasPermission("roles", "delete");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [perms, setPerms] = useState<Permissions>(emptyPermissions());
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

  const form = useForm<RoleCreateInput>({
    resolver: zodResolver(roleCreateSchema) as any,
    defaultValues: { roleName: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ roleName: editing?.roleName ?? "" });
      setPerms(editing && editing.permissions ? JSON.parse(JSON.stringify(editing.permissions)) : emptyPermissions());
    }
  }, [open, editing, form]);

  const userCount = (id: string) => users.filter((u) => u.roleId === id).length;

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (r: Role) => { setEditing(r); setOpen(true); };

  const onSubmit = async (values: RoleCreateInput) => {
    try {
      const dto = {
        roleName: values.roleName,
        permissions: perms,
      };
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, dto });
        toast.success("Đã cập nhật vai trò thành công");
      } else {
        await createMutation.mutateAsync(dto);
        toast.success("Đã tạo vai trò thành công");
      }
      setOpen(false);
    } catch (err) {
      console.error("Save role failed:", err);
      toast.error("Thao tác vai trò thất bại");
    }
  };

  const toggle = (resource: typeof RESOURCES[number], action: typeof ACTIONS[number]) => {
    setPerms((p: Permissions) => ({
      ...p,
      [resource]: { ...p[resource], [action]: !p[resource][action] },
    }));
  };

  return (
    <div className="space-y-6 text-foreground py-4 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Phân quyền</span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">Vai trò & Quyền hạn</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {canCreate && (
            <Button
              className="rounded-full px-6 py-2 bg-[#1A2F6B] hover:bg-[#A4161A] text-white shadow-sm font-semibold tracking-wide h-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              onClick={openNew}
            >
              <Plus className="h-4 w-4 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              <span>Vai trò mới</span>
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
                  <TableHead className="pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Tên vai trò</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Người dùng</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Quyền hạn</TableHead>
                  <TableHead className="w-24 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRoles.map((r: Role) => {
                  const summary = RESOURCES.flatMap((res) =>
                    ACTIONS.filter((a) => r.permissions?.[res]?.[a]).map(() => res),
                  );
                  const totalGranted = summary.length;
                  return (
                    <TableRow key={r.id} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                      <TableCell className="pl-6 py-4 font-semibold text-primary capitalize font-display text-[15px]">{r.roleName}</TableCell>
                      <TableCell className="font-medium text-[#4A4A4A] font-body py-4">{userCount(r.id)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-body py-4">{totalGranted} / {RESOURCES.length * ACTIONS.length} được cấp</TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {canEdit && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(r)}
                              className="rounded-full w-8 h-8 hover:bg-gray-100 transition-colors"
                            >
                              <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-primary" />
                            </Button>
                          )}
                          {canDelete && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(r.id)}
                              className="rounded-full w-8 h-8 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-[#A4161A] hover:text-[#D7263D]" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {paginatedRoles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-16 font-body">
                      Không tìm thấy vai trò nào
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

      {/* Role Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-[2rem] max-w-2xl p-8 border-none bg-white shadow-2xl overflow-y-auto max-h-[90dvh]">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-display font-semibold text-2xl text-[#1A2F6B]">
              {editing ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Tên vai trò</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl border-[#E5E5E5] bg-white h-11 focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] transition-all font-body text-sm" {...field} />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">Quyền hạn</Label>
                <div className="overflow-x-auto rounded-[1.5rem] border border-[#E5E5E5] bg-white shadow-3xs">
                  <table className="w-full text-sm font-body">
                    <thead className="bg-[#E5E5E5]/25 border-b border-[#E5E5E5]">
                      <tr>
                        <th className="p-3 text-left font-semibold text-[#1A2F6B]">Tài nguyên</th>
                        {ACTIONS.map((a) => <th key={a} className="p-3 text-center font-semibold text-[#1A2F6B] capitalize">{a}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {RESOURCES.map((res) => (
                        <tr key={res} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                          <td className="p-3 capitalize font-semibold text-gray-700">{res}</td>
                          {ACTIONS.map((a) => (
                            <td key={a} className="p-3 text-center">
                              <Checkbox
                                checked={perms[res]?.[a] || false}
                                onCheckedChange={() => toggle(res, a)}
                                className="rounded border-gray-300 text-[#1A2F6B] focus:ring-[#1A2F6B]"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <DialogFooter className="pt-4 border-t border-[#E5E5E5]/60 gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-full px-6 h-11 text-xs font-bold font-body cursor-pointer transition-all border-gray-200 hover:bg-red-500 text-red-500">Hủy</Button>
                <Button type="submit" className="rounded-full px-6 h-11 text-xs font-bold font-body bg-[#1A2F6B] hover:bg-[#A4161A] text-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm">Lưu lại</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
              onClick={async () => {
                if (deleteId) {
                  try {
                    await deleteMutation.mutateAsync(deleteId);
                    toast.success("Đã xóa vai trò thành công");
                  } catch (err) {
                    console.error("Delete role failed:", err);
                    toast.error("Xóa vai trò thất bại");
                  }
                  setDeleteId(null);
                }
              }}
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
