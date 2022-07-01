import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { RoomDeleteAction, RoomDeleteActionType } from './types';
import { RoomDeleteState } from './models/RoomDeleteState';
import { getError } from '../../../../utils/getAxiosError';

// Delete room
export const roomDelete =
  (roomId: string) =>
  async (dispatch: ThunkDispatch<RoomDeleteState, undefined, RoomDeleteAction>): Promise<RoomDeleteAction> => {
    try {
      dispatch({
        type: RoomDeleteActionType.ROOM_DELETE_REQUEST,
      });

      const link = `/api/admin/rooms/${roomId}`;

      const { data } = await axios.delete<{ success: boolean }>(link);

      return dispatch({
        type: RoomDeleteActionType.ROOM_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: RoomDeleteActionType.ROOM_DELETE_FAIL,
        payload: err,
      });
    }
  };
