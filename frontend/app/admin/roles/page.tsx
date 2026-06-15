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
    <div className="space-y-4 text-foreground">
      <div className="flex items-center">
        {canCreate && <Button className="ml-auto" onClick={openNew}><Plus className="h-4 w-4" /> Vai trò mới</Button>}
      </div>
      <Card className="flex flex-col max-h-[calc(100vh-190px)] min-h-[400px]">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên vai trò</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Quyền hạn</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRoles.map((r: Role) => {
                const summary = RESOURCES.flatMap((res) =>
                  ACTIONS.filter((a) => r.permissions?.[res]?.[a]).map(() => res),
                );
                const totalGranted = summary.length;
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium capitalize">{r.roleName}</TableCell>
                    <TableCell>{userCount(r.id)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{totalGranted} / {RESOURCES.length * ACTIONS.length} được cấp</TableCell>
                    <TableCell className="text-right">
                      {canEdit && <Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="h-4 w-4 text-muted-foreground" /></Button>}
                      {canDelete && <Button variant="ghost" size="icon" onClick={() => setDeleteId(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedRoles.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-8">Không tìm thấy vai trò nào</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-background">
          <DialogHeader><DialogTitle>{editing ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên vai trò</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label className="mb-2 block">Quyền hạn</Label>
                <div className="overflow-x-auto rounded-md border bg-card">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-2 text-left font-medium">Tài nguyên</th>
                        {ACTIONS.map((a) => <th key={a} className="p-2 text-center font-medium capitalize">{a}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {RESOURCES.map((res) => (
                        <tr key={res} className="border-t">
                          <td className="p-2 capitalize font-medium">{res}</td>
                          {ACTIONS.map((a) => (
                            <td key={a} className="p-2 text-center">
                              <Checkbox checked={perms[res]?.[a] || false} onCheckedChange={() => toggle(res, a)} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa vai trò?</AlertDialogTitle>
            <AlertDialogDescription>Những người dùng được gán vai trò này sẽ mất toàn bộ quyền truy cập.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
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
            }}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
