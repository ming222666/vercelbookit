import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { ReviewAvailablilityAction, ReviewAvailablilityActionType } from './types';
import { ReviewAvailablilityState } from './models/ReviewAvailablilityState';
import { getError } from '../../../utils/getAxiosError';

// Check Review Availability   =>   /api/reviews/check_review_availability
export const checkReviewAvailability =
  (roomId: string) =>
  async (
    dispatch: ThunkDispatch<ReviewAvailablilityState, undefined, ReviewAvailablilityAction>,
  ): Promise<ReviewAvailablilityAction> => {
    try {
      const { data } = await axios.get<boolean>(`/api/reviews/check_review_availability?roomId=${roomId}`);

      return dispatch({
        type: ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_REQUEST,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_FAIL,
        payload: err,
      });
    }
  };
