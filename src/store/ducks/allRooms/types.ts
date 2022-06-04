import { BaseAction } from '../../BaseAction';
import { IAllRoomsDto, IErrorDto } from '../../../db/interfaces';

export enum AllRoomsActionType {
  ALL_ROOMS_REQUEST = 'allRooms/ALL_ROOMS_REQUEST',
  ALL_ROOMS_FAIL = 'allRooms/ALL_ROOMS_FAIL',
  ALL_ROOMS_SUCCESS = 'allRooms/ALL_ROOMS_SUCCESS',
}

export interface AllRoomsRequestAction extends BaseAction {
  type: AllRoomsActionType.ALL_ROOMS_REQUEST;
}

export interface GetAllRoomsSuccessAction extends BaseAction {
  type: AllRoomsActionType.ALL_ROOMS_SUCCESS;
  payload: IAllRoomsDto;
}

export interface GetAllRoomsFailAction extends BaseAction {
  type: AllRoomsActionType.ALL_ROOMS_FAIL;
  payload: IErrorDto;
}

export type AllRoomsAction = AllRoomsRequestAction | GetAllRoomsSuccessAction | GetAllRoomsFailAction;
