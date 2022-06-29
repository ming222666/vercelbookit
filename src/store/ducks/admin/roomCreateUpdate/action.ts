import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { RoomCreateAction, RoomCreateActionType } from './types';
import { RoomUpdateAction, RoomUpdateActionType } from './types';
import { RoomCreateUpdateState } from './models/RoomCreateUpdateState';
import { IRoomDto, IRoomWithImagesBase64Dto } from '../../../../db/interfaces';
import { getError } from '../../../../utils/getAxiosError';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create room
export const roomCreate =
  (room: IRoomWithImagesBase64Dto) =>
  async (dispatch: ThunkDispatch<RoomCreateUpdateState, undefined, RoomCreateAction>): Promise<RoomCreateAction> => {
    try {
      dispatch({
        type: RoomCreateActionType.ROOM_CREATE_REQUEST,
      });

      const link = '/api/admin/rooms';

      const { data } = await axios.post<IRoomDto>(link, room, config);

      return dispatch({
        type: RoomCreateActionType.ROOM_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: RoomCreateActionType.ROOM_CREATE_FAIL,
        payload: { error: err, room: { ...room } },
      });
    }
  };

// Update room
export const roomUpdate =
  (roomId: string, room: IRoomDto) =>
  async (dispatch: ThunkDispatch<RoomCreateUpdateState, undefined, RoomUpdateAction>): Promise<RoomUpdateAction> => {
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
