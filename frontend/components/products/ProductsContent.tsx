"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { Search, Filter, RefreshCw, X, Star, ChevronDown } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";

const categories = [
  "Tất cả",
  "Yến sào Khánh Hòa",
  "Yến chưng sẵn",
  "Nước yến dinh dưỡng",
  "Quà tặng cao cấp"
];

const priceFilters = [
  { label: "Tất cả giá", min: 0, max: 99999999 },
  { label: "Dưới 500.000đ", min: 0, max: 500000 },
  { label: "500.000đ - 1.500.000đ", min: 500000, max: 1500000 },
  { label: "1.500.000đ - 3.000.000đ", min: 1500000, max: 3000000 },
  { label: "Trên 3.000.000đ", min: 3000000, max: 99999999 }
];

export function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceFilters[0]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync category from URL search parameters
  useEffect(() => {
    if (categoryParam) {
      const decodedCat = decodeURIComponent(categoryParam);
      if (categories.includes(decodedCat)) {
        setSelectedCategory(decodedCat);
      }
    } else {
      setSelectedCategory("Tất cả");
    }
  }, [categoryParam]);

  // Integrate our unified query hook
  const { products, total, loading, updateParams } = useProducts({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategory,
    query: searchQuery,
    minPrice: selectedPriceRange.min,
    maxPrice: selectedPriceRange.max,
    rating: selectedRating,
    sort: sortOption
  });

  // Sync state mutations to parameters update
  useEffect(() => {
    updateParams({
      page: currentPage,
      category: selectedCategory,
      query: searchQuery,
      minPrice: selectedPriceRange.min,
      maxPrice: selectedPriceRange.max,
      rating: selectedRating,
      sort: sortOption
    });
  }, [currentPage, selectedCategory, searchQuery, selectedPriceRange, selectedRating, sortOption]);

  // Reset pagination index when filter parameters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortOption]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả");
    setSelectedPriceRange(priceFilters[0]);
    setSelectedRating(null);
    setSortOption("default");
    setCurrentPage(1);
  };

  // Sidebar reusable control panel
  const FilterPanel = () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-2 font-display font-semibold text-[#1A2F6B] text-[18px]">
          <Filter className="w-5 h-5 text-[#D4AF37]" />
          <span>Bộ lọc</span>
        </div>
        <button
          onClick={handleResetFilters}
          className="text-[12px] font-semibold text-accent hover:text-[#8B1215] transition-colors flex items-center gap-1 font-body select-none cursor-pointer"
          title="Thiết lập lại bộ lọc"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Keyword Search */}


      {/* Categories select list */}
      <div className="flex flex-col gap-3">
        <span className="text-[14px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
          Danh mục sản phẩm
        </span>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2.5 text-[14px] font-body transition-colors py-0.5 text-left select-none cursor-pointer ${selectedCategory === cat
                ? "text-[#8C6A00] font-semibold"
                : "text-[#4A4A4A] hover:text-[#D4AF37]"
                }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${selectedCategory === cat ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-gray-300 bg-white"
                  }`}
              >
                {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A00]" />}
              </span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Options */}
      <div className="flex flex-col gap-3">
        <span className="text-[14px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
          Khoảng giá bán
        </span>
        <div className="flex flex-col gap-2.5">
          {priceFilters.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelectedPriceRange(p)}
              className={`flex items-center gap-2.5 text-[14px] font-body transition-colors py-0.5 text-left select-none cursor-pointer ${selectedPriceRange.label === p.label
                ? "text-[#8C6A00] font-semibold"
                : "text-[#4A4A4A] hover:text-[#D4AF37]"
                }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${selectedPriceRange.label === p.label ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-gray-300 bg-white"
                  }`}
              >
                {selectedPriceRange.label === p.label && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A00]" />}
              </span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Client Ratings Option */}
      {/* <div className="flex flex-col gap-3">
        <span className="text-[14px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
          Đánh giá từ khách hàng
        </span>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`flex items-center gap-2 text-[14px] font-body select-none cursor-pointer ${
              selectedRating === null ? "text-[#8C6A00] font-semibold" : "text-[#4A4A4A] hover:text-[#D4AF37]"
            }`}
          >
            <span>Tất cả đánh giá</span>
          </button>
          {[5, 4].map((stars) => (
            <button
              key={stars}
              onClick={() => setSelectedRating(stars)}
              className={`flex items-center gap-2 text-[14px] font-body select-none cursor-pointer ${
                selectedRating === stars ? "text-[#8C6A00] font-semibold" : "text-[#4A4A4A] hover:text-[#D4AF37]"
              }`}
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < stars ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-100 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span>trở lên</span>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Main Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        {/* LEFT COLUMN: Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-32 self-start">
          <FilterPanel />
        </aside>

        {/* MOBILE FILTER TOGGLE & DRAWER */}
        <div className="lg:hidden w-full flex items-center justify-between mb-4 gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A2F6B] text-white font-medium text-[14px] shadow-sm select-none cursor-pointer active:scale-95 transition-all"
          >
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <span>Bộ lọc sản phẩm</span>
          </button>

          <span className="text-[14px] text-gray-500 font-body">
            {total} sản phẩm
          </span>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute top-0 bottom-0 left-0 w-[300px] max-w-[85vw] bg-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-display font-bold text-[18px] text-primary">Bộ lọc</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterPanel />
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 py-3 bg-[#A4161A] text-white rounded-full text-[15px] font-semibold tracking-wide shadow-md active:scale-95 transition-all select-none cursor-pointer"
              >
                Xem kết quả ({total})
              </button>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Product Catalog */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          {/* Sort header options & results count */}
          <div className="hidden lg:flex items-end justify-between pb-4 border-b border-[#E5E5E5]/60">
            {/* Left Column: Search & Results count */}
            <div className="flex flex-col gap-2 w-full max-w-md">
              {/* Keyword Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập tên sản phẩm cần tìm..."
                  className="w-full h-[42px] pl-10 pr-10 rounded-full text-[14px] font-body bg-white border border-[#E5E5E5] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-2xs"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <span className="text-[13px] text-gray-500 font-body pl-2">
                Đang hiển thị <strong>{total}</strong> sản phẩm phù hợp
              </span>
            </div>

            {/* Right Column: Sort Select */}
            <div className="flex items-center gap-3 pb-1">
              <span className="text-[14px] text-gray-500 font-body">Sắp xếp theo:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="h-[38px] pl-4 pr-10 rounded-full border border-[#E5E5E5] bg-white text-[14px] font-body text-[#1C1C1C] outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="reviews">Bán chạy nhất (Đánh giá)</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Dynamic products catalog grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E5E5]/60 rounded-xs overflow-hidden p-6 flex flex-col gap-4 animate-pulse shadow-2xs"
                >
                  <div className="aspect-square bg-gray-100 rounded-xs w-full" />
                  <div className="h-5 bg-gray-100 rounded-full w-2/3 mt-2" />
                  <div className="h-4 bg-gray-50 rounded-full w-1/2" />
                  <div className="h-8 bg-gray-100 rounded-full w-full mt-4" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  priceVal={product.priceVal ?? 0}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-[#E5E5E5]/60 rounded-xs">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-[18px] font-bold font-display text-primary mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-[14px] text-muted-foreground font-body text-center max-w-[400px] mb-6">
                Chúng tôi không tìm thấy kết quả phù hợp với các tiêu chí tìm kiếm của bạn. Hãy thử thay đổi bộ lọc hoặc đặt lại bộ lọc.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 h-[44px] bg-accent hover:bg-[#8B1215] text-white text-[14px] font-medium rounded-full shadow-sm hover:shadow-md transition-all select-none cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination row */}
      {products.length > 0 && totalPages > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center pt-6 border-t border-[#E5E5E5]/40">
          <div className="hidden lg:block lg:col-span-2" />
          <div className="col-span-1 lg:col-span-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
