"use client";

import { useState, useEffect } from "react";
import { Review, getProductReviews, addProductReview } from "@/services/api";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/contexts/auth-context";
import { useUser } from "@/hooks/use-users-query";

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const { currentUserId } = useAuth();
  const { data: user } = useUser(currentUserId || "");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const submitReview = async (
    newName: string, 
    newRating: number, 
    newComment: string, 
    onSuccess?: () => void
  ) => {
    if (!newComment.trim() || !newName.trim()) {
      showErrorToast("Vui lòng nhập đầy đủ tên và nội dung đánh giá");
      return;
    }

    try {
      setSubmitting(true);
      const newReview = await addProductReview({
        productId,
        userName: newName.trim(),
        rating: newRating,
        comment: newComment.trim(),
      });
      setReviews(prev => [newReview, ...prev]);
      if (onSuccess) onSuccess();
      showSuccessToast("Cảm ơn bạn đã gửi đánh giá!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      showErrorToast("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) 
    : "0.0";
    
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, percentage };
  });

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  return {
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
  };
}
