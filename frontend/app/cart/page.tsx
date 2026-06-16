"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/hooks/useCart";
import { CheckoutAddressForm } from "@/components/cart/CheckoutAddressForm";
import { CheckoutSummaryCard } from "@/components/cart/CheckoutSummaryCard";
import { OrderSuccess } from "@/components/cart/OrderSuccess";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const {
    mounted,
    cartItems,
    subtotal,
    shippingFee,
    total,
    clearCartOnCheckoutSuccess
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastOrderInfo, setLastOrderInfo] = useState<any>(null);

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) {
      showErrorToast("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (!customerName || !customerPhone || !customerAddress) {
      showErrorToast("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const orderId = "NP" + Math.floor(100000 + Math.random() * 900000);
    const orderInfo = {
      orderId,
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod: {
        cod: "Thanh toán khi nhận hàng (COD)",
        bank: "Chuyển khoản ngân hàng (QR)",
        card: "Thẻ tín dụng quốc tế"
      }[paymentMethod as "cod" | "bank" | "card"] || "Thanh toán",
      items: [...cartItems],
      subtotal,
      shippingFee,
      total,
      date: new Date().toLocaleDateString("vi-VN")
    };

    setLastOrderInfo(orderInfo);
    clearCartOnCheckoutSuccess();
    setCheckoutSuccess(true);
    showSuccessToast("Đặt hàng thành công!");
  };

  if (!mounted) {
    return (
      <main className="flex-1 bg-background pt-32">
        <Container className="text-center py-20">
          <div className="animate-pulse text-gray-400">Đang tải...</div>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-background">
      <Section className="!pt-32 !pb-16 md:!pt-36 md:!pb-24">
        <Container>
          {checkoutSuccess && lastOrderInfo ? (
            <div className="max-w-3xl mx-auto">
              <OrderSuccess orderInfo={lastOrderInfo} />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4 font-display">Giỏ hàng đang trống</h2>
              <p className="text-gray-500 mb-8 font-body">Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy chọn thêm sản phẩm nhé!</p>
              <div className="flex items-center justify-center gap-2">

                <Link href="/products">
                  <CtaButton
                    icon={<ShoppingCart className="h-4 w-4 text-white" />}
                    className="pl-5 pr-1.5 py-1 text-[13.5px] shadow-sm bg-primary hover:bg-[#12224F]"
                  >
                    Tiếp tục mua sắm
                  </CtaButton>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-[1100px] mx-auto">
              <div className="mb-6 flex flex-col items-start gap-4">
                <div>
                  <h1 className="text-[28px] md:text-[36px] font-bold font-display text-primary mb-2">Checkout</h1>
                  <p className="text-[14px] text-gray-500 font-body">Pay securely via bank transfer using VietQR (SePay). Prices are verified against our catalog.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <CheckoutAddressForm
                    orderNote={orderNote}
                    setOrderNote={setOrderNote}
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    customerPhone={customerPhone}
                    setCustomerPhone={setCustomerPhone}
                    customerAddress={customerAddress}
                    setCustomerAddress={setCustomerAddress}
                  />
                </div>
                <div className="lg:col-span-5">
                  <CheckoutSummaryCard
                    onCheckoutSubmit={handleCheckoutSubmit}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
