import { BaseAction } from '../../BaseAction';
import { IErrorDto } from '../../../db/interfaces';

export enum PasswordActionType {
  FORGOT_PASSWORD_REQUEST = 'Password/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_FAIL = 'Password/FORGOT_PASSWORD_FAIL',
  FORGOT_PASSWORD_SUCCESS = 'Password/FORGOT_PASSWORD_SUCCESS',

  RESET_PASSWORD_REQUEST = 'Password/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_FAIL = 'Password/RESET_PASSWORD_FAIL',
  RESET_PASSWORD_SUCCESS = 'Password/RESET_PASSWORD_SUCCESS',
}

export interface ForgotPasswordRequestAction extends BaseAction {
  type: PasswordActionType.FORGOT_PASSWORD_REQUEST;
}

export interface ForgotPasswordSuccessAction extends BaseAction {
  type: PasswordActionType.FORGOT_PASSWORD_SUCCESS;
}

export interface ForgotPasswordFailAction extends BaseAction {
  type: PasswordActionType.FORGOT_PASSWORD_FAIL;
  payload: IErrorDto;
}

export interface ResetPasswordRequestAction extends BaseAction {
  type: PasswordActionType.RESET_PASSWORD_REQUEST;
}

export interface ResetPasswordSuccessAction extends BaseAction {
  type: PasswordActionType.RESET_PASSWORD_SUCCESS;
}

export interface ResetPasswordFailAction extends BaseAction {
  type: PasswordActionType.RESET_PASSWORD_FAIL;
  payload: IErrorDto;
}

export type PasswordAction =
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailAction;
