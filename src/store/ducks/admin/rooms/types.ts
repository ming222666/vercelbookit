import { BaseAction } from '../../../BaseAction';
import { IRoomDto, IErrorDto } from '../../../../db/interfaces';

export enum AdminRoomsActionType {
  ADMIN_ROOMS_REQUEST = 'adminRooms/ADMIN_ROOMS_REQUEST',
  ADMIN_ROOMS_FAIL = 'adminRooms/ADMIN_ROOMS_FAIL',
  ADMIN_ROOMS_SUCCESS = 'adminRooms/ADMIN_ROOMS_SUCCESS',

  ADMIN_ROOMS_RESET_FAIL = 'adminRooms/ADMIN_ROOMS_RESET_FAIL',
  ADMIN_ROOMS_RESET_SUCCESS = 'adminRooms/ADMIN_ROOMS_RESET_SUCCESS',
}

export interface AdminRoomsRequestAction extends BaseAction {
  type: AdminRoomsActionType.ADMIN_ROOMS_REQUEST;
}

export interface AdminRoomsFailAction extends BaseAction {
  type: AdminRoomsActionType.ADMIN_ROOMS_FAIL;
  payload: IErrorDto;
}

export interface AdminRoomsSuccessAction extends BaseAction {
  type: AdminRoomsActionType.ADMIN_ROOMS_SUCCESS;
  payload: IRoomDto[];
}

export interface AdminRoomsResetFailAction extends BaseAction {
  type: AdminRoomsActionType.ADMIN_ROOMS_RESET_FAIL;
}

export interface AdminRoomsResetSuccessAction extends BaseAction {
  type: AdminRoomsActionType.ADMIN_ROOMS_RESET_SUCCESS;
}

export type AdminRoomsAction =
  | AdminRoomsRequestAction
  | AdminRoomsFailAction
  | AdminRoomsSuccessAction
  | AdminRoomsResetFailAction
  | AdminRoomsResetSuccessAction;
