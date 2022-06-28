import { ThunkDispatch } from 'redux-thunk';
import axios, { AxiosError } from 'axios';

import { RoomUpdateAction, RoomUpdateActionType } from './types';
import { RoomUpdateState } from './models/RoomUpdateState';
import { IRoomDto } from '../../../../db/interfaces';
import { getError } from '../../../../utils/getAxiosError';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Update room
export const roomUpdate =
  (roomId: string, room: IRoomDto) =>
  async (dispatch: ThunkDispatch<RoomUpdateState, undefined, RoomUpdateAction>): Promise<RoomUpdateAction> => {
    try {
      dispatch({
        type: RoomUpdateActionType.ROOM_UPDATE_REQUEST,
      });

      const link = `/api/admin/rooms/${roomId}`;

      const { data } = await axios.put<IRoomDto>(link, room, config);

      return dispatch({
        type: RoomUpdateActionType.ROOM_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: RoomUpdateActionType.ROOM_UPDATE_FAIL,
        payload: { error: err, room: { ...room } },
      });
    }
  };
