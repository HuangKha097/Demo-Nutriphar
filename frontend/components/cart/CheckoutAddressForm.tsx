"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { Plus, X, List } from "lucide-react";
import { AddressForm } from "@/components/ui/AddressForm";

interface CheckoutAddressFormProps {
  orderNote: string;
  setOrderNote: (note: string) => void;
  customerName: string;
  setCustomerName: (n: string) => void;
  customerPhone: string;
  setCustomerPhone: (p: string) => void;
  customerAddress: string;
  setCustomerAddress: (a: string) => void;
  hasSavedAddress?: boolean; // Mock property to toggle UI states
}

export function CheckoutAddressForm({
  orderNote,
  setOrderNote,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  hasSavedAddress = true
}: CheckoutAddressFormProps) {
  const router = useRouter();
  const [showAddressForm, setShowAddressForm] = useState(!hasSavedAddress);

  useEffect(() => {
    if (hasSavedAddress && !showAddressForm) {
      setCustomerName("Nguyễn Văn A");
      setCustomerPhone("0901234567");
      setCustomerAddress("123 Đường Lê Lợi, Phường Bến Nghé (Quận 1), Thành phố Hồ Chí Minh");
    } else {
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
    }
  }, [hasSavedAddress, showAddressForm, setCustomerName, setCustomerPhone, setCustomerAddress]);



  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Address Selection Card */}
      <div className="bg-white border border-[#E5E5E5]/60 rounded-xl p-5 shadow-sm font-body">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-4 gap-3">
          <div>
            <h3 className="text-[15px] font-bold text-primary mb-1">Chọn địa chỉ đã lưu</h3>
            <p className="text-[13px] text-gray-500">Thông tin giao hàng lấy từ sổ địa chỉ của bạn.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <CtaButton
              onClick={() => setShowAddressForm(!showAddressForm)}
              className=" py-1.5 px-3 text-[12px] whitespace-nowrap flex-1 sm:flex-none justify-center"
              icon={showAddressForm ? <List className="w-4 h-4 text-white shrink-0" /> : <Plus className="w-4 h-4 text-white shrink-0" />}
              iconWrapperClassName="w-6 h-6 shrink-0"
            >
              {showAddressForm ? "Dùng địa chỉ có sẵn" : "Thêm địa chỉ"}
            </CtaButton>
            <button
              onClick={() => router.push('/profile?tab=addresses')}
              className="px-3 py-1.5 bg-white border border-[#E5E5E5] text-slate-700 text-[12px] font-bold rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              Quản lý
            </button>
          </div>
        </div>

        {!hasSavedAddress && !showAddressForm && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-4 py-2.5 rounded-lg text-[13.5px] font-medium mb-4">
            Bạn chưa có địa chỉ đã lưu. Thêm địa chỉ trước khi thanh toán.
          </div>
        )}

        {hasSavedAddress && !showAddressForm && (
          <div className="bg-[#FAFAF7] border border-primary/20 rounded-xl p-4 mb-4 relative hover:border-primary/40 transition-colors cursor-pointer shadow-sm">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[11px] font-bold text-primary bg-[#D4AF37]/20 px-2 py-0.5 rounded uppercase tracking-wider">Mặc định</span>
            </div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-bold text-[15px] text-primary">Nguyễn Văn A</span>
              <div className="w-[1px] h-3.5 bg-gray-300"></div>
              <span className="text-[14px] text-gray-600 font-medium">0901234567</span>
            </div>
            <p className="text-[13.5px] text-gray-500 leading-relaxed pr-16">
              123 Đường Lê Lợi, Phường Bến Nghé (Quận 1), Thành phố Hồ Chí Minh
            </p>
          </div>
        )}

        {showAddressForm && (
          <AddressForm
            onSave={(data) => {
              setCustomerName(data.name);
              setCustomerPhone(data.phone);
              setCustomerAddress(data.fullAddress);
              setShowAddressForm(false);
            }}
            onCancel={() => setShowAddressForm(false)}
          />
        )}
      </div>

      {/* Order Note Block */}
      <div className="font-body w-full">
        <label className="text-[14px] font-bold text-[#1C1C1C] mb-2 block">
          Order note (optional)
        </label>
        <textarea
          rows={3}
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          placeholder="Thêm ghi chú giao hàng (ví dụ: giao giờ hành chính)..."
          className="w-full bg-white border border-[#E5E5E5]/60 px-4 py-3 text-[13.5px] rounded-xl focus:outline-none focus:border-primary/40 shadow-sm resize-none"
        />
      </div>
    </div>
  );
}
