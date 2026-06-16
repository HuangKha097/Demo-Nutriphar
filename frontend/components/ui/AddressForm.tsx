"use client";

import { useState, useEffect } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Plus, X } from "lucide-react";

export interface AddressData {
  name: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

interface AddressFormProps {
  onSave: (data: AddressData) => void;
  onCancel: () => void;
}

export function AddressForm({ onSave, onCancel }: AddressFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [streetDetails, setStreetDetails] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) setProvinces(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedWard("");
    setWards([]);

    if (provinceId) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${provinceId}.htm`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) setWards(data.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSaveAddress = () => {
    const pName = provinces.find((p) => p.id === selectedProvince)?.full_name || "";
    const wName = wards.find((w) => w.id === selectedWard)?.full_name || "";
    const fullAddress = `${streetDetails}, ${wName}, ${pName}`.replace(/^,\s*/, "");

    if (customerName && customerPhone && fullAddress) {
      onSave({
        name: customerName,
        phone: customerPhone,
        fullAddress,
        isDefault
      });
    }
  };

  return (
    <div className="border border-dashed border-[#E5E5E5] rounded-xl p-5 bg-[#FAFAF7] font-body w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Họ và tên người nhận"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full bg-white border border-[#E5E5E5] px-3.5 py-2 text-[13.5px] rounded-lg focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 shadow-sm"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full bg-white border border-[#E5E5E5] px-3.5 py-2 text-[13.5px] rounded-lg focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="w-full bg-white border border-[#E5E5E5] px-3.5 py-2 text-[13.5px] text-gray-700 rounded-lg focus:outline-none focus:border-primary/40 shadow-sm"
        >
          <option value="">Tỉnh/Thành phố</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.full_name}</option>
          ))}
        </select>

        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          disabled={!selectedProvince || wards.length === 0}
          className="w-full bg-white border border-[#E5E5E5] px-3.5 py-2 text-[13.5px] text-gray-700 rounded-lg focus:outline-none focus:border-primary/40 shadow-sm disabled:bg-gray-50"
        >
          <option value="">Phường/Xã</option>
          {wards.map((w) => (
            <option key={w.id} value={w.id}>{w.full_name || w.display_name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <textarea
          rows={3}
          placeholder="Địa chỉ chi tiết (Số nhà, đường...)"
          value={streetDetails}
          onChange={(e) => setStreetDetails(e.target.value)}
          className="w-full bg-white border border-[#E5E5E5] px-3.5 py-2 text-[13.5px] rounded-lg focus:outline-none focus:border-primary/40 shadow-sm resize-none"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer mb-5 text-[13.5px] text-slate-700">
        <input 
          type="checkbox" 
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary" 
        />
        Đặt làm địa chỉ mặc định
      </label>

      <div className="flex gap-3">
        <CtaButton
          onClick={handleSaveAddress}
          icon={<Plus className="w-4 h-4 text-white" />}
          className="bg-accent hover:bg-[#8B1215] h-10"
          iconWrapperClassName="w-8 h-8"
        >
          Lưu địa chỉ
        </CtaButton>
        <CtaButton
          onClick={onCancel}
          className="bg-primary hover:bg-[#12224F] h-10"
          icon={<X className="w-4 h-4 text-white " />}
          iconWrapperClassName="w-8 h-8"
        >
          Hủy
        </CtaButton>
      </div>
    </div>
  );
}
