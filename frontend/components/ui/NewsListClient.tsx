"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { Pagination } from "./Pagination";
import { type NewsArticle } from "@/services/api";

interface NewsListClientProps {
  articles: NewsArticle[];
}

const ITEMS_PER_PAGE = 2; // Set to 2 to show pagination since we only have 3 mock articles

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
      {/* Category Pills - Clean floating style */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16 max-w-3xl mx-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-[13.5px] font-semibold rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] cursor-pointer ${
                isActive
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/10"
                  : "bg-white text-gray-600 border-gray-200/60 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid Layout - Symmetrical Grid similar to Products */}
      {paginatedArticles.length > 0 ? (
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch animate-fade-in">
            {paginatedArticles.map((article, index) => {
              return (
                <div
                  key={article.id}
                  className="flex transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-0 opacity-100"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <NewsCard
                    title={article.title}
                    excerpt={article.excerpt}
                    image={article.image}
                    date={article.date}
                    slug={article.slug}
                    variant="standard"
                  />
                </div>
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
