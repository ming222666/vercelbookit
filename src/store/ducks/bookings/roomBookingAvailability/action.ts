import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { RoomBookingAvailabilityAction, RoomBookingAvailabilityActionType } from './types';
import { RoomBookingAvailabilityState } from './models/RoomBookingAvailabilityState';
import { getError } from '../../../../utils/getAxiosError';

export const getRoomBookingAvailability =
  (roomId: string, checkInDate: number, checkOutDate: number) =>
  async (
    dispatch: ThunkDispatch<RoomBookingAvailabilityState, undefined, RoomBookingAvailabilityAction>,
  ): Promise<RoomBookingAvailabilityAction> => {
    try {
      dispatch({
        type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_REQUEST,
      });

      const { data } = await axios.get<{ roomId: string; isAvailable: boolean }>(
        `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      );

      return dispatch({
        type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_FAIL,
        payload: err,
      });
    }
  };
