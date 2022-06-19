import { NewReviewAction, NewReviewActionType } from './types';
import { NewReviewState } from './models/NewReviewState';

const initialState: NewReviewState = {
  error: null,
  loading: false,
  success: null,
};

const newReviewReducer = (state: NewReviewState = initialState, action: NewReviewAction): NewReviewState => {
  switch (action.type) {
    case NewReviewActionType.NEW_REVIEW_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case NewReviewActionType.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case NewReviewActionType.NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case NewReviewActionType.NEW_REVIEW_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case NewReviewActionType.NEW_REVIEW_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default newReviewReducer;
