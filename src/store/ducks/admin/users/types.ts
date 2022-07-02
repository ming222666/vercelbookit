import { BaseAction } from '../../../BaseAction';
import { IUserDto, IErrorDto } from '../../../../db/interfaces';

export enum AdminUsersActionType {
  ADMIN_USERS_REQUEST = 'adminUsers/ADMIN_USERS_REQUEST',
  ADMIN_USERS_FAIL = 'adminUsers/ADMIN_USERS_FAIL',
  ADMIN_USERS_SUCCESS = 'adminUsers/ADMIN_USERS_SUCCESS',

  ADMIN_USERS_RESET_FAIL = 'adminUsers/ADMIN_USERS_RESET_FAIL',
  ADMIN_USERS_RESET_SUCCESS = 'adminUsers/ADMIN_USERS_RESET_SUCCESS',
}

export interface AdminUsersRequestAction extends BaseAction {
  type: AdminUsersActionType.ADMIN_USERS_REQUEST;
}

export interface AdminUsersFailAction extends BaseAction {
  type: AdminUsersActionType.ADMIN_USERS_FAIL;
  payload: IErrorDto;
}

export interface AdminUsersSuccessAction extends BaseAction {
  type: AdminUsersActionType.ADMIN_USERS_SUCCESS;
  payload: IUserDto[];
}

export interface AdminUsersResetFailAction extends BaseAction {
  type: AdminUsersActionType.ADMIN_USERS_RESET_FAIL;
}

export interface AdminUsersResetSuccessAction extends BaseAction {
  type: AdminUsersActionType.ADMIN_USERS_RESET_SUCCESS;
}

export type AdminUsersAction =
  | AdminUsersRequestAction
  | AdminUsersFailAction
  | AdminUsersSuccessAction
  | AdminUsersResetFailAction
  | AdminUsersResetSuccessAction;
