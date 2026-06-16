"use client";

import React, { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import { AddressForm, AddressData } from "@/components/ui/AddressForm";

export function ProfileAddresses() {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường Lê Lợi, Phường Bến Nghé (Quận 1), Thành phố Hồ Chí Minh",
      isDefault: true
    }
  ]);
  const [showNewForm, setShowNewForm] = useState(false);

  const handleAddAddress = (data: AddressData) => {
    const newAddress = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      address: data.fullAddress,
      isDefault: data.isDefault
    };
    
    if (data.isDefault) {
      setAddresses(addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress));
    } else {
      setAddresses([...addresses, newAddress]);
    }
    
    setShowNewForm(false);
  };

  return (
    <div className="bg-white border border-[#E5E5E5]/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] rounded-xs p-6 sm:p-8 flex flex-col h-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#E5E5E5]/60 gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-primary font-display mb-1 uppercase tracking-wider">
            Địa chỉ giao hàng
          </h2>
          <p className="text-[13px] text-slate-500 font-body">
            Quản lý địa chỉ giao hàng và thông tin liên hệ của bạn
          </p>
        </div>
        {!showNewForm && (
          <CtaButton
            onClick={() => setShowNewForm(true)}
            icon={<Plus className="w-4 h-4 text-white" />}
            className="bg-accent hover:bg-[#8B1215] text-[13px] h-[40px] px-6"
          >
            Thêm địa chỉ mới
          </CtaButton>
        )}
      </div>

      {showNewForm && (
        <div className="mb-8">
          <h3 className="text-[16px] font-bold text-primary mb-4 font-display">Thêm địa chỉ mới</h3>
          <AddressForm 
            onSave={handleAddAddress}
            onCancel={() => setShowNewForm(false)}
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-[#E5E5E5] rounded-xl p-5 hover:border-primary/30 transition-colors relative">
            {addr.isDefault && (
              <span className="absolute top-5 right-5 text-[11px] font-bold text-primary bg-[#D4AF37]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Mặc định
              </span>
            )}
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAFAF7] border border-[#E5E5E5]/50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-bold text-primary">{addr.name}</span>
                  <div className="w-[1px] h-3.5 bg-gray-300" />
                  <span className="text-[14px] text-slate-600 font-medium">{addr.phone}</span>
                </div>
                
                <p className="text-[14px] text-slate-500 leading-relaxed pr-20">
                  {addr.address}
                </p>
                
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-[13px] font-semibold text-accent hover:text-[#8B1215] flex items-center gap-1.5 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Chỉnh sửa
                  </button>
                  {!addr.isDefault && (
                    <button className="text-[13px] font-semibold text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Xóa
                    </button>
                  )}
                  {!addr.isDefault && (
                    <button className="text-[13px] font-medium text-slate-500 hover:text-primary transition-colors border-l border-gray-200 pl-4 ml-2">
                      Thiết lập mặc định
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
