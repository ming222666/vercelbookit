import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import type { IncomingMessage } from 'http';

import { MyBookingsAction, MyBookingsActionType } from './types';
import { MyBookingsState } from './models/MyBookingsState';
import { IBookingExtended } from '../../../../controllers/interfaces';
import { getError } from '../../../../utils/getAxiosError';

export const myBookings =
  (authCookie: string | undefined, req: IncomingMessage) =>
  async (dispatch: ThunkDispatch<MyBookingsState, undefined, MyBookingsAction>): Promise<MyBookingsAction> => {
    try {
      dispatch({
        type: MyBookingsActionType.LOAD_MY_BOOKINGS_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      const config = authCookie ? { headers: { cookie: authCookie } } : {};

      const { data } = await axios.get<{ user: string; bookings: IBookingExtended[] }>(
        `${origin}/api/bookings/me`,
        config,
      );

      return dispatch({
        type: MyBookingsActionType.LOAD_MY_BOOKINGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: MyBookingsActionType.LOAD_MY_BOOKINGS_FAIL,
        payload: err,
      });
    }
  };
