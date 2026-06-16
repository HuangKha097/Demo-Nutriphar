"use client";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/Pagination";
import type { User } from "@/types";

interface UserTableProps {
  users: User[];
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  query: string;
  onQueryChange: (val: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNew: () => void;
  onEdit: (u: User) => void;
  onDelete: (id: string) => void;
}

export function UserTable({
  users,
  canCreate,
  canEdit,
  canDelete,
  query,
  onQueryChange,
  currentPage,
  totalPages,
  onPageChange,
  onNew,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="space-y-6 text-foreground py-4 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Hệ thống</span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">Quản lý người dùng</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Keyword Search */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm người dùng…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full border-[#E5E5E5] bg-white text-[13px] focus-visible:ring-[#1A2F6B] focus-visible:border-[#1A2F6B] h-10 shadow-2xs font-body transition-all duration-300"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {canCreate && (
            <Button
              className="rounded-full px-6 py-2 bg-[#1A2F6B] hover:bg-[#A4161A] text-white shadow-sm font-semibold tracking-wide h-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              onClick={onNew}
            >
              <Plus className="h-4 w-4 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              <span>Người dùng mới</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Table Layout with Double-Bezel */}
      <div className="bg-[#E5E5E5]/25 border border-[#E5E5E5]/40 p-2 rounded-[2rem] shadow-xs">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col min-h-[400px]">
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#E5E5E5]/60 hover:bg-transparent">
                  <TableHead className="pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Họ tên</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Email</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Vai trò</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Cập nhật</TableHead>
                  <TableHead className="w-24 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                    <TableCell className="pl-6 py-4 font-semibold text-primary max-w-[200px] truncate font-display text-[15px]" title={u.fullName}>
                      {u.fullName}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-body py-4">{u.email}</TableCell>
                    <TableCell className="capitalize font-medium text-gray-700 font-body py-4">{u.role?.roleName || "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-body py-4">
                      {u.updatedAt ? new Date(u.updatedAt).toLocaleDateString("vi-VN") : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(u)}
                            className="rounded-full w-8 h-8 hover:bg-gray-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-primary" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(u.id)}
                            className="rounded-full w-8 h-8 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#A4161A] hover:text-[#D7263D]" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-16 font-body">
                      Không tìm thấy người dùng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-[#E5E5E5]/60 bg-neutral-50/50 px-6 py-4 rounded-b-[calc(2rem-0.5rem)]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
