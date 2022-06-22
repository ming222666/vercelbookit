import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { checkReviewAvailability } from '../../store/ducks/reviewAvailability/action';
import { newReview } from '../../store/ducks/reviewNew/action';
import { ReviewAvailabilityActionType } from '../../store/ducks/reviewAvailability/types';
import { NewReviewActionType } from '../../store/ducks/reviewNew/types';

import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';

export function NewReview(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, success } = useSelector((state: AppState) => state.reviewNew);
  const { isAvailable, error: reviewAvailabilityError } = useSelector((state: AppState) => state.reviewAvailability);

  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(checkReviewAvailability(id as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reviewAvailabilityError) {
      if (reviewAvailabilityError.errormsg !== 'Session not found') {
        toast.error(reviewAvailabilityError.errormsg);
        dispatch({ type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_RESET_FAIL });
      }
    }
  }, [dispatch, reviewAvailabilityError]);

  useEffect(() => {
    if (success) {
      toast.success('Review is posted.');
      dispatch({ type: NewReviewActionType.NEW_REVIEW_RESET_SUCCESS });
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error.errormsg);
      dispatch({ type: NewReviewActionType.NEW_REVIEW_RESET_FAIL });
    }
  }, [dispatch, error]);

  const submitHandler = (): void => {
    const reviewData = {
      rating,
      comment,
      roomId: id as string,
    };

    dispatch(newReview(reviewData));
  };

  function setUserRatings(): void {
    const stars = document.querySelectorAll('.star');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stars.forEach((star: any, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e: Event): void {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (index < this.starValue) {
            star.classList.add('red');

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setRating(this.starValue);
          } else {
            star.classList.remove('red');
          }
        }

        if (e.type === 'mouseover') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (index < this.starValue) {
            star.classList.add('light-red');
          } else {
            star.classList.remove('light-red');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('light-red');
        }
      });
    }
  }

  return (
    <>
      {isAvailable && (
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4 mb-5"
          data-toggle="modal"
          data-target="#ratingModal"
          onClick={setUserRatings}
        >
          Submit Your Review
        </button>
      )}
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>

              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                value={comment}
                onChange={(e): void => setComment(e.target.value)}
                placeholder="Enter your comment"
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewReview;
