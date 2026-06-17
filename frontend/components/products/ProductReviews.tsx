"use client";

import { useState, useEffect, FormEvent } from "react";
import { Review, getProductReviews, addProductReview } from "@/services/api";
import { StarRating } from "@/components/ui/StarRating";
import { CtaButton } from "@/components/ui/CtaButton";
import { useToast } from "@/context/ToastContext";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useUser } from "@/hooks/use-users-query";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  
  const { currentUserId } = useAuth();
  const { data: user } = useUser(currentUserId || "");

  useEffect(() => {
    if (user?.fullName) {
      setNewName(user.fullName);
    }
  }, [user?.fullName]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      setNewComment("");
      if (!user?.fullName) setNewName("");
      setNewRating(5);
      showSuccessToast("Cảm ơn bạn đã gửi đánh giá!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      showErrorToast("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Đang tải đánh giá...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Form Submit Review */}
      <div className="bg-[#FAFAF7] border border-[#E5E5E5] rounded-xs p-6 md:p-8">
        <h3 className="text-[18px] md:text-[20px] font-bold font-display text-primary mb-6">
          Gửi đánh giá của bạn
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
              Chất lượng sản phẩm
            </label>
            <StarRating
              rating={newRating}
              interactive={true}
              onRatingChange={setNewRating}
              className="w-6 h-6"
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[13px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
                Họ và tên *
              </label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nhập họ và tên"
                className={`w-full h-12 px-4 border rounded-xs focus:outline-none focus:border-[#D4AF37] transition-colors ${
                  user?.fullName 
                    ? "bg-gray-50 border-[#E5E5E5] text-gray-500 cursor-not-allowed" 
                    : "bg-white border-[#E5E5E5]"
                }`}
                disabled={submitting || !!user?.fullName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-[13px] font-bold text-[#1C1C1C] uppercase tracking-wider font-body">
              Nội dung đánh giá *
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              className="w-full p-4 min-h-[120px] bg-white border border-[#E5E5E5] rounded-xs focus:outline-none focus:border-[#D4AF37] transition-colors resize-y"
              disabled={submitting}
            />
          </div>

          <div className="pt-2">
            <CtaButton
              type="submit"
              disabled={submitting}
              icon={<Star className="h-4 w-4 text-white" />}
              className={`pl-5 pr-1.5 py-1 text-[13.5px] shadow-sm bg-primary hover:bg-[#12224F] ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </CtaButton>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-[18px] md:text-[20px] font-bold font-display text-primary mb-6">
          Đánh giá từ khách hàng ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <div className="text-gray-500 py-6 border-t border-[#E5E5E5]/60">
            Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
          </div>
        ) : (
          <div className="flex flex-col max-h-[500px] overflow-y-auto pr-4 -mr-4" style={{ scrollbarWidth: 'thin' }}>
            {reviews.map((review) => (
              <div key={review.id} className="py-6 border-b border-[#E5E5E5]/60 last:border-b-0 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-display text-lg">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[#1C1C1C] font-body">{review.userName}</div>
                      <div className="text-gray-400 text-[12px]">{formatDate(review.date)}</div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
