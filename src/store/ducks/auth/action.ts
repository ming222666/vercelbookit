import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';
import { IUserDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';
import IUserFormData from '../../../controllers/interfaces/IUserFormData';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// * Commented below registerUser action as it is not being used anywhere,
// * in particular regarding Register component.
// Register user
/* export const registerUser =
  (userData: IUserFormData) =>
  async (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>): Promise<AuthAction> => {
    try {
      dispatch({
        type: AuthActionType.LOAD_USER_REQUEST,
      });

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
  }; */

// Get current user
export const loadUser =
  () /* : ThunkAction<Promise<AuthAction>, AuthState, undefined, AuthAction> */ =>
  async (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>): Promise<AuthAction> => {
    try {
      dispatch({
        type: AuthActionType.LOAD_USER_REQUEST,
      });

      const { data } = await axios.get<IUserDto>('/api/me/profile');

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

// Update user
export const updateUser =
  (userData: IUserFormData) =>
  async (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>): Promise<AuthAction> => {
    try {
      dispatch({
        type: AuthActionType.LOAD_USER_REQUEST,
      });

      const { data } = await axios.put<IUserDto>('/api/me/update', userData, config);

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
