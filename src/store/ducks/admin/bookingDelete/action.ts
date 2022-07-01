import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { BookingDeleteAction, BookingDeleteActionType } from './types';
import { BookingDeleteState } from './models/BookingDeleteState';
import { getError } from '../../../../utils/getAxiosError';

// Delete booking
export const bookingDelete =
  (bookingId: string) =>
  async (dispatch: ThunkDispatch<BookingDeleteState, undefined, BookingDeleteAction>): Promise<BookingDeleteAction> => {
    try {
      dispatch({
        type: BookingDeleteActionType.BOOKING_DELETE_REQUEST,
      });

      const link = `/api/admin/bookings/${bookingId}`;

      const { data } = await axios.delete<{ success: boolean }>(link);

      return dispatch({
        type: BookingDeleteActionType.BOOKING_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: BookingDeleteActionType.BOOKING_DELETE_FAIL,
        payload: err,
      });
    }
  };
