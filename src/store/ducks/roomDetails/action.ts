import type { IncomingMessage } from 'http';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import { RoomDetailsAction, RoomDetailsActionType } from './types';
import { RoomDetailsState } from './models/RoomDetailsState';
import { IRoomDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';

// Get room details
export const getRoom =
  (req: IncomingMessage, roomId: string) =>
  async (dispatch: ThunkDispatch<RoomDetailsState, undefined, RoomDetailsAction>): Promise<RoomDetailsAction> => {
    try {
      dispatch({
        type: RoomDetailsActionType.ROOM_DETAILS_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      const { data } = await axios.get<IRoomDto>(`${origin}/api/rooms/${roomId}`);

      return dispatch({
        type: RoomDetailsActionType.ROOM_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: RoomDetailsActionType.ROOM_DETAILS_FAIL,
        payload: err,
      });
    }
  };
