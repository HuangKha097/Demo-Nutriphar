'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from "@/components/ui/form";

import { userCreateSchema, userEditSchema, type UserEditInput as UserInput } from "@/lib/schemas";
import type { User } from "@/types";

import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/hooks/use-users-query";
import { useRoles } from "@/hooks/use-roles-query";
import { usePermissions } from "@/hooks/use-permissions";
import { Pagination } from "@/components/pagination";

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
    <div className="space-y-4 text-foreground">
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Tìm kiếm người dùng…" value={query} onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1);
        }} className="max-w-xs bg-card" />
        {canCreate && (
          <Button className="ml-auto" onClick={openNew}>
            <Plus className="h-4 w-4" /> Người dùng mới
          </Button>
        )}
      </div>
      <Card className="flex flex-col max-h-[calc(100vh-190px)] min-h-[400px]">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{u.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="capitalize">{u.role?.roleName || "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : "—"}</TableCell>
                  <TableCell className="text-right">
                    {canEdit && (
                      <Button variant="ghost" size="icon" onClick={() => openEdit(u)}>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(u.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {paginatedUsers.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">Không tìm thấy người dùng nào</TableCell></TableRow>
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

      <UserDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        user={editing}
        onSave={handleSave}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa người dùng?</AlertDialogTitle>
            <AlertDialogDescription>Hành động này không thể hoàn tác.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function UserDialog({
  open, onOpenChange, user, onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  user: User | null;
  onSave: (data: UserInput) => void;
}) {
  const { data: rolesData } = useRoles();
  const roles = rolesData || [];

  const form = useForm<UserInput>({
    resolver: zodResolver(user ? userEditSchema : userCreateSchema) as any,
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      password: "",
      roleId: user?.roleId ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        fullName: user?.fullName ?? "",
        email: user?.email ?? "",
        password: "",
        roleId: user?.roleId ?? "",
      });
    }
  }, [open, user, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</DialogTitle>
          <DialogDescription>Nhập thông tin người dùng. Lưu ý về mật khẩu.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  {user && <FormDescription>Để trống nếu muốn giữ nguyên mật khẩu hiện tại.</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Chọn vai trò" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((r) => <SelectItem key={r.id} value={r.id}>{r.roleName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
