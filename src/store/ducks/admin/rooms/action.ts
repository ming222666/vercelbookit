import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AdminRoomsAction, AdminRoomsActionType } from './types';
import { AdminRoomsState } from './models/AdminRoomsState';
import { IRoomDto } from '../../../../db/interfaces';
import { getError } from '../../../../utils/getAxiosError';

// Get all rooms (admin)
export const getRooms =
  (sort = '') =>
  async (dispatch: ThunkDispatch<AdminRoomsState, undefined, AdminRoomsAction>): Promise<AdminRoomsAction> => {
    try {
      dispatch({
        type: AdminRoomsActionType.ADMIN_ROOMS_REQUEST,
      });

      const link = `/api/admin/rooms${sort ? '?sort=yes' : ''}`;

      const { data } = await axios.get<IRoomDto[]>(link);

      return dispatch({
        type: AdminRoomsActionType.ADMIN_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: AdminRoomsActionType.ADMIN_ROOMS_FAIL,
        payload: err,
      });
    }
  };
