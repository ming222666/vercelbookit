import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import type { IncomingMessage } from 'http';

import { BookingDetailsAction, BookingDetailsActionType } from './types';
import { BookingDetailsState } from './models/BookingDetailsState';
import { IBookingExtended } from '../../../../controllers/interfaces';
import { getError } from '../../../../utils/getAxiosError';

export const bookingDetails =
  (authCookie: string | undefined, req: IncomingMessage, id: string) =>
  async (
    dispatch: ThunkDispatch<BookingDetailsState, undefined, BookingDetailsAction>,
  ): Promise<BookingDetailsAction> => {
    try {
      dispatch({
        type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      const config = authCookie ? { headers: { cookie: authCookie } } : {};

      const { data } = await axios.get<IBookingExtended>(`${origin}/api/bookings/${id}`, config);

      return dispatch({
        type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_FAIL,
        payload: err,
      });
    }
  };
