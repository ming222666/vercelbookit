import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

/**
 * Booking Delete
 */
export enum BookingDeleteActionType {
  BOOKING_DELETE_REQUEST = 'bookingDelete/BOOKING_DELETE_REQUEST',
  BOOKING_DELETE_FAIL = 'bookingDelete/BOOKING_DELETE_FAIL',
  BOOKING_DELETE_SUCCESS = 'bookingDelete/BOOKING_DELETE_SUCCESS',
  BOOKING_DELETE_RESET_FAIL = 'bookingDelete/BOOKING_DELETE_RESET_FAIL',
  BOOKING_DELETE_RESET_SUCCESS = 'bookingDelete/BOOKING_DELETE_RESET_SUCCESS',
  BOOKING_DELETE_RESET = 'bookingDelete/BOOKING_DELETE_RESET',
}

export interface BookingDeleteRequestAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_REQUEST;
}

export interface BookingDeleteFailAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_FAIL;
  payload: IErrorDto;
}

export interface BookingDeleteSuccessAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_SUCCESS;
}

export interface BookingDeleteResetFailAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_RESET_FAIL;
}

export interface BookingDeleteResetSuccessAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_RESET_SUCCESS;
}

export interface BookingDeleteResetAction extends BaseAction {
  type: BookingDeleteActionType.BOOKING_DELETE_RESET;
}

export type BookingDeleteAction =
  | BookingDeleteRequestAction
  | BookingDeleteFailAction
  | BookingDeleteSuccessAction
  | BookingDeleteResetFailAction
  | BookingDeleteResetSuccessAction
  | BookingDeleteResetAction;
