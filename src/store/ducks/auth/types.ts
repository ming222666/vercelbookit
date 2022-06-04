import { BaseAction } from '../../BaseAction';
import { IUserDto, IErrorDto } from '../../../db/interfaces';

export enum AuthActionType {
  AUTH_REQUEST = 'auth/AUTH_REQUEST',
  REGISTER_USER_FAIL = 'auth/REGISTER_USER_FAIL',
  REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS',
}

export interface AuthRequestAction extends BaseAction {
  type: AuthActionType.AUTH_REQUEST;
}

export interface RegisterUserSuccessAction extends BaseAction {
  type: AuthActionType.REGISTER_USER_SUCCESS;
  payload: IUserDto;
}

export interface RegisterUserFailAction extends BaseAction {
  type: AuthActionType.REGISTER_USER_FAIL;
  payload: IErrorDto;
}

export type AuthAction = AuthRequestAction | RegisterUserSuccessAction | RegisterUserFailAction;
