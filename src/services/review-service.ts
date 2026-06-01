import { seedReviews } from "@/mocks/app-data";
import type { Review, ReviewSubmission } from "@/types/domain";
import {
  createMockId,
  readStorage,
  STORAGE_KEYS,
  waitForMock,
  writeStorage
} from "@/services/mock-storage";

function getLocalReviews() {
  return readStorage<Review[]>(STORAGE_KEYS.reviews, []);
}

export const reviewService = {
  async getReviewsForPlace(placeId: string): Promise<Review[]> {
    await waitForMock();
    return [...getLocalReviews(), ...seedReviews].filter(
      (review) => review.placeId === placeId
    );
  },

  async getRecentReviews(): Promise<Review[]> {
    await waitForMock();
    return [...getLocalReviews(), ...seedReviews].slice(0, 5);
  },

  async submitReview(submission: ReviewSubmission): Promise<Review> {
    await waitForMock();
    const review: Review = {
      id: createMockId("review"),
      placeId: submission.placeId,
      userName: "María González",
      userAvatar: "MG",
      rating: submission.rating,
      dateLabel: "Recién",
      text: submission.text,
      images: submission.images,
      accessibilityFeedback: submission.accessibilityFeedback
    };

    writeStorage(STORAGE_KEYS.reviews, [review, ...getLocalReviews()]);
    return review;
  }
};
