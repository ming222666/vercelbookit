import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { IBookingExtended } from '../../../../controllers/interfaces';

export enum MyBookingsActionType {
  LOAD_MY_BOOKINGS_REQUEST = 'myBookings/LOAD_MY_BOOKINGS_REQUEST',
  LOAD_MY_BOOKINGS_FAIL = 'myBookings/LOAD_MY_BOOKINGS_FAIL',
  LOAD_MY_BOOKINGS_SUCCESS = 'myBookings/LOAD_MY_BOOKINGS_SUCCESS',

  RESET_MY_BOOKINGS_FAIL = 'myBookings/RESET_MY_BOOKINGS_FAIL',
  RESET_MY_BOOKINGS_SUCCESS = 'myBookings/RESET_MY_BOOKINGS_SUCCESS',
}

export interface LoadMyBookingsRequestAction extends BaseAction {
  type: MyBookingsActionType.LOAD_MY_BOOKINGS_REQUEST;
}

export interface LoadMyBookingsFailAction extends BaseAction {
  type: MyBookingsActionType.LOAD_MY_BOOKINGS_FAIL;
  payload: IErrorDto;
}

export interface LoadMyBookingsSuccessAction extends BaseAction {
  type: MyBookingsActionType.LOAD_MY_BOOKINGS_SUCCESS;
  payload: { user: string; bookings: IBookingExtended[] };
}

export interface ResetMyBookingsFailAction extends BaseAction {
  type: MyBookingsActionType.RESET_MY_BOOKINGS_FAIL;
}

export interface ResetMyBookingsSuccessAction extends BaseAction {
  type: MyBookingsActionType.RESET_MY_BOOKINGS_SUCCESS;
}

export type MyBookingsAction =
  | LoadMyBookingsRequestAction
  | LoadMyBookingsFailAction
  | LoadMyBookingsSuccessAction
  | ResetMyBookingsFailAction
  | ResetMyBookingsSuccessAction;
