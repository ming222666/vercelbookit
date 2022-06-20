import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { ReviewAvailabilityAction, ReviewAvailabilityActionType } from './types';
import { ReviewAvailabilityState } from './models/ReviewAvailabilityState';
import { getError } from '../../../utils/getAxiosError';

// Check Review Availability   =>   /api/reviews/check_review_availability
export const checkReviewAvailability =
  (roomId: string) =>
  async (
    dispatch: ThunkDispatch<ReviewAvailabilityState, undefined, ReviewAvailabilityAction>,
  ): Promise<ReviewAvailabilityAction> => {
    try {
      const { data } = await axios.get<boolean>(`/api/reviews/check_review_availability?roomId=${roomId}`);

      return dispatch({
        type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_REQUEST,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_FAIL,
        payload: err,
      });
    }
  };
