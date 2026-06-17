"use client";

import { useState, useEffect, FormEvent } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { CtaButton } from "@/components/ui/CtaButton";
import { Send } from "lucide-react";

interface ReviewFormProps {
  user: any;
  submitting: boolean;
  onSubmit: (name: string, rating: number, comment: string, resetForm: () => void) => void;
}

export function ReviewForm({ user, submitting, onSubmit }: ReviewFormProps) {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (user?.fullName) {
      setNewName(user.fullName);
    }
  }, [user?.fullName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(newName, newRating, newComment, () => {
      setNewComment("");
      if (!user?.fullName) setNewName("");
      setNewRating(5);
    });
  };

  return (
    <div className="lg:col-span-5 bg-[#F6F5F2] border border-[#E5E5E5]/60 rounded-xs p-5 md:p-6 lg:sticky lg:top-24 shadow-xs">
      <h3 className="text-[16px] md:text-[18px] font-bold font-display text-[#1C1C1C] mb-4">
        Gửi đánh giá của bạn
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#1C1C1C] font-body">
            Chọn xếp hạng của bạn
          </label>
          <StarRating
            rating={newRating}
            interactive={true}
            onRatingChange={setNewRating}
            className="w-6 h-6"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[12px] font-bold text-[#1C1C1C] font-body">
            Họ và tên
          </label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nhập họ và tên"
            className={`w-full h-[40px] px-3 text-[13px] border rounded-xs focus:outline-none focus:border-[#D4AF37] transition-colors shadow-sm ${
              user?.fullName 
                ? "bg-gray-50 border-[#E5E5E5] text-gray-500 cursor-not-allowed" 
                : "bg-white border-[#E5E5E5]"
            }`}
            disabled={submitting || !!user?.fullName}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="comment" className="text-[12px] font-bold text-[#1C1C1C] font-body">
            Nội dung đánh giá
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ cảm nhận..."
            className="w-full p-3 min-h-[90px] text-[13px] bg-white border border-[#E5E5E5] rounded-xs focus:outline-none focus:border-[#D4AF37] transition-colors resize-y shadow-sm"
            disabled={submitting}
          />
        </div>

        <div className="pt-2">
          <CtaButton
            type="submit"
            disabled={submitting}
            icon={<Send className="h-3.5 w-3.5 text-white -ml-0.5" />}
            iconWrapperClassName="w-9 h-9"
            className="justify-between h-[48px]"
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
