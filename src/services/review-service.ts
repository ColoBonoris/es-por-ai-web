import type { Review, ReviewSubmission } from "@/types/domain";
import { apiFetch, jsonHeaders } from "@/services/api-client";

export const reviewService = {
  async getReviewsForPlace(placeId: string): Promise<Review[]> {
    const payload = await apiFetch<{ reviews: Review[] }>(
      `/places/${placeId}/reviews`
    );
    return payload.reviews;
  },

  async getRecentReviews(): Promise<Review[]> {
    const payload = await apiFetch<{ reviews: Review[] }>("/reviews/recent");
    return payload.reviews;
  },

  async submitReview(submission: ReviewSubmission): Promise<Review> {
    const payload = await apiFetch<{ review: Review }>(
      `/places/${submission.placeId}/reviews`,
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({
          rating: submission.rating,
          text: submission.text,
          images: submission.images,
          accessibilityFeedback: submission.accessibilityFeedback
        })
      }
    );
    return payload.review;
  }
};
