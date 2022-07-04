import { ReviewDeleteAction, ReviewDeleteActionType } from './types';
import { ReviewDeleteState } from './models/ReviewDeleteState';

const initialState: ReviewDeleteState = {
  error: null,
  loading: false,
  success: null,
};

const reviewDeleteReducer = (
  state: ReviewDeleteState = initialState,
  action: ReviewDeleteAction,
): ReviewDeleteState => {
  switch (action.type) {
    case ReviewDeleteActionType.REVIEW_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case ReviewDeleteActionType.REVIEW_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case ReviewDeleteActionType.REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case ReviewDeleteActionType.REVIEW_DELETE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case ReviewDeleteActionType.REVIEW_DELETE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case ReviewDeleteActionType.REVIEW_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reviewDeleteReducer;
