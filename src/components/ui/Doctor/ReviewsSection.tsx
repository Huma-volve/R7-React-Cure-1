import React from "react";
import type {  Review } from "../../../featuers/doctor/doctorTypes";
import { FaStar } from "react-icons/fa";
import ReviewPopup from "./ReviewPopup";

type ReviewsSectionProps = {
  reviews: Review[];
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
   const averageRating = 4.5;
  const totalReviews = 1250;
  return (
    <div className="bg-white rounded-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Reviews and Rating</h3>

        <ReviewPopup
          onSubmit={(payload) => {
            // handle new review (e.g. dispatch action or call API)
            console.log("New review submitted:", payload);
          }}
        />
      </div>

      {/* Top Rating Summary */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-4xl font-bold text-gray-900">{averageRating}/5</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">{totalReviews}+ Reviews</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-sm font-medium text-gray-800">
                  {review.rating}
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
