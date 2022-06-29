import { BaseAction } from '../../../BaseAction';
import { IRoomDto, IErrorDto } from '../../../../db/interfaces';

/**
 * Room Create
 */
export enum RoomCreateActionType {
  ROOM_CREATE_REQUEST = 'roomCreate/ROOM_CREATE_REQUEST',
  ROOM_CREATE_FAIL = 'roomCreate/ROOM_CREATE_FAIL',
  ROOM_CREATE_SUCCESS = 'roomCreate/ROOM_CREATE_SUCCESS',
  ROOM_CREATE_RESET_FAIL = 'roomCreate/ROOM_CREATE_RESET_FAIL',
  ROOM_CREATE_RESET_SUCCESS = 'roomCreate/ROOM_CREATE_RESET_SUCCESS',
}

export interface RoomCreateRequestAction extends BaseAction {
  type: RoomCreateActionType.ROOM_CREATE_REQUEST;
}

export interface RoomCreateFailAction extends BaseAction {
  type: RoomCreateActionType.ROOM_CREATE_FAIL;
  payload: { error: IErrorDto; room: IRoomDto };
}

export interface RoomCreateSuccessAction extends BaseAction {
  type: RoomCreateActionType.ROOM_CREATE_SUCCESS;
  payload: IRoomDto;
}

export interface RoomCreateResetFailAction extends BaseAction {
  type: RoomCreateActionType.ROOM_CREATE_RESET_FAIL;
}

export interface RoomCreateResetSuccessAction extends BaseAction {
  type: RoomCreateActionType.ROOM_CREATE_RESET_SUCCESS;
}

export type RoomCreateAction =
  | RoomCreateRequestAction
  | RoomCreateFailAction
  | RoomCreateSuccessAction
  | RoomCreateResetFailAction
  | RoomCreateResetSuccessAction;

/**
 * Room Update
 */
export enum RoomUpdateActionType {
  ROOM_UPDATE_REQUEST = 'roomUpdate/ROOM_UPDATE_REQUEST',
  ROOM_UPDATE_FAIL = 'roomUpdate/ROOM_UPDATE_FAIL',
  ROOM_UPDATE_SUCCESS = 'roomUpdate/ROOM_UPDATE_SUCCESS',
  ROOM_UPDATE_RESET_FAIL = 'roomUpdate/ROOM_UPDATE_RESET_FAIL',
  ROOM_UPDATE_RESET_SUCCESS = 'roomUpdate/ROOM_UPDATE_RESET_SUCCESS',
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
