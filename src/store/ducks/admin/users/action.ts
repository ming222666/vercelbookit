import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AdminUsersAction, AdminUsersActionType } from './types';
import { AdminUsersState } from './models/AdminUsersState';
import { IUserDto } from '../../../../db/interfaces';
import { getError } from '../../../../utils/getAxiosError';

// Get all users (admin)
export const getUsers =
  (updated = '') =>
  async (dispatch: ThunkDispatch<AdminUsersState, undefined, AdminUsersAction>): Promise<AdminUsersAction> => {
    try {
      dispatch({
        type: AdminUsersActionType.ADMIN_USERS_REQUEST,
      });

      const link = `/api/admin/users${updated ? '?updated=yes' : ''}`;

      const { data } = await axios.get<IUserDto[]>(link);

      return dispatch({
        type: AdminUsersActionType.ADMIN_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: AdminUsersActionType.ADMIN_USERS_FAIL,
        payload: err,
      });
    }
  };
