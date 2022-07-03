import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { UserDetailsInfo } from './models/UserDetailsInfo';

export enum UserDetailsActionType {
  USER_DETAILS_REQUEST = 'userDetails/USER_DETAILS_REQUEST',
  USER_DETAILS_FAIL = 'userDetails/USER_DETAILS_FAIL',
  USER_DETAILS_SUCCESS = 'userDetails/USER_DETAILS_SUCCESS',

  USER_DETAILS_RESET_FAIL = 'userDetails/USER_DETAILS_RESET_FAIL',
  USER_DETAILS_RESET_SUCCESS = 'userDetails/USER_DETAILS_RESET_SUCCESS',
}

export interface UserDetailsRequestAction extends BaseAction {
  type: UserDetailsActionType.USER_DETAILS_REQUEST;
}

export interface GetUserDetailsFailAction extends BaseAction {
  type: UserDetailsActionType.USER_DETAILS_FAIL;
  payload: IErrorDto;
}

export interface GetUserDetailsSuccessAction extends BaseAction {
  type: UserDetailsActionType.USER_DETAILS_SUCCESS;
  payload: UserDetailsInfo;
}

export interface GetUserDetailsResetFailAction extends BaseAction {
  type: UserDetailsActionType.USER_DETAILS_RESET_FAIL;
}

export interface GetUserDetailsResetSuccessAction extends BaseAction {
  type: UserDetailsActionType.USER_DETAILS_RESET_SUCCESS;
}

export type UserDetailsAction =
  | UserDetailsRequestAction
  | GetUserDetailsFailAction
  | GetUserDetailsSuccessAction
  | GetUserDetailsResetFailAction
  | GetUserDetailsResetSuccessAction;
