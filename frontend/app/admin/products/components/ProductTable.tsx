"use client";

import { Search, Plus, Package, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/Pagination";
import type { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  categories: { id: string; name: string }[];
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  query: string;
  onQueryChange: (val: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNew: () => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({
  products,
  categories,
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
}: ProductTableProps) {
  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-6 text-foreground py-4 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#D4AF37] font-body">Quản lý</span>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1A2F6B] font-display">Sản phẩm dược phẩm</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Keyword Search */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm sản phẩm…"
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
              <span>Sản phẩm mới</span>
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
                  <TableHead className="w-20 pl-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Hình ảnh</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Sản phẩm</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Danh mục</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Giá bán</TableHead>
                  <TableHead className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-body">Cập nhật</TableHead>
                  <TableHead className="w-24 pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id} className="border-b border-[#E5E5E5]/40 hover:bg-[#E0F1FC]/10 transition-colors duration-300">
                    <TableCell className="pl-6 py-4">
                      {/* Image Double-Bezel Wrapper */}
                      <div className="bg-[#E5E5E5]/20 border border-[#E5E5E5]/40 p-1 rounded-xl shadow-3xs flex items-center justify-center shrink-0 w-12 h-12">
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-50 flex items-center justify-center">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[280px] py-4">
                      <div className="font-semibold text-[#1C1C1C] truncate font-display text-[15px]" title={p.name}>{p.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2 break-all font-body mt-0.5" title={p.description}>
                        {p.description}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#4A4A4A] font-body py-4">{catName(p.categoryId)}</TableCell>
                    <TableCell className="font-bold text-[#A4161A] font-display py-4">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(p.priceVal ?? p.price ?? 0))}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-body py-4">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("vi-VN") : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(p)}
                            className="rounded-full w-8 h-8 hover:bg-gray-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-primary" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(p.id)}
                            className="rounded-full w-8 h-8 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#A4161A] hover:text-[#D7263D]" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-16 font-body">
                      Không tìm thấy sản phẩm dược phẩm nào
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
