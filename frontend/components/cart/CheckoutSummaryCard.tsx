"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/context/ToastContext";
import { Banknote, ChevronDown, CreditCard, Landmark, Package, User } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import Link from "next/link";
import { OrderSuccess } from "@/components/cart/OrderSuccess";
import { sharedProducts } from "@/data/products";
import { Minus, Plus, X } from "lucide-react";

export function CheckoutSummaryCard({
  onCheckoutSubmit,
  paymentMethod,
  setPaymentMethod
}: {
  onCheckoutSubmit: () => void;
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
}) {
  const {
    cartItems,
    subtotal,
    shippingFee,
    total,
    handleQtyChange,
    handleSizeChange,
    handleRemoveItem
  } = useCart();
  const formatVND = (num: number) => num.toLocaleString("vi-VN") + " ₫";

  const getProductSizeOptions = (id: string) => {
    const p = sharedProducts.find((item) => item.id === id);
    if (!p) return ["Hộp 6 hũ"];
    return p.category.includes("Yến sào")
      ? ["Hộp 50g", "Hộp 100g"]
      : ["Hộp 1 hũ", "Hộp 6 hũ", "Hộp 12 hũ"];
  };

  return (
    <div className="bg-white border border-[#E5E5E5]/60 rounded-xl p-5 md:p-6 shadow-sm flex flex-col gap-6 sticky top-24">
      <div>
        <h2 className="text-[18px] font-bold text-primary font-display mb-1">Order summary</h2>
        <p className="text-[13px] text-gray-500 font-body">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
      </div>

      <div className="flex flex-col gap-5 max-h-[360px] overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4 items-start pb-4 border-b border-[#E5E5E5]/40 last:border-0 last:pb-0">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-[#FAFAF7] border border-[#E5E5E5] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[14px] font-bold text-primary truncate font-display">{item.name}</span>
                <button
                  onClick={() => handleRemoveItem(item.id, item.size)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-1 mb-2">
                <select
                  value={item.size}
                  onChange={(e) => handleSizeChange(item.id, item.size, e.target.value)}
                  className="bg-white border border-[#E5E5E5] rounded px-1.5 py-0.5 text-[12px] font-medium font-body text-[#4A4A4A] focus:outline-none focus:border-primary/40 cursor-pointer shadow-sm"
                >
                  {getProductSizeOptions(item.id).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="text-[13.5px] font-bold text-slate-800">
                  {formatVND(item.priceVal)}
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center border border-[#E5E5E5] rounded-md bg-white h-[28px] px-1">
                  <button
                    onClick={() => handleQtyChange(item.id, item.size, -1)}
                    className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-[12px] font-body text-[#1C1C1C]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(item.id, item.size, 1)}
                    className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E5E5E5]/60 pt-5">
        <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider mb-2 block">
          Payment method
        </label>
        <div className="relative">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full appearance-none bg-[#FAFAF7] border border-[#E5E5E5] text-[13.5px] font-medium text-[#1C1C1C] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 shadow-sm cursor-pointer"
          >
            <option value="bank">VietQR (bank transfer)</option>
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="card">Thẻ tín dụng quốc tế</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 font-body text-[14px]">
        <div className="flex justify-between w-full text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-[#1C1C1C]">{formatVND(subtotal)}</span>
        </div>
        {shippingFee > 0 && (
          <div className="flex justify-between w-full text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-[#1C1C1C]">{formatVND(shippingFee)}</span>
          </div>
        )}
        <div className="flex justify-between w-full items-center pt-2">
          <span className="font-bold text-[#1C1C1C] text-[15px]">Total</span>
          <span className="font-bold text-primary text-[18px]">{formatVND(total)}</span>
        </div>
      </div>

      <CtaButton
        onClick={onCheckoutSubmit}
        disabled={cartItems.length === 0}
        icon={
          paymentMethod === 'bank' ? (
            <Landmark className="h-4 w-4 text-white" />
          ) : (
            paymentMethod === 'cod' ? (
              <Banknote className="h-4 w-4 text-white" />
            ) : (
              <CreditCard className="h-4 w-4 text-white" />
            )
          )
        }
        className="w-full justify-between bg-primary hover:bg-[#12224F]"

      >
        {paymentMethod === 'bank' ? "Create invoice & show VietQR" : "Xác nhận đặt hàng"}
      </CtaButton>
    </div>
  );
}
