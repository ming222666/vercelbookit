import { BaseAction } from '../../BaseAction';
import { IUserDto, IErrorDto } from '../../../db/interfaces';

export enum AuthActionType {
  LOAD_USER_REQUEST = 'auth/LOAD_USER_REQUEST',
  LOAD_USER_FAIL = 'auth/LOAD_USER_FAIL',
  LOAD_USER_SUCCESS = 'auth/LOAD_USER_SUCCESS',

  UPDATE_USER_REQUEST = 'auth/UPDATE_USER_REQUEST',
  UPDATE_USER_FAIL = 'auth/UPDATE_USER_FAIL',
  UPDATE_USER_SUCCESS = 'auth/UPDATE_USER_SUCCESS',
  UPDATE_USER_RESET_FAIL = 'auth/UPDATE_USER_RESET_FAIL',
  UPDATE_USER_RESET_SUCCESS = 'auth/UPDATE_USER_RESET_SUCCESS',
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

export interface UpdateUserRequestAction extends BaseAction {
  type: AuthActionType.UPDATE_USER_REQUEST;
}

export interface UpdateUserFailAction extends BaseAction {
  type: AuthActionType.UPDATE_USER_FAIL;
  payload: IErrorDto;
}

export interface UpdateUserSuccessAction extends BaseAction {
  type: AuthActionType.UPDATE_USER_SUCCESS;
  payload: IUserDto;
}

export interface UpdateUserResetFailAction extends BaseAction {
  type: AuthActionType.UPDATE_USER_RESET_FAIL;
}

export interface UpdateUserResetSuccessAction extends BaseAction {
  type: AuthActionType.UPDATE_USER_RESET_SUCCESS;
}

export type AuthAction =
  | LoadUserRequestAction
  | LoadUserFailAction
  | LoadUserSuccessAction
  // | LoadUserResetLoadingAction
  | UpdateUserRequestAction
  | UpdateUserFailAction
  | UpdateUserSuccessAction
  | UpdateUserResetFailAction
  | UpdateUserResetSuccessAction;
