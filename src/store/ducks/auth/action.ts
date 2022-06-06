import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';
import { IUserDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';
import IRegisterUserFormData from '../../../controllers/interfaces/IRegisterUserFormData';

// Register user
export const registerUser =
  (userData: IRegisterUserFormData) =>
  async (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>): Promise<AuthAction> => {
    try {
      dispatch({
        type: AuthActionType.LOAD_USER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<IUserDto>('/api/auth/register', userData, config);

      return dispatch({
        type: AuthActionType.LOAD_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: AuthActionType.LOAD_USER_FAIL,
        payload: err,
      });
    }
  };
