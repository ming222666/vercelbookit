import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';
import { IUserDto } from '../../../db/interfaces';
import { getError } from '../../../utils/getAxiosError';
import IRegisterUserRequest from '../../../controllers/interfaces/IRegisterUserRequest';
// import { ExceptionErrorActionType } from '../../../store/ducks/exceptionError/types';

// Register user
export const registerUser =
  (userData: IRegisterUserRequest) =>
  async (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>): Promise<AuthAction | Error> => {
    try {
      dispatch({
        type: AuthActionType.LOADING_TRUE,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<IUserDto>('/api/auth/register', userData, config);

      return dispatch({
        type: AuthActionType.REGISTER_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const err = getError(error);

      if (err instanceof Error) {
        dispatch({
          type: AuthActionType.LOADING_FALSE,
        });
        return err;
      }

      return dispatch({
        type: AuthActionType.REGISTER_USER_FAIL,
        payload: err,
      });
    }
  };

// Clear Errors
export const clearError = (): AuthAction => ({ type: AuthActionType.CLEAR_ERRORS });
