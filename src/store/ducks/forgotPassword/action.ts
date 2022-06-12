import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { ForgotPasswordAction, ForgotPasswordActionType } from './types';
import { IErrorDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Forgot password
export const forgotPassword =
  (email: string) =>
  async (dispatch: ThunkDispatch<undefined, undefined, ForgotPasswordAction>): Promise<ForgotPasswordAction> => {
    try {
      dispatch({
        type: ForgotPasswordActionType.FORGOT_PASSWORD_REQUEST,
      });

      await axios.post<{ status: number } | IErrorDto>('/api/password/forgot', { email }, config);

      return dispatch({
        type: ForgotPasswordActionType.FORGOT_PASSWORD_SUCCESS,
      });
    } catch (error) {
      const err = getError(error);

      return dispatch({
        type: ForgotPasswordActionType.FORGOT_PASSWORD_FAIL,
        payload: err,
      });
    }
  };
