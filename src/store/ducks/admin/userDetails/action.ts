import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { UserDetailsAction, UserDetailsActionType } from './types';
import { UserDetailsState } from './models/UserDetailsState';
import { UserDetailsInfo } from './models/UserDetailsInfo';
import { getError } from '../../../../utils/getAxiosError';

// Get user details
export const getUserDetails =
  (userId: string) =>
  async (dispatch: ThunkDispatch<UserDetailsState, undefined, UserDetailsAction>): Promise<UserDetailsAction> => {
    try {
      dispatch({
        type: UserDetailsActionType.USER_DETAILS_REQUEST,
      });

      const { data } = await axios.get<UserDetailsInfo>(`/api/admin/users/${userId}`);

      return dispatch({
        type: UserDetailsActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: UserDetailsActionType.USER_DETAILS_FAIL,
        payload: err,
      });
    }
  };
