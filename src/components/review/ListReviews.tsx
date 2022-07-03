import React from 'react';

interface Props {
  reviews: {
    _id?: string | undefined;
    user: string;
    name: string;
    rating: number;
    comment: string;
    updatedAt?: number;
  }[];
}

export function ListReviews({ reviews = [] }: Props): JSX.Element {
  if (reviews.length > 1) {
    reviews.sort((a, b) => {
      const aUpdatedAt = a.updatedAt ? a.updatedAt : 0;
      const bUpdatedAt = b.updatedAt ? b.updatedAt : 0;
      if (aUpdatedAt > bUpdatedAt) {
        return -1;
      }
      if (aUpdatedAt < bUpdatedAt) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="reviews w-75">
      <h3>Reviews:</h3>
      <hr />

      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(review.rating / 5) * 100}%`,
                }}
              ></div>
            </div>
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
}
