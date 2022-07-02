import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { UserUpdateAction, UserUpdateActionType } from './types';
import { UserUpdateState } from './models/UserUpdateState';
import { UserUpdateInfo } from './models/UserUpdateInfo';
import { getError } from '../../../../utils/getAxiosError';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Update user
export const userUpdate =
  (userId: string, user: UserUpdateInfo) =>
  async (dispatch: ThunkDispatch<UserUpdateState, undefined, UserUpdateAction>): Promise<UserUpdateAction> => {
    try {
      dispatch({
        type: UserUpdateActionType.USER_UPDATE_REQUEST,
      });

      const link = `/api/admin/users/${userId}`;

      const { data } = await axios.put<UserUpdateInfo>(link, user, config);

      return dispatch({
        type: UserUpdateActionType.USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: UserUpdateActionType.USER_UPDATE_FAIL,
        payload: { error: err, user: { ...user } },
      });
    }
  };
