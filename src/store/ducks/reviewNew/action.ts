import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { NewReviewAction, NewReviewActionType } from './types';
import { NewReviewState } from './models/NewReviewState';
import { getError } from '../../../utils/getAxiosError';

interface IReviewData {
  rating: number;
  comment: string;
  roomId: string;
}

// Create a new room review
export const newReview =
  ({ rating = 0, comment = '', roomId = '' }: IReviewData) =>
  async (dispatch: ThunkDispatch<NewReviewState, undefined, NewReviewAction>): Promise<NewReviewAction> => {
    try {
      dispatch({
        type: NewReviewActionType.NEW_REVIEW_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put('/api/reviews', { rating, comment, roomId }, config);

      return dispatch({
        type: NewReviewActionType.NEW_REVIEW_SUCCESS,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: NewReviewActionType.NEW_REVIEW_FAIL,
        payload: err,
      });
    }
  };
