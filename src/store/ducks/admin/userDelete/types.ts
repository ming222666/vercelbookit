import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

/**
 * User Delete
 */
export enum UserDeleteActionType {
  USER_DELETE_REQUEST = 'userDelete/USER_DELETE_REQUEST',
  USER_DELETE_FAIL = 'userDelete/USER_DELETE_FAIL',
  USER_DELETE_SUCCESS = 'userDelete/USER_DELETE_SUCCESS',
  USER_DELETE_RESET_FAIL = 'userDelete/USER_DELETE_RESET_FAIL',
  USER_DELETE_RESET_SUCCESS = 'userDelete/USER_DELETE_RESET_SUCCESS',
  USER_DELETE_RESET = 'userDelete/USER_DELETE_RESET',
}

export interface UserDeleteRequestAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_REQUEST;
}

export interface UserDeleteFailAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_FAIL;
  payload: IErrorDto;
}

export interface UserDeleteSuccessAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_SUCCESS;
}

export interface UserDeleteResetFailAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_RESET_FAIL;
}

export interface UserDeleteResetSuccessAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_RESET_SUCCESS;
}

export interface UserDeleteResetAction extends BaseAction {
  type: UserDeleteActionType.USER_DELETE_RESET;
}

export type UserDeleteAction =
  | UserDeleteRequestAction
  | UserDeleteFailAction
  | UserDeleteSuccessAction
  | UserDeleteResetFailAction
  | UserDeleteResetSuccessAction
  | UserDeleteResetAction;
