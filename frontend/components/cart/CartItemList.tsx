import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { sharedProducts } from "@/data/products";
import { CartItem } from "@/hooks/useCart";

interface CartItemListProps {
  cartItems: CartItem[];
  onQtyChange: (id: string, size: string, change: number) => void;
  onSizeChange: (id: string, oldSize: string, newSize: string) => void;
  onRemoveItem: (id: string, size: string) => void;
  onClearAll: () => void;
  subtotal: number;
  shippingFee: number;
  total: number;
  onBack: () => void;
}

export function CartItemList({
  cartItems,
  onQtyChange,
  onSizeChange,
  onRemoveItem,
  onClearAll,
  subtotal,
  shippingFee,
  total,
  onBack
}: CartItemListProps) {
  const getProductSizeOptions = (id: string) => {
    const p = sharedProducts.find((item) => item.id === id);
    if (!p) return ["Hộp 6 hũ"];
    return p.category.includes("Yến sào")
      ? ["Hộp 50g", "Hộp 100g"]
      : ["Hộp 1 hũ", "Hộp 6 hũ", "Hộp 12 hũ"];
  };

  const getProductDesc = (id: string) => {
    const p = sharedProducts.find((item) => item.id === id);
    return p ? p.category : "Yến sào dinh dưỡng";
  };

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="lg:col-span-8 lg:sticky lg:top-32 bg-white border border-[#E5E5E5]/60 rounded-xs p-6 md:p-8 shadow-xs flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#4A4A4A] hover:text-primary transition-colors cursor-pointer select-none self-start mb-2"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Quay lại</span>
      </button>

      <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]/60">
        <h1 className="text-[24px] md:text-[28px] font-bold font-display text-primary flex items-center gap-2.5">
          <span>Giỏ hàng</span>
        </h1>

        {cartItems.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[13px] text-red-500 hover:text-red-700 font-semibold cursor-pointer select-none transition-colors"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1} />
          <h3 className="text-[18px] font-bold font-display text-[#1C1C1C] mb-2">Giỏ hàng trống</h3>
          <p className="text-[14px] text-muted-foreground font-body max-w-sm mb-6">
            Không có sản phẩm nào trong giỏ hàng của bạn. Hãy quay lại trang sản phẩm để lựa chọn các hộp yến sào bổ dưỡng.
          </p>
          <Link href="/products">
            <CtaButton>Đến cửa hàng</CtaButton>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cart Table headers (Desktop) */}
          <div className="hidden sm:grid grid-cols-12 gap-4 text-[12px] font-bold text-[#8C8C8C] uppercase tracking-wider pb-2 border-b border-[#E5E5E5]/40 font-body pr-4">
            <div className="col-span-5">Sản phẩm</div>
            <div className="col-span-3 text-center">Quy cách</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-right">Tổng giá</div>
          </div>

          {/* Item Rows */}
          <div className="flex flex-col gap-6 divide-y divide-[#E5E5E5]/40 max-h-[340px] lg:max-h-[420px] overflow-y-auto pr-2 [scrollbar-gutter:stable]">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-4 items-center ${
                  index > 0 ? "pt-6" : ""
                }`}
              >
                {/* 1. Image & metadata */}
                <div className="col-span-1 sm:col-span-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xs overflow-hidden border border-[#E5E5E5]/60 shrink-0 bg-[#FFF9EE]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.id}`}
                      className="text-[14px] md:text-[15px] font-bold text-[#1C1C1C] hover:text-accent transition-colors block truncate font-display"
                    >
                      {item.name}
                    </Link>
                    <span className="text-[12px] text-gray-400 block font-body mt-0.5">
                      {getProductDesc(item.id)}
                    </span>
                  </div>
                </div>

                {/* 2. Size Dropdown */}
                <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-center items-center">
                  <span className="sm:hidden text-[13px] font-bold text-gray-500 font-body">Quy cách:</span>
                  <select
                    value={item.size}
                    onChange={(e) => onSizeChange(item.id, item.size, e.target.value)}
                    className="bg-white border border-[#E5E5E5] rounded-xs px-3 py-1.5 text-[13px] font-medium font-body text-[#4A4A4A] focus:outline-none focus:border-primary/40 cursor-pointer select-none shadow-2xs"
                  >
                    {getProductSizeOptions(item.id).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Quantity Selector */}
                <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                  <span className="sm:hidden text-[13px] font-bold text-gray-500 font-body">Số lượng:</span>
                  <div className="flex items-center border border-[#E5E5E5] rounded-full bg-white h-[36px] px-1 shadow-2xs">
                    <button
                      onClick={() => onQtyChange(item.id, item.size, -1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-[13px] font-body text-[#1C1C1C]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, item.size, 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 4. Total Price and Remove button */}
                <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center gap-4">
                  <span className="sm:hidden text-[13px] font-bold text-gray-500 font-body">Tổng giá:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-bold text-accent font-display">
                      {formatVND(item.priceVal * item.quantity)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id, item.size)}
                      className="p-1 rounded-md text-gray-400 hover:text-red-500 transition-colors cursor-pointer active:scale-90"
                      aria-label="Xóa sản phẩm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Totals area */}
          <div className="border-t border-[#E5E5E5]/60 pt-6 mt-4 flex flex-col items-end gap-3 font-body text-[14px]">
            <div className="flex justify-between w-full sm:w-[300px]">
              <span className="text-gray-500">Tạm tính:</span>
              <span className="font-semibold text-[#1C1C1C]">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-[300px]">
              <span className="text-gray-500">Vận chuyển:</span>
              <span className="font-semibold text-green-600">
                {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
              </span>
            </div>
            <div className="border-t border-[#E5E5E5]/60 pt-3 flex justify-between w-full sm:w-[300px] items-center">
              <span className="font-bold text-primary">Tổng cộng:</span>
              <span className="font-bold text-accent text-[18px] font-display">{formatVND(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
