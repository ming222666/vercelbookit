import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { MyBookingsAction, MyBookingsActionType } from './types';
import { MyBookingsState } from './models/MyBookingsState';
import { IBookingExtended } from '../../../../controllers/interfaces';
import { getError } from '../../../../utils/getAxiosError';

export const myBookings =
  () =>
  async (dispatch: ThunkDispatch<MyBookingsState, undefined, MyBookingsAction>): Promise<MyBookingsAction> => {
    try {
      dispatch({
        type: MyBookingsActionType.LOAD_MY_BOOKINGS_REQUEST,
      });

      const { data } = await axios.get<{ bookings: IBookingExtended[] }>('/api/bookings/me');

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
