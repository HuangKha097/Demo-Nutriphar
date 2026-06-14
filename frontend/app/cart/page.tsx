"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/hooks/useCart";
import { CartItemList } from "@/components/cart/CartItemList";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { OrderSuccess } from "@/components/cart/OrderSuccess";

export default function CartPage() {
  const router = useRouter();
  const { success: showSuccessToast } = useToast();
  const {
    mounted,
    cartItems,
    subtotal,
    shippingFee,
    total,
    handleQtyChange,
    handleSizeChange,
    handleRemoveItem,
    handleClearAll,
    clearCartOnCheckoutSuccess
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastOrderInfo, setLastOrderInfo] = useState<any>(null);

  const handleCheckoutSubmit = (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    orderNote: string;
    paymentMethod: "cod" | "bank" | "card";
  }) => {
    const orderId = "NP" + Math.floor(100000 + Math.random() * 900000);
    const orderInfo = {
      orderId,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      paymentMethod: {
        cod: "Thanh toán khi nhận hàng (COD)",
        bank: "Chuyển khoản ngân hàng (QR)",
        card: "Thẻ tín dụng quốc tế"
      }[orderData.paymentMethod],
      items: [...cartItems],
      subtotal,
      shippingFee,
      total,
      date: new Date().toLocaleDateString("vi-VN")
    };

    // Note: Here is where we can easily integrate backend APIs or payment gateways!
    // Example: fetch("/api/orders", { method: "POST", body: JSON.stringify(orderInfo) })

    setLastOrderInfo(orderInfo);
    clearCartOnCheckoutSuccess();
    setCheckoutSuccess(true);
    showSuccessToast("Đặt hàng thành công!");
  };

  if (!mounted) {
    return (
      <main className="flex-1 bg-background pt-32">
        <Container className="text-center py-20">
          <div className="animate-pulse text-gray-400">Đang tải giỏ hàng...</div>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-background">
      <Section className="!pt-32 !pb-16 md:!pt-40 md:!pb-24">
        <Container>
          {checkoutSuccess && lastOrderInfo ? (
            <div className="max-w-3xl mx-auto">
              <OrderSuccess orderInfo={lastOrderInfo} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <CartItemList
                cartItems={cartItems}
                onQtyChange={handleQtyChange}
                onSizeChange={handleSizeChange}
                onRemoveItem={handleRemoveItem}
                onClearAll={handleClearAll}
                subtotal={subtotal}
                shippingFee={shippingFee}
                total={total}
                onBack={() => router.back()}
              />
              <CheckoutForm
                cartItemsCount={cartItems.length}
                onSubmit={handleCheckoutSubmit}
              />
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
