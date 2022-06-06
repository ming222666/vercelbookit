import { BaseAction } from '../../BaseAction';
import { IUserDto, IErrorDto } from '../../../db/interfaces';

export enum AuthActionType {
  LOAD_USER_REQUEST = 'auth/LOAD_USER_REQUEST',
  LOAD_USER_FAIL = 'auth/LOAD_USER_FAIL',
  LOAD_USER_SUCCESS = 'auth/LOAD_USER_SUCCESS',
}

export interface LoadUserRequestAction extends BaseAction {
  type: AuthActionType.LOAD_USER_REQUEST;
}

export interface LoadUserFailAction extends BaseAction {
  type: AuthActionType.LOAD_USER_FAIL;
  payload: IErrorDto;
}

export interface LoadUserSuccessAction extends BaseAction {
  type: AuthActionType.LOAD_USER_SUCCESS;
  payload: IUserDto;
}

export type AuthAction = LoadUserRequestAction | LoadUserFailAction | LoadUserSuccessAction;
