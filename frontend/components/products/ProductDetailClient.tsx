"use client";

import { useState } from "react";
import { ShoppingCart, ShieldCheck, Heart, Truck, RefreshCcw, ArrowRight } from "lucide-react";
import { SharedProduct } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { CtaButton } from "@/components/ui/CtaButton";
import { SliderNavigation } from "@/components/ui/SliderNavigation";
import { StarRating } from "@/components/ui/StarRating";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

interface ProductDetailClientProps {
  product: SharedProduct;
  relatedProducts: SharedProduct[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "ingredients" | "usage">("desc");
  const defaultSize = product.category.includes("Yến sào") ? "Hộp 50g" : "Hộp 6 hũ";
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const { success: showSuccessToast } = useToast();

  const handlePrevImage = () => {
    if (!product.gallery || product.gallery.length <= 1) return;
    const currentIndex = product.gallery.indexOf(selectedImage);
    const prevIndex = currentIndex === -1
      ? product.gallery.length - 1
      : (currentIndex - 1 + product.gallery.length) % product.gallery.length;
    setSelectedImage(product.gallery[prevIndex]);
  };

  const handleNextImage = () => {
    if (!product.gallery || product.gallery.length <= 1) return;
    const currentIndex = product.gallery.indexOf(selectedImage);
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + 1) % product.gallery.length;
    setSelectedImage(product.gallery[nextIndex]);
  };

  const handleAddToCart = () => {
    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];
    const existingItemIndex = cart.findIndex(
      (item: any) => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceVal: product.priceVal,
        image: product.image,
        size: selectedSize,
        quantity: quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    showSuccessToast(`Đã thêm thành công ${quantity} ${selectedSize} của "${product.name}" vào giỏ hàng!`);
  };

  const sizesOptions = product.category.includes("Yến sào")
    ? ["Hộp 50g", "Hộp 100g"]
    : ["Hộp 1 hũ", "Hộp 6 hũ", "Hộp 12 hũ"];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 md:pb-0">
      {/* 1. Breadcrumbs */}
      <nav className="text-[12px] uppercase tracking-[0.15em] font-medium text-gray-400 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Sản phẩm
        </Link>
        <span>/</span>
        <span className="text-primary/70">{product.category}</span>
      </nav>

      {/* 2. Main Hero Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: Product Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4 w-full">
          {/* Main Image Container */}
          <div className="aspect-square rounded-xs flex items-center justify-center relative overflow-hidden group border border-[#E5E5E5]/60">
            {/* main image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            />

            {/* Navigation Arrows */}
            {product.gallery && product.gallery.length > 1 && (
              <SliderNavigation onPrev={handlePrevImage} onNext={handleNextImage} />
            )}
          </div>

          {/* Gallery Thumbnails Grid */}
          {product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 px-1">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-xs overflow-hidden border transition-all duration-300 select-none cursor-pointer ${selectedImage === img
                    ? "border-[#D4AF37] shadow-sm scale-95"
                    : "border-[#E5E5E5] hover:border-[#D4AF37]/50"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} gallery ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product details & buy controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            {/* Category Eyebrow Tag */}
            <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#D4AF37]/15 text-[#8C6A00] mb-4">
              {product.category}
            </span>

            {/* Product Title */}
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold font-display leading-[1.2] text-[#1C1C1C] mb-3">
              {product.name}
            </h1>

            {/* Rating & reviews */}
            <div className="flex items-center gap-4">
              <StarRating rating={product.rating} className="w-4 h-4" />
              <span className="text-[13px] text-gray-500 font-body">
                ({product.reviewCount} đánh giá từ khách hàng)
              </span>
            </div>
          </div>

          {/* Pricing bar */}
          <div className="flex items-baseline gap-4 py-3 border-y border-[#E5E5E5]/60">
            <span className="text-[28px] md:text-[32px] font-bold text-accent font-display">
              {product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-[16px] text-gray-400 line-through font-body">
                  {product.originalPrice}
                </span>
                <span className="bg-accent text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Giảm giá
                </span>
              </>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-[15px] text-gray-600 leading-relaxed font-body">
            {product.description}
          </p>

          {/* Size / Packing Options */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
              Quy cách đóng gói
            </span>
            <div className="flex flex-wrap gap-2">
              {sizesOptions.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-medium font-body transition-all duration-300 cursor-pointer select-none active:scale-95 ${selectedSize === sz
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-[#4A4A4A] border border-[#E5E5E5] hover:border-[#D4AF37]/50"
                    }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA row (Desktop) */}
          <div className="hidden md:flex flex-wrap items-center gap-4 pt-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#E5E5E5] rounded-full bg-white h-[48px] px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
              >
                -
              </button>
              <span className="w-10 text-center font-semibold text-[15px] font-body">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
              >
                +
              </button>
            </div>

            {/* Button-in-Button CTA */}
            <CtaButton
              onClick={handleAddToCart}
              icon={<ShoppingCart className="w-4 h-4 text-white" />}
              className="bg-accent hover:bg-[#8B1215]"
            >
              Thêm vào giỏ hàng
            </CtaButton>

            {/* Wishlist Button */}
            <button className="flex items-center justify-center w-[48px] h-[48px] rounded-full border border-[#E5E5E5] bg-white text-gray-400 hover:text-accent hover:border-accent transition-colors duration-300 select-none cursor-pointer active:scale-90">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Success Banner popup has been replaced by global high-end Toast */}

          {/* Value Props Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5]/60 mt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-xs bg-white border border-[#E5E5E5]/40">
              <Truck className="w-5 h-5 text-[#D4AF37] mb-2" />
              <span className="text-[12px] font-bold text-[#1C1C1C] font-body uppercase tracking-wider mb-0.5">Giao hàng</span>
              <span className="text-[11px] text-gray-500 font-body">Miễn phí từ 500K</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xs bg-white border border-[#E5E5E5]/40">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
              <span className="text-[12px] font-bold text-[#1C1C1C] font-body uppercase tracking-wider mb-0.5">Yến đảo thật</span>
              <span className="text-[11px] text-gray-500 font-body">Cam kết 100%</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xs bg-white border border-[#E5E5E5]/40">
              <RefreshCcw className="w-5 h-5 text-[#D4AF37] mb-2" />
              <span className="text-[12px] font-bold text-[#1C1C1C] font-body uppercase tracking-wider mb-0.5">Đổi trả</span>
              <span className="text-[11px] text-gray-500 font-body">Trong vòng 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Description Specs Tabs */}
      <div className="bg-white p-6 md:p-10 rounded-xs border border-[#E5E5E5]/60 shadow-xs w-full">
        {/* Tab buttons */}
        <div className="flex border-b border-[#E5E5E5] gap-8 mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-4 text-[15px] font-semibold font-body transition-colors cursor-pointer relative select-none ${activeTab === "desc" ? "text-primary" : "text-gray-400 hover:text-primary"
              }`}
          >
            Mô tả chi tiết
            {activeTab === "desc" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`pb-4 text-[15px] font-semibold font-body transition-colors cursor-pointer relative select-none ${activeTab === "ingredients" ? "text-primary" : "text-gray-400 hover:text-primary"
              }`}
          >
            Thành phần dinh dưỡng
            {activeTab === "ingredients" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`pb-4 text-[15px] font-semibold font-body transition-colors cursor-pointer relative select-none ${activeTab === "usage" ? "text-primary" : "text-gray-400 hover:text-primary"
              }`}
          >
            Hướng dẫn sử dụng
            {activeTab === "usage" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
            )}
          </button>
        </div>

        {/* Tab content panels */}
        <div className="text-[15px] text-gray-600 leading-[1.8] font-body">
          {activeTab === "desc" && (
            <div className="flex flex-col gap-6">
              <p>{product.ingredients}</p>
              <div className="flex flex-col gap-3 mt-4">
                <h4 className="text-[16px] font-bold text-primary uppercase tracking-wide">Công dụng chính:</h4>
                <ul className="list-disc pl-5 flex flex-col gap-2.5">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-4">
                <p>{product.ingredients}</p>
              </div>
              {/* Specifications table */}
              <div className="border border-[#E5E5E5] rounded-xs overflow-hidden bg-[#FAFAF7]">
                <table className="w-full text-[14px]">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={idx}
                        className={idx > 0 ? "border-t border-[#E5E5E5]" : ""}
                      >
                        <td className="px-4 py-3.5 font-bold text-primary bg-[#F5F0E8]/20 w-[40%]">
                          {key}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="flex flex-col gap-4">
              <p>{product.usage}</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products Section (Macro-Whitespace py-24) */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-8 pt-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]/60">
            <h2 className="text-[22px] md:text-[26px] font-bold font-display text-primary">
              Sản phẩm liên quan
            </h2>
            <Link
              href="/products"
              className="group text-[14px] font-semibold text-[#8C6A00] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                badge={p.badge}
                rating={p.rating}
                reviewCount={p.reviewCount}
                priceVal={p.priceVal}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5]/80 p-3 pb-5 flex items-center justify-between gap-3 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        {/* Quantity Selector */}
        <div className="flex items-center border border-[#E5E5E5] rounded-full bg-white h-[44px] px-2 shrink-0">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-[14px] font-body">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 select-none cursor-pointer active:scale-90"
          >
            +
          </button>
        </div>

        {/* Buy Button */}
        <CtaButton
          onClick={handleAddToCart}
          icon={<ShoppingCart className="w-4 h-4 text-white" />}
          className="flex-1 h-[44px] justify-center pl-6 pr-1.5 py-1 text-[14px] bg-accent hover:bg-[#8B1215]"
        >
          Mua ngay
        </CtaButton>
      </div>
    </div>
  );
}
