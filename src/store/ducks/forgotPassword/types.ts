import { BaseAction } from '../../BaseAction';
import { IErrorDto } from '../../../db/interfaces';

export enum ForgotPasswordActionType {
  FORGOT_PASSWORD_REQUEST = 'ForgotPassword/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_FAIL = 'ForgotPassword/FORGOT_PASSWORD_FAIL',
  FORGOT_PASSWORD_SUCCESS = 'ForgotPassword/FORGOT_PASSWORD_SUCCESS',
}

export interface ForgotPasswordRequestAction extends BaseAction {
  type: ForgotPasswordActionType.FORGOT_PASSWORD_REQUEST;
}

export interface ForgotPasswordSuccessAction extends BaseAction {
  type: ForgotPasswordActionType.FORGOT_PASSWORD_SUCCESS;
}

export interface ForgotPasswordFailAction extends BaseAction {
  type: ForgotPasswordActionType.FORGOT_PASSWORD_FAIL;
  payload: IErrorDto;
}

export type ForgotPasswordAction = ForgotPasswordRequestAction | ForgotPasswordSuccessAction | ForgotPasswordFailAction;
