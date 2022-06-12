import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { PasswordAction, PasswordActionType } from './types';
import { PasswordState } from './models/PasswordState';
import { IErrorDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Forgot password action
export const forgotPassword =
  (email: string) =>
  async (dispatch: ThunkDispatch<PasswordState, undefined, PasswordAction>): Promise<PasswordAction> => {
    try {
      dispatch({
        type: PasswordActionType.FORGOT_PASSWORD_REQUEST,
      });

      await axios.post<{ status: number } | IErrorDto>('/api/password/forgot', { email }, config);

      return dispatch({
        type: PasswordActionType.FORGOT_PASSWORD_SUCCESS,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: PasswordActionType.FORGOT_PASSWORD_FAIL,
        payload: err,
      });
    }
  };

// Reset password action
export const resetPassword =
  (token: string, newPassword: string, confirmPassword: string) =>
  async (dispatch: ThunkDispatch<PasswordState, undefined, PasswordAction>): Promise<PasswordAction> => {
    try {
      dispatch({
        type: PasswordActionType.RESET_PASSWORD_REQUEST,
      });

      await axios.put<{ status: number } | IErrorDto>(
        `/api/password/reset/${token}`,
        { newPassword, confirmPassword },
        config,
      );

      return dispatch({
        type: PasswordActionType.RESET_PASSWORD_SUCCESS,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: PasswordActionType.RESET_PASSWORD_FAIL,
        payload: err,
      });
    }
  };
