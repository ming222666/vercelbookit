import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { BookedDatesAction, BookedDatesActionType } from './types';
import { BookedDatesState } from './models/BookedDatesState';
import { getError } from '../../../../utils/getAxiosError';

export const getBookedDates =
  (roomId: string) =>
  async (dispatch: ThunkDispatch<BookedDatesState, undefined, BookedDatesAction>): Promise<BookedDatesAction> => {
    try {
      dispatch({
        type: BookedDatesActionType.LOAD_BOOKED_DATES_REQUEST,
      });

      const { data } = await axios.get<{ roomId: string; dates: number[] }>(
        `/api/bookings/check_booked_dates?roomId=${roomId}`,
      );

      return dispatch({
        type: BookedDatesActionType.LOAD_BOOKED_DATES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: BookedDatesActionType.LOAD_BOOKED_DATES_FAIL,
        payload: err,
      });
    }
  };
