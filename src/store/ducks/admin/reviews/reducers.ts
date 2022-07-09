import { ReviewsAction, ReviewsActionType } from './types';
import { ReviewsState } from './models/ReviewsState';

const initialState: ReviewsState = {
  reviews: [],
  roomId: '',
  error: null,
  loading: false,
  success: null,
};

const reviewsReducer = (state: ReviewsState = initialState, action: ReviewsAction): ReviewsState => {
  switch (action.type) {
    case ReviewsActionType.REVIEWS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case ReviewsActionType.REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case ReviewsActionType.REVIEWS_SUCCESS:
      const reviews = action.payload.reviews;

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

      return {
        ...state,
        reviews: action.payload.reviews,
        roomId: action.payload.roomId,
        error: null,
        loading: false,
        success: true,
      };
    case ReviewsActionType.REVIEWS_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case ReviewsActionType.REVIEWS_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
