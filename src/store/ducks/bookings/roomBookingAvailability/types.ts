import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

export enum RoomBookingAvailabilityActionType {
  LOAD_ROOM_BOOKING_AVAILABLILITY_REQUEST = 'roomBookingAvailability/LOAD_ROOM_BOOKING_AVAILABLILITY_REQUEST',
  LOAD_ROOM_BOOKING_AVAILABLILITY_FAIL = 'roomBookingAvailability/LOAD_ROOM_BOOKING_AVAILABLILITY_FAIL',
  LOAD_ROOM_BOOKING_AVAILABLILITY_SUCCESS = 'roomBookingAvailability/LOAD_ROOM_BOOKING_AVAILABLILITY_SUCCESS',
}

export interface RoadroomBookingAvailabilityRequestAction extends BaseAction {
  type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_REQUEST;
}

export interface RoadroomBookingAvailabilityFailAction extends BaseAction {
  type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_FAIL;
  payload: IErrorDto;
}

export interface RoadroomBookingAvailabilitySuccessAction extends BaseAction {
  type: RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_SUCCESS;
  payload: { roomId: string; isAvailable: boolean | null };
}

export type RoomBookingAvailabilityAction =
  | RoadroomBookingAvailabilityRequestAction
  | RoadroomBookingAvailabilityFailAction
  | RoadroomBookingAvailabilitySuccessAction;
