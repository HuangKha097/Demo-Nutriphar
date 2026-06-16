"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { roleCreateSchema, type RoleCreateInput } from "@/services/role.service";
import { emptyPermissions, type Permissions } from "@/lib/permissions";
import type { Role } from "@/types/role";

const RESOURCES = ["products", "categories", "users", "roles", "news"] as const;
const ACTIONS = ["view", "create", "edit", "delete"] as const;

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  role: Role | null;
  onSave: (values: RoleCreateInput) => void;
}

export function RoleDialog({
  open, onOpenChange, role, onSave,
}: RoleDialogProps) {
  const [perms, setPerms] = useState<Permissions>(emptyPermissions());

  const form = useForm<RoleCreateInput>({
    resolver: zodResolver(roleCreateSchema) as any,
    defaultValues: { roleName: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ roleName: role?.roleName ?? "" });
      setPerms(role && role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : emptyPermissions());
    }
  }, [open, role, form]);

  const toggle = (resource: typeof RESOURCES[number], action: typeof ACTIONS[number]) => {
    setPerms((p: Permissions) => ({
      ...p,
      [resource]: { ...p[resource], [action]: !p[resource][action] },
    }));
  };

  const handleSubmit = (values: RoleCreateInput) => {
    onSave({
      roleName: values.roleName,
      permissions: perms,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2rem] max-w-2xl p-8 border-none bg-white shadow-2xl overflow-y-auto max-h-[90dvh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-display font-semibold text-2xl text-[#1A2F6B]">
            {role ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-full px-6 h-11 text-xs font-bold font-body cursor-pointer transition-all border-gray-200 hover:bg-red-500 text-red-500">Hủy</Button>
              <Button type="submit" className="rounded-full px-6 h-11 text-xs font-bold font-body bg-[#1A2F6B] hover:bg-[#A4161A] text-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm">Lưu lại</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
