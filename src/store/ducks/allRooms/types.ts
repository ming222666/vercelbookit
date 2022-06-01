import { BaseAction } from '../../BaseAction';
import { IAllRoomsDto, IErrormsgStatusDto } from '../../../db/interfaces';

export enum AllRoomsActionType {
  ALL_ROOMS_FAIL = 'allRooms/ALL_ROOMS_FAIL',
  ALL_ROOMS_SUCCESS = 'allRooms/ALL_ROOMS_SUCCESS',
  CLEAR_ERRORS = 'allRooms/CLEAR_ERRORS',
}

export interface GetAllRoomsSuccessAction extends BaseAction {
  type: AllRoomsActionType.ALL_ROOMS_SUCCESS;
  payload: IAllRoomsDto;
}

export interface GetAllRoomsFailAction extends BaseAction {
  type: AllRoomsActionType.ALL_ROOMS_FAIL;
  payload: IErrormsgStatusDto;
}

export interface GetAllRoomsClearErrorsAction extends BaseAction {
  type: AllRoomsActionType.CLEAR_ERRORS;
}

export type AllRoomsAction = GetAllRoomsSuccessAction | GetAllRoomsFailAction | GetAllRoomsClearErrorsAction;
