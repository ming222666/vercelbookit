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
  (req: IncomingMessage, page = '1', location = '', guests: string, category: string) =>
  async (dispatch: ThunkDispatch<AllRoomsState, undefined, AllRoomsAction>): Promise<AllRoomsAction> => {
    try {
      dispatch({
        type: AllRoomsActionType.ALL_ROOMS_REQUEST,
      });

      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/rooms?page=${page}&location=${location}`;

      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get<IAllRoomsDto>(link);

      return dispatch({
        type: AllRoomsActionType.ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: AllRoomsActionType.ALL_ROOMS_FAIL,
        payload: err,
      });
    }
  };
