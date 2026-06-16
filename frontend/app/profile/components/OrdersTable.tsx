"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Calendar,
  Plus,
  ChevronDown
} from "lucide-react";
import { PremiumCard } from "./ProfileUI";
import { CtaButton } from "@/components/ui/CtaButton";
import { Pagination } from "@/components/ui/Pagination";

export interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: "Đang giao" | "Đã giao";
}

// Backward compatibility for existing imports
export type MockOrder = Order;

interface OrdersTableProps {
  orders: Order[];
  showSuccessToast?: (msg: string) => void;
  isLoading?: boolean;
}

const OrderRow = ({
  order,
  isExpanded,
  onToggle
}: {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <React.Fragment>
      <tr className="hover:bg-slate-50/30 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1A2F6B]/5 flex items-center justify-center text-primary">
              <ShoppingBag className="w-4 h-4" strokeWidth={1.2} />
            </div>
            <span className="text-[13px] font-bold font-display text-primary">
              {order.id}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col text-left">
            <span className="text-[13px] text-slate-700 font-body font-medium line-clamp-1 max-w-[280px]">
              {order.items}
            </span>
            <span className="text-[10px] text-slate-400 font-body mt-0.5">
              Ngày đặt: {order.date}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13.5px] font-semibold text-primary font-display">
          {order.total}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${order.status === "Đang giao"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-emerald-50 text-emerald-700 border-emerald-250"
            }`}>
            {order.status === "Đang giao" && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            )}
            {order.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-xs">
          <button
            onClick={onToggle}
            className="text-[12.5px] font-bold text-accent hover:text-[#8B1215] transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            Chi tiết
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={5} className="bg-slate-50 border-b border-[#E5E5E5]/60 p-0">
            <div className="px-6 py-5 text-[13px] text-slate-700 font-body">
              <div className="bg-white border border-[#E5E5E5]/50 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-primary mb-4 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Thông tin đơn hàng {order.id}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 text-xs">Sản phẩm:</span>
                      <span className="font-medium">{order.items}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 text-xs">Thành tiền:</span>
                      <span className="font-bold text-primary text-[14px]">{order.total}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 text-xs">Ngày đặt:</span>
                      <span className="font-medium">{order.date}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-400 text-xs">Tình trạng giao hàng:</span>
                      <span className="font-medium text-[#D4AF37]">{order.status}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export function OrdersTable({
  orders,
  showSuccessToast,
  isLoading = false
}: OrdersTableProps) {
  const router = useRouter();

  // Local Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Local Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Expanded order (only one at a time)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  // Reset to first page when search or status filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Filter orders locally based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredOrders.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  return (
    <PremiumCard>
      <div className="flex flex-col gap-6 w-full text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1A2F6B]/5 flex items-center justify-center text-primary">
              <ShoppingBag className="w-4 h-4" strokeWidth={1.2} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-primary font-display uppercase tracking-wide">
                Đơn Hàng Của Tôi
              </h2>
              <p className="text-[12px] text-slate-500 font-body">
                Theo dõi và rà soát các giao dịch mua hàng.
              </p>
            </div>
          </div>

          <CtaButton
            icon={<Plus className="h-4 w-4 text-white" />}
            className="w-60 justify-between bg-primary hover:bg-[#12224F]"
            onClick={() => router.push("/products")}
          >
            Mua sắm thêm
          </CtaButton>
        </div>

        {/* Filters and Search Area */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm mã đơn hàng hoặc sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF7] border border-[#E5E5E5]/75 pl-10 pr-4 py-2.5 text-sm text-slate-800 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37]/35 transition-all font-body"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap text-left">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400 font-body">
              Bộ lọc:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAFAF7] border border-[#E5E5E5] px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 font-body focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã hoàn thành</option>
            </select>
            <div className="bg-[#FAFAF7] border border-[#E5E5E5] px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 font-body flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.2} />
              <span>Mọi thời gian</span>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto w-full border border-[#E5E5E5]/60 rounded-xl bg-white shadow-xs min-h-[360px]">
          <table className="w-full min-w-[600px] border-collapse text-left relative">
            <thead>
              <tr className="bg-[#FAFAF7] border-b border-[#E5E5E5]/60">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-body">Mã đơn</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-body">Sản phẩm</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-body">Tổng tiền</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-body">Trạng thái</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-body text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]/30">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400 font-body">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400 italic font-body">
                    Không tìm thấy đơn hàng nào khớp với tìm kiếm.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    isExpanded={expandedOrder === order.id}
                    onToggle={() => toggleOrder(order.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / pageSize) || 1}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </PremiumCard>
  );
}
