import { BaseAction } from '../../BaseAction';
import { IRoomDto, IErrorDto } from '../../../db/interfaces';

export enum RoomDetailsActionType {
  ROOM_DETAILS_REQUEST = 'roomDetails/ROOM_DETAILS_REQUEST',
  ROOM_DETAILS_FAIL = 'roomDetails/ROOM_DETAILS_FAIL',
  ROOM_DETAILS_SUCCESS = 'roomDetails/ROOM_DETAILS_SUCCESS',
}

export interface RoomDetailsRequestAction extends BaseAction {
  type: RoomDetailsActionType.ROOM_DETAILS_REQUEST;
}

export interface GetRoomDetailsSuccessAction extends BaseAction {
  type: RoomDetailsActionType.ROOM_DETAILS_SUCCESS;
  payload: IRoomDto;
}

export interface GetRoomDetailsFailAction extends BaseAction {
  type: RoomDetailsActionType.ROOM_DETAILS_FAIL;
  payload: IErrorDto;
}

export type RoomDetailsAction = RoomDetailsRequestAction | GetRoomDetailsSuccessAction | GetRoomDetailsFailAction;
