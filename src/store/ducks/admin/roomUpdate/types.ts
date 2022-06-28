import { BaseAction } from '../../../BaseAction';
import { IRoomDto, IErrorDto } from '../../../../db/interfaces';

export enum RoomUpdateActionType {
  ROOM_UPDATE_REQUEST = 'roomUpdate/ROOM_UPDATE_REQUEST',
  ROOM_UPDATE_FAIL = 'roomUpdate/ROOM_UPDATE_FAIL',
  ROOM_UPDATE_SUCCESS = 'roomUpdate/ROOM_UPDATE_SUCCESS',

  ROOM_UPDATE_RESET_FAIL = 'myBookings/ROOM_UPDATE_RESET_FAIL',
  ROOM_UPDATE_RESET_SUCCESS = 'myBookings/ROOM_UPDATE_RESET_SUCCESS',
}

export interface RoomUpdateRequestAction extends BaseAction {
  type: RoomUpdateActionType.ROOM_UPDATE_REQUEST;
}

export interface RoomUpdateFailAction extends BaseAction {
  type: RoomUpdateActionType.ROOM_UPDATE_FAIL;
  payload: { error: IErrorDto; room: IRoomDto };
}

export interface RoomUpdateSuccessAction extends BaseAction {
  type: RoomUpdateActionType.ROOM_UPDATE_SUCCESS;
  payload: IRoomDto;
}

export interface RoomUpdateResetFailAction extends BaseAction {
  type: RoomUpdateActionType.ROOM_UPDATE_RESET_FAIL;
}

export interface RoomUpdateResetSuccessAction extends BaseAction {
  type: RoomUpdateActionType.ROOM_UPDATE_RESET_SUCCESS;
}

export type RoomUpdateAction =
  | RoomUpdateRequestAction
  | RoomUpdateFailAction
  | RoomUpdateSuccessAction
  | RoomUpdateResetFailAction
  | RoomUpdateResetSuccessAction;
