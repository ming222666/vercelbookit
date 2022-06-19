import { ReviewAvailablilityAction, ReviewAvailablilityActionType } from './types';
import { ReviewAvailablilityState } from './models/ReviewAvailablilityState';

const initialState: ReviewAvailablilityState = {
  isAvailable: false,
  error: null,
  loading: false,
  success: null,
};

const reviewAvailablilityReducer = (
  state: ReviewAvailablilityState = initialState,
  action: ReviewAvailablilityAction,
): ReviewAvailablilityState => {
  switch (action.type) {
    case ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_REQUEST:
      return {
        ...state,
        isAvailable: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    default:
      return state;
  }
};

export default reviewAvailablilityReducer;
