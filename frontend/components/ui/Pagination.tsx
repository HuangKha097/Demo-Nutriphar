"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers array (with ellipsis if needed)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // e.g., 1, 2, 3, 4, 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, and pages around current page
      pages.push(1);
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      // Smooth scroll back to top of catalog section
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <nav 
      className="flex items-center justify-center gap-1.5 mt-12 mb-6" 
      aria-label="Phân trang sản phẩm"
    >
      {/* Previous Page Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border select-none cursor-pointer ${
          currentPage === 1
            ? "border-[#E5E5E5] text-gray-300 pointer-events-none"
            : "border-[#E5E5E5] text-[#1C1C1C] hover:border-[#D4AF37] hover:text-[#8C6A00] active:scale-95"
        }`}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="w-11 h-11 flex items-center justify-center text-gray-400 text-[14px]"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              aria-current={isActive ? "page" : undefined}
              className={`w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-semibold font-body transition-all border cursor-pointer select-none active:scale-95 ${
                isActive
                  ? "bg-accent border-accent text-white shadow-md hover:bg-[#8B1215]"
                  : "bg-white border-[#E5E5E5] text-[#1C1C1C] hover:border-[#D4AF37] hover:text-[#8C6A00]"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border select-none cursor-pointer ${
          currentPage === totalPages
            ? "border-[#E5E5E5] text-gray-300 pointer-events-none"
            : "border-[#E5E5E5] text-[#1C1C1C] hover:border-[#D4AF37] hover:text-[#8C6A00] active:scale-95"
        }`}
        aria-label="Trang tiếp theo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
