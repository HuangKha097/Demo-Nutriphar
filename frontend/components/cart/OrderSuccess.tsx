import Link from "next/link";
import { CheckCircle2, Building } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";

interface OrderSuccessProps {
  orderInfo: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paymentMethod: string;
    total: number;
  };
}

export function OrderSuccess({ orderInfo }: OrderSuccessProps) {
  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="bg-white border border-[#E5E5E5]/60 rounded-xs p-8 md:p-12 shadow-md text-center flex flex-col items-center gap-6 animate-toast-in">
      <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
        <CheckCircle2 className="h-10 w-10 animate-bounce" strokeWidth={1.5} />
      </div>

      <div>
        <h2 className="text-[28px] font-bold font-display text-primary uppercase tracking-wide mb-2">
          Đặt Hàng Thành Công!
        </h2>
        <p className="text-gray-500 font-body text-[14px]">
          Cảm ơn bạn đã lựa chọn Nutriphar. Đơn hàng của bạn đã được ghi nhận vào hệ thống.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="w-full bg-[#FAFAF7] border border-[#E5E5E5]/60 rounded-xs p-6 text-left flex flex-col gap-4 font-body text-[14px]">
        <div className="flex justify-between items-center border-b border-[#E5E5E5]/60 pb-3">
          <span className="font-bold text-primary">Mã đơn hàng:</span>
          <span className="font-bold text-accent font-display text-[16px]">{orderInfo.orderId}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Khách hàng:</span>
          <span className="font-medium text-[#1C1C1C]">{orderInfo.customerName}</span>
        </div>

        {orderInfo.customerPhone !== "N/A" && (
          <div className="flex justify-between">
            <span className="text-gray-500">Số điện thoại:</span>
            <span className="font-medium text-[#1C1C1C]">{orderInfo.customerPhone}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-500">Địa chỉ nhận hàng:</span>
          <span className="font-medium text-[#1C1C1C] max-w-[65%] text-right break-words">
            {orderInfo.customerAddress}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Phương thức thanh toán:</span>
          <span className="font-medium text-primary">{orderInfo.paymentMethod}</span>
        </div>

        <div className="flex justify-between border-t border-[#E5E5E5]/60 pt-3">
          <span className="font-bold text-primary">Tổng cộng:</span>
          <span className="font-bold text-accent text-[16px]">{formatVND(orderInfo.total)}</span>
        </div>

        {orderInfo.paymentMethod.includes("Chuyển khoản") && (
          <div className="mt-4 p-4 bg-amber-50/50 border border-amber-200/60 rounded-xs text-[13px] text-amber-800 leading-relaxed flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Building className="w-4 h-4 shrink-0" />
              <span>Thông tin tài khoản nhận tiền:</span>
            </div>
            <div>
              <p>• Ngân hàng: <strong>Vietcombank (Chi nhánh Khánh Hòa)</strong></p>
              <p>• Số tài khoản: <strong>1024567899</strong></p>
              <p>• Chủ tài khoản: <strong>CÔNG TY TNHH NUTRIPHAR</strong></p>
              <p>• Nội dung chuyển khoản: <strong className="text-accent">NUTRIPHAR {orderInfo.orderId}</strong></p>
            </div>
            <p className="text-[12px] text-amber-700 italic border-t border-amber-200/40 pt-2">
              * Đơn hàng sẽ được xử lý ngay sau khi hệ thống nhận được giao dịch chuyển khoản từ quý khách.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4 w-full sm:w-auto mt-2">
        <Link href="/products" className="w-full sm:w-auto">
          <CtaButton className="w-full justify-center">Tiếp tục mua sắm</CtaButton>
        </Link>
      </div>
    </div>
  );
}
