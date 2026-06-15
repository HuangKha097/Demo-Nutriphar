"use client";

import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { type NewsArticle } from "@/services/api";
import Link from "next/link";

interface NewsListClientProps {
  articles: NewsArticle[];
}

const ITEMS_PER_PAGE = 6; // Configured to 6 news/page as requested

export function NewsListClient({ articles }: NewsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Extract unique categories dynamically from backend data
  const categories = [
    "Tất cả",
    ...Array.from(new Set(articles.map((art) => art.category).filter(Boolean)))
  ] as string[];

  // Filter articles based on backend category values
  const filteredArticles = selectedCategory === "Tất cả"
    ? articles
    : articles.filter(art => art.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Category Tabs — matching the style of the product section on the home page */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium font-body transition-all duration-300 select-none cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-[#D4AF37] text-white shadow-md"
                  : "bg-white text-[#4A4A4A] hover:bg-[#D4AF37]/10 hover:text-[#8C6A00] border border-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid Layout — Symmetrical 3-Column Grid with centered titles matching the mockup image */}
      {paginatedArticles.length > 0 ? (
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch animate-fade-in">
            {paginatedArticles.map((article) => {
              return (
                <Link
                  key={article.id}
                  href={article.slug}
                  className="group flex flex-col w-full bg-white border border-[#E5E5E5]/60 hover:border-[#D4AF37]/50 rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Card Thumbnail */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content — centered matching the mockup image layout */}
                  <div className="p-5 text-center flex flex-col items-center justify-center flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 block font-body">
                      {article.category || "Tin tức"}
                    </span>
                    <h3 className="text-[15px] md:text-[16.5px] font-bold text-[#1C1C1C] group-hover:text-primary transition-colors duration-300 leading-snug font-display line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="text-center py-20 bg-[#FAFAF7] rounded-[24px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-body text-[15px]">
            Không tìm thấy bài viết nào trong danh mục này.
          </p>
        </div>
      )}
    </div>
  );
}
