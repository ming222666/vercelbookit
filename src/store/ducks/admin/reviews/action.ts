import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { ReviewsAction, ReviewsActionType } from './types';
import { ReviewsState } from './models/ReviewsState';
import { getError } from '../../../../utils/getAxiosError';
import { ReviewInfo } from './models/ReviewInfo';

// Get all reviews (admin)
export const getReviews =
  (roomId: string) =>
  async (dispatch: ThunkDispatch<ReviewsState, undefined, ReviewsAction>): Promise<ReviewsAction> => {
    try {
      dispatch({
        type: ReviewsActionType.REVIEWS_REQUEST,
      });

      const link = `/api/admin/reviews?roomId=${roomId}`;

      const { data } = await axios.get<ReviewInfo[]>(link);

      return dispatch({
        type: ReviewsActionType.REVIEWS_SUCCESS,
        payload: { reviews: data, roomId },
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: ReviewsActionType.REVIEWS_FAIL,
        payload: err,
      });
    }
  };
