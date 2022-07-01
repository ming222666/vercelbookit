import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

/**
 * Room Delete
 */
export enum RoomDeleteActionType {
  ROOM_DELETE_REQUEST = 'roomDelete/ROOM_DELETE_REQUEST',
  ROOM_DELETE_FAIL = 'roomDelete/ROOM_DELETE_FAIL',
  ROOM_DELETE_SUCCESS = 'roomDelete/ROOM_DELETE_SUCCESS',
  ROOM_DELETE_RESET_FAIL = 'roomDelete/ROOM_DELETE_RESET_FAIL',
  ROOM_DELETE_RESET_SUCCESS = 'roomDelete/ROOM_DELETE_RESET_SUCCESS',
  ROOM_DELETE_RESET = 'roomDelete/ROOM_DELETE_RESET',
}

export interface RoomDeleteRequestAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_REQUEST;
}

export interface RoomDeleteFailAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_FAIL;
  payload: IErrorDto;
}

export interface RoomDeleteSuccessAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_SUCCESS;
}

export interface RoomDeleteResetFailAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_RESET_FAIL;
}

export interface RoomDeleteResetSuccessAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_RESET_SUCCESS;
}

export interface RoomDeleteResetAction extends BaseAction {
  type: RoomDeleteActionType.ROOM_DELETE_RESET;
}

export type RoomDeleteAction =
  | RoomDeleteRequestAction
  | RoomDeleteFailAction
  | RoomDeleteSuccessAction
  | RoomDeleteResetFailAction
  | RoomDeleteResetSuccessAction
  | RoomDeleteResetAction;
