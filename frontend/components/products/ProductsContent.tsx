"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { Search, Filter, RefreshCw, X, Star, ChevronDown } from "lucide-react";

interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  category: string;
  priceVal: number;
}

const mockProducts: MockProduct[] = [
  {
    id: "1",
    name: "Yến Sào Khánh Hòa Thượng Hạng (100g)",
    description: "Tổ yến thiên nhiên nguyên tổ làm sạch cao cấp, khai thác tại vùng biển Khánh Hòa. Giàu dinh dưỡng, bồi bổ sức khỏe toàn diện.",
    price: "4.500.000đ",
    originalPrice: "5.200.000đ",
    image: "/images/yensao.png",
    badge: "Bán chạy",
    category: "Yến sào Khánh Hòa",
    rating: 5,
    reviewCount: 48,
    priceVal: 4500000,
  },
  {
    id: "2",
    name: "Nước Yến Sào Đường Phèn Hũ Chưng Sẵn (70ml)",
    description: "Yến chưng đường phèn thanh mát tinh khiết. Hàm lượng yến thật 20%, giúp ăn ngon ngủ ngon, thích hợp sử dụng hàng ngày.",
    price: "299.000đ",
    originalPrice: "350.000đ",
    image: "/images/yensao.png",
    badge: "Hot",
    category: "Yến chưng sẵn",
    rating: 5,
    reviewCount: 124,
    priceVal: 299000,
  },
  {
    id: "3",
    name: "Yến Chưng Nhân Sâm Cao Cấp (Hộp 6 Hũ)",
    description: "Sự kết hợp hoàn hảo giữa tổ yến thiên nhiên tinh khiết và nhân sâm Hàn Quốc thượng hạng giúp tăng cường sinh lực.",
    price: "580.000đ",
    originalPrice: "680.000đ",
    image: "/images/yensao.png",
    badge: "Mới",
    category: "Yến chưng sẵn",
    rating: 4,
    reviewCount: 36,
    priceVal: 580000,
  },
  {
    id: "4",
    name: "Yến Chưng Đông Trùng Hạ Thảo (Hộp 6 Hũ)",
    description: "Yến sào kết hợp đông trùng hạ thảo bổ khí huyết, bồi bổ sức đề kháng cho người lớn tuổi hoặc người mới ốm dậy.",
    price: "599.000đ",
    image: "/images/yensao.png",
    category: "Yến chưng sẵn",
    rating: 5,
    reviewCount: 52,
    priceVal: 599000,
  },
  {
    id: "5",
    name: "Nước Yến Dinh Dưỡng Kid Sào Cho Bé",
    description: "Nước yến dinh dưỡng cho trẻ nhỏ, bổ sung Canxi và Lysine kích thích tiêu hóa ăn ngon, hỗ trợ tăng chiều cao.",
    price: "249.000đ",
    originalPrice: "299.000đ",
    image: "/images/yensao.png",
    badge: "Cho Bé",
    category: "Nước yến dinh dưỡng",
    rating: 5,
    reviewCount: 89,
    priceVal: 249000,
  },
  {
    id: "6",
    name: "Hộp Quà Yến Sào Premium Luxury",
    description: "Bộ quà tặng cao cấp gồm yến nguyên tổ và nước yến chưng sẵn thảo dược. Thiết kế sang trọng quý phái, món quà ý nghĩa trao gửi sức khỏe.",
    price: "2.800.000đ",
    originalPrice: "3.200.000đ",
    image: "/images/yensao.png",
    badge: "Quà Tặng",
    category: "Quà tặng cao cấp",
    rating: 5,
    reviewCount: 22,
    priceVal: 2800000,
  },
  {
    id: "7",
    name: "Yến Hũ Chưng Sẵn Không Đường (70ml)",
    description: "Yến sào nguyên chất tinh khiết 100%, không đường tốt cho người tiểu đường, cao huyết áp hoặc người ăn kiêng.",
    price: "289.000đ",
    image: "/images/yensao.png",
    category: "Yến chưng sẵn",
    rating: 4,
    reviewCount: 15,
    priceVal: 289000,
  },
  {
    id: "8",
    name: "Yến Sào Khánh Hòa Loại 2 (50g)",
    description: "Tổ yến đảo thiên nhiên Khánh Hòa nguyên tổ sơ chế sạch sẽ, thơm ngon giàu dưỡng chất với mức giá tiếp cận.",
    price: "2.100.000đ",
    originalPrice: "2.400.000đ",
    image: "/images/yensao.png",
    category: "Yến sào Khánh Hòa",
    rating: 4,
    reviewCount: 19,
    priceVal: 2100000,
  }
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceFilters[0]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortOption]);

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // 1. Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // 2. Filter by category
    if (selectedCategory !== "Tất cả") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Filter by price range
    result = result.filter(
      (p) => p.priceVal >= selectedPriceRange.min && p.priceVal <= selectedPriceRange.max
    );

    // 4. Filter by minimum rating
    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // 5. Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.priceVal - a.priceVal);
    } else if (sortOption === "reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả");
    setSelectedPriceRange(priceFilters[0]);
    setSelectedRating(null);
    setSortOption("default");
    setCurrentPage(1);
  };

  // Filter sidebar element (reusable for desktop & mobile drawer)
  const FilterPanel = () => (
    <div className="flex flex-col gap-8 bg-white p-6 rounded-xs border border-[#E5E5E5]/80 shadow-xs">
      {/* Header filter title */}
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

      {/* 1. Keyword search inside filter */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
          Tìm kiếm từ khóa
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
            className="w-full h-[40px] pl-10 pr-4 rounded-full text-[14px] font-body bg-[#FAFAF7] border border-[#E5E5E5] outline-none focus:border-[#D4AF37] transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Categories checkbox style */}
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
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${selectedCategory === cat
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-gray-300 bg-white"
                }`}>
                {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A00]" />}
              </span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Radio List */}
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
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${selectedPriceRange.label === p.label
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-gray-300 bg-white"
                }`}>
                {selectedPriceRange.label === p.label && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A00]" />}
              </span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Rating stars filter */}
      <div className="flex flex-col gap-3">
        <span className="text-[14px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
          Đánh giá từ khách hàng
        </span>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`flex items-center gap-2 text-[14px] font-body select-none cursor-pointer ${selectedRating === null ? "text-[#8C6A00] font-semibold" : "text-[#4A4A4A] hover:text-[#D4AF37]"
              }`}
          >
            <span>Tất cả đánh giá</span>
          </button>
          {[5, 4].map((stars) => (
            <button
              key={stars}
              onClick={() => setSelectedRating(stars)}
              className={`flex items-center gap-2 text-[14px] font-body select-none cursor-pointer ${selectedRating === stars ? "text-[#8C6A00] font-semibold" : "text-[#4A4A4A] hover:text-[#D4AF37]"
                }`}
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < stars ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-100 text-gray-200"
                      }`}
                  />
                ))}
              </div>
              <span>trở lên</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Main Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        {/* LEFT COLUMN: Filter Sidebar (Desktop: col-span-2, Mobile: Drawer overlay) */}
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
            {filteredProducts.length} sản phẩm
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
                Xem kết quả ({filteredProducts.length})
              </button>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Product Catalog (Desktop: col-span-8) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          {/* Sort header options & results count */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#E5E5E5]/60">
            <span className="text-[15px] text-gray-500 font-body">
              Đang hiển thị <strong>{filteredProducts.length}</strong> sản phẩm phù hợp
            </span>

            <div className="flex items-center gap-3">
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
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
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

      {/* Pagination row: outside the main catalog grid to limit sticky scroll */}
      {filteredProducts.length > 0 && totalPages > 1 && (
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
