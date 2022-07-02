import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { UserDeleteAction, UserDeleteActionType } from './types';
import { UserDeleteState } from './models/UserDeleteState';
import { getError } from '../../../../utils/getAxiosError';

// Delete user
export const userDelete =
  (userId: string) =>
  async (dispatch: ThunkDispatch<UserDeleteState, undefined, UserDeleteAction>): Promise<UserDeleteAction> => {
    try {
      dispatch({
        type: UserDeleteActionType.USER_DELETE_REQUEST,
      });

      const link = `/api/admin/users/${userId}`;

      const { data } = await axios.delete<{ success: boolean }>(link);

      return dispatch({
        type: UserDeleteActionType.USER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: UserDeleteActionType.USER_DELETE_FAIL,
        payload: err,
      });
    }
  };
