import { ReviewAvailabilityAction, ReviewAvailabilityActionType } from './types';
import { ReviewAvailabilityState } from './models/ReviewAvailabilityState';

const initialState: ReviewAvailabilityState = {
  isAvailable: false,
  error: null,
  loading: false,
  success: null,
};

const reviewAvailabilityReducer = (
  state: ReviewAvailabilityState = initialState,
  action: ReviewAvailabilityAction,
): ReviewAvailabilityState => {
  switch (action.type) {
    case ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_REQUEST:
      return {
        ...state,
        isAvailable: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reviewAvailabilityReducer;
