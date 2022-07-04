import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { ReviewDeleteAction, ReviewDeleteActionType } from './types';
import { ReviewDeleteState } from './models/ReviewDeleteState';
import { getError } from '../../../../utils/getAxiosError';

// Delete review
export const reviewDelete =
  (roomId: string, reviewId: string) =>
  async (dispatch: ThunkDispatch<ReviewDeleteState, undefined, ReviewDeleteAction>): Promise<ReviewDeleteAction> => {
    try {
      dispatch({
        type: ReviewDeleteActionType.REVIEW_DELETE_REQUEST,
      });

      const link = `/api/admin/reviews/${reviewId}?roomId=${roomId}`;

      const { data } = await axios.delete<{ success: boolean }>(link);

      return dispatch({
        type: ReviewDeleteActionType.REVIEW_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: ReviewDeleteActionType.REVIEW_DELETE_FAIL,
        payload: err,
      });
    }
  };
