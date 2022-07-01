import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AdminBookingsAction, AdminBookingsActionType } from './types';
import { AdminBookingsState } from './models/AdminBookingsState';
import { IBookingExtended } from '../../../../controllers/interfaces';
import { getError } from '../../../../utils/getAxiosError';

export const adminBookings =
  () =>
  async (dispatch: ThunkDispatch<AdminBookingsState, undefined, AdminBookingsAction>): Promise<AdminBookingsAction> => {
    try {
      dispatch({
        type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_REQUEST,
      });

      const { data } = await axios.get<{ bookings: IBookingExtended[] }>('/api/admin/bookings');

      return dispatch({
        type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_FAIL,
        payload: err,
      });
    }
  };
