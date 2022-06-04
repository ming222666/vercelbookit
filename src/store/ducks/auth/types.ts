import { BaseAction } from '../../BaseAction';
import { IUserDto, IErrormsgStatusDto } from '../../../db/interfaces';

export enum AuthActionType {
  LOADING_FALSE = 'auth/LOADING_FALSE',
  LOADING_TRUE = 'auth/LOADING_TRUE',
  REGISTER_USER_FAIL = 'auth/REGISTER_USER_FAIL',
  REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS',
  CLEAR_ERRORS = 'auth/CLEAR_ERRORS',
}

export interface AuthLoadingFalseAction extends BaseAction {
  type: AuthActionType.LOADING_FALSE;
}

export interface AuthLoadingTrueAction extends BaseAction {
  type: AuthActionType.LOADING_TRUE;
}

export interface RegisterUserSuccessAction extends BaseAction {
  type: AuthActionType.REGISTER_USER_SUCCESS;
  payload: IUserDto;
}

export interface RegisterUserFailAction extends BaseAction {
  type: AuthActionType.REGISTER_USER_FAIL;
  payload: IErrormsgStatusDto;
}

export interface AuthClearErrorsAction extends BaseAction {
  type: AuthActionType.CLEAR_ERRORS;
}

export type AuthAction =
  | AuthLoadingFalseAction
  | AuthLoadingTrueAction
  | RegisterUserSuccessAction
  | RegisterUserFailAction
  | AuthClearErrorsAction;
