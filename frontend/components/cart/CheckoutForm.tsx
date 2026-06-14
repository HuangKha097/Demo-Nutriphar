import { useState } from "react";
import { CreditCard, Wallet, Truck, ShoppingCart } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { useToast } from "@/context/ToastContext";

interface CheckoutFormProps {
  cartItemsCount: number;
  onSubmit: (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    orderNote: string;
    paymentMethod: "cod" | "bank" | "card";
    cardName?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
  }) => void;
}

export function CheckoutForm({ cartItemsCount, onSubmit }: CheckoutFormProps) {
  const { error: showErrorToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank" | "card">("cod");

  // Delivery details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");

  // Card details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItemsCount === 0) {
      showErrorToast("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        showErrorToast("Vui lòng nhập đầy đủ thông tin thẻ tín dụng!");
        return;
      }
      onSubmit({
        customerName: cardName,
        customerPhone: "N/A",
        customerAddress: "Thanh toán thẻ trực tuyến",
        orderNote: "Thanh toán thẻ",
        paymentMethod,
        cardName,
        cardNumber,
        cardExpiry,
        cardCvv
      });
    } else {
      if (!customerName || !customerPhone || !customerAddress) {
        showErrorToast("Vui lòng nhập đầy đủ thông tin giao hàng!");
        return;
      }
      onSubmit({
        customerName,
        customerPhone,
        customerAddress,
        orderNote,
        paymentMethod
      });
    }
  };

  return (
    <div className="lg:col-span-4 bg-[#FAFAF7] border border-[#E5E5E5]/60 rounded-xs p-6 md:p-8 shadow-sm">
      <h2 className="text-[20px] font-bold font-display text-primary pb-4 border-b border-[#E5E5E5]/60 mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-accent shrink-0" />
        <span>Thông tin thanh toán</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* 1. Payment Methods Select */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold text-primary uppercase tracking-wide font-body">
            Phương thức thanh toán
          </span>

          <div className="flex flex-col gap-2">
            {/* COD Option */}
            <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E5E5] rounded-xs cursor-pointer hover:border-[#D4AF37]/50 transition-colors select-none">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#4A4A4A] font-body">
                <Truck className="w-4 h-4 text-[#8C6A00]" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </div>
            </label>

            {/* Bank Transfer Option */}
            <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E5E5] rounded-xs cursor-pointer hover:border-[#D4AF37]/50 transition-colors select-none">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#4A4A4A] font-body">
                <Wallet className="w-4 h-4 text-[#8C6A00]" />
                <span>Chuyển khoản ngân hàng (QR)</span>
              </div>
            </label>

            {/* Credit Card Option */}
            <label className="flex items-center gap-3 p-3 bg-white border border-[#E5E5E5] rounded-xs cursor-pointer hover:border-[#D4AF37]/50 transition-colors select-none">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#4A4A4A] font-body">
                <CreditCard className="w-4 h-4 text-[#8C6A00]" />
                <span>Thẻ tín dụng quốc tế</span>
              </div>
            </label>
          </div>
        </div>

        {/* 2. Customer inputs based on payment type */}
        {paymentMethod !== "card" ? (
          <div className="flex flex-col gap-4 pt-2 border-t border-[#E5E5E5]/60 mt-1">
            <span className="text-[13px] font-bold text-primary uppercase tracking-wide font-body block mb-1">
              Thông tin giao hàng
            </span>

            {/* Recipient Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Họ và tên người nhận
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập họ và tên..."
                className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Recipient Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Số điện thoại nhận hàng
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Nhập số điện thoại..."
                className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Recipient Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Địa chỉ nhận hàng
              </label>
              <textarea
                required
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
                rows={3}
                className="w-full p-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Order Note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Ghi chú đơn hàng (Tùy chọn)
              </label>
              <input
                type="text"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Ví dụ: giao giờ hành chính..."
                className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </div>
        ) : (
          // Credit Card Form
          <div className="flex flex-col gap-4 pt-2 border-t border-[#E5E5E5]/60 mt-1">
            <span className="text-[13px] font-bold text-primary uppercase tracking-wide font-body block mb-1">
              Chi tiết thẻ tín dụng
            </span>

            {/* Name On Card */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Tên trên thẻ (Name On Card)
              </label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="NGUYEN VAN A"
                className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors uppercase"
              />
            </div>

            {/* Card Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                Số thẻ (Card Number)
              </label>
              <input
                type="text"
                required
                maxLength={19}
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim()
                  )
                }
                placeholder="4111 2222 3333 4444"
                className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Expiration and CVV grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Expiration Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                  Ngày hết hạn
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "");
                    if (val.length > 2) {
                      val = val.substring(0, 2) + "/" + val.substring(2, 4);
                    }
                    setCardExpiry(val);
                  }}
                  placeholder="MM/YY"
                  className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors text-center"
                />
              </div>

              {/* CVV */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-gray-500 font-body uppercase tracking-wider">
                  Mã CVV
                </label>
                <input
                  type="password"
                  required
                  maxLength={3}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                  placeholder="•••"
                  className="w-full h-[40px] px-4 bg-white border border-[#E5E5E5] rounded-xs text-[13.5px] font-body outline-none focus:border-primary/40 transition-colors text-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit button wrapper */}
        <div className="pt-4 border-t border-[#E5E5E5]/60 mt-2">
          <CtaButton
            type="submit"
            disabled={cartItemsCount === 0}
            icon={<ShoppingCart className="w-4 h-4 text-white" />}
            className="w-full bg-accent hover:bg-[#8B1215]"
          >
            Xác nhận đặt hàng
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
