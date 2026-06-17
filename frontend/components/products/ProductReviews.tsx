"use client";

import { useReviews } from "./reviews/useReviews";
import { ReviewSummary } from "./reviews/ReviewSummary";
import { ReviewForm } from "./reviews/ReviewForm";
import { ReviewList } from "./reviews/ReviewList";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const {
    user,
    reviews,
    filteredReviews,
    loading,
    submitting,
    filterRating,
    setFilterRating,
    submitReview,
    totalReviews,
    averageRating,
    ratingDistribution
  } = useReviews(productId);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Đang tải đánh giá...</div>;
  }

  return (
    <div className="flex flex-col gap-5 pt-2">
      <ReviewSummary 
        averageRating={averageRating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <ReviewForm 
          user={user}
          submitting={submitting}
          onSubmit={submitReview}
        />
        
        <ReviewList 
          totalReviews={totalReviews}
          filteredReviews={filteredReviews}
          allReviewsCount={reviews.length}
          filterRating={filterRating}
          setFilterRating={setFilterRating}
        />
      </div>
    </div>
  );
}
