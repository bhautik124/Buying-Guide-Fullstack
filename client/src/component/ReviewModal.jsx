import React, { useState } from "react";
import axios from "axios";

const ReviewModal = ({
  productId,
  isReviewModalOpen,
  setIsReviewModalOpen,
  setReviews,
}) => {
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      productId,
      username,
      review,
      rating,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reviews",
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setIsReviewModalOpen(false);
      setUsername("");
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    isReviewModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10">
        <div className="bg-[#101110] rounded-lg p-8 w-full max-w-2xl relative">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsReviewModalOpen(false)}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-lg mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#202020] px-4 py-2 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full bg-[#202020] px-4 py-2 rounded-lg text-white"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Rating (out of 5)</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                min="1"
                max="5"
                className="w-full bg-[#202020] px-4 py-2 rounded-lg text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#202020] px-4 py-2 rounded-lg text-xl hover:bg-[#303030]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
