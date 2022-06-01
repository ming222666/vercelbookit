import type { IncomingMessage } from 'http';
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import { AllRoomsAction, AllRoomsActionType } from './types';
import { AllRoomsState } from './models/AllRoomsState';
import { IAllRoomsDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';

// Get all rooms
export const getRooms =
  (req: IncomingMessage) =>
  async (dispatch: ThunkDispatch<AllRoomsState, undefined, AllRoomsAction>): Promise<AllRoomsAction | Error> => {
    try {
      const { origin } = absoluteUrl(req);

      const { data } = await axios.get<IAllRoomsDto>(`${origin}/api/rooms`);

      return dispatch({
        type: AllRoomsActionType.ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      if (err instanceof Error) {
        return err;
      }

      return dispatch({
        type: AllRoomsActionType.ALL_ROOMS_FAIL,
        payload: err,
      });
    }
  };

// Clear Errors
export const clearErrors =
  () =>
  async (dispatch: ThunkDispatch<AllRoomsState, undefined, AllRoomsAction>): Promise<AllRoomsAction> => {
    return dispatch({
      type: AllRoomsActionType.CLEAR_ERRORS,
    });
  };
