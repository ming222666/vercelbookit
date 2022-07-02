import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { UserUpdateInfo } from './models/UserUpdateInfo';

/**
 * User Update
 */
export enum UserUpdateActionType {
  USER_UPDATE_REQUEST = 'userUpdate/USER_UPDATE_REQUEST',
  USER_UPDATE_FAIL = 'userUpdate/USER_UPDATE_FAIL',
  USER_UPDATE_SUCCESS = 'userUpdate/USER_UPDATE_SUCCESS',
  USER_UPDATE_RESET_FAIL = 'userUpdate/USER_UPDATE_RESET_FAIL',
  USER_UPDATE_RESET_SUCCESS = 'userUpdate/USER_UPDATE_RESET_SUCCESS',
  USER_UPDATE_RESET = 'userUpdate/USER_UPDATE_RESET',
}

export interface UserUpdateRequestAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_REQUEST;
}

export interface UserUpdateFailAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_FAIL;
  payload: { error: IErrorDto; user: UserUpdateInfo };
}

export interface UserUpdateSuccessAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_SUCCESS;
  payload: UserUpdateInfo;
}

export interface UserUpdateResetFailAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_RESET_FAIL;
}

export interface UserUpdateResetSuccessAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_RESET_SUCCESS;
}

export interface UserUpdateResetAction extends BaseAction {
  type: UserUpdateActionType.USER_UPDATE_RESET;
}

export type UserUpdateAction =
  | UserUpdateRequestAction
  | UserUpdateFailAction
  | UserUpdateSuccessAction
  | UserUpdateResetFailAction
  | UserUpdateResetSuccessAction
  | UserUpdateResetAction;
