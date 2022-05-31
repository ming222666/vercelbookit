import { BaseAction } from '../../BaseAction';
import { IRoomDto, IErrormsgStatusDto } from '../../../db/interfaces';

export enum RoomDetailsActionType {
  ROOM_DETAILS_FAIL = 'roomDetails/ROOM_DETAILS_FAIL',
  ROOM_DETAILS_SUCCESS = 'roomDetails/ROOM_DETAILS_SUCCESS',
  CLEAR_ERRORS = 'roomDetails/CLEAR_ERRORS',
}

export interface GetRoomDetailsSuccessAction extends BaseAction {
  type: RoomDetailsActionType.ROOM_DETAILS_SUCCESS;
  payload: IRoomDto;
}

export interface GetRoomDetailsFailAction extends BaseAction {
  type: RoomDetailsActionType.ROOM_DETAILS_FAIL;
  payload: IErrormsgStatusDto;
}

export interface GetRoomDetailsClearErrorsAction extends BaseAction {
  type: RoomDetailsActionType.CLEAR_ERRORS;
}

export type RoomDetailsAction =
  | GetRoomDetailsSuccessAction
  | GetRoomDetailsFailAction
  | GetRoomDetailsClearErrorsAction;
