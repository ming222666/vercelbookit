import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { IBookingExtended } from '../../../../controllers/interfaces';

export enum BookingDetailsActionType {
  LOAD_BOOKING_DETAILS_REQUEST = 'bookingDetails/LOAD_BOOKING_DETAILS_REQUEST',
  LOAD_BOOKING_DETAILS_FAIL = 'bookingDetails/LOAD_BOOKING_DETAILS_FAIL',
  LOAD_BOOKING_DETAILS_SUCCESS = 'bookingDetails/LOAD_BOOKING_DETAILS_SUCCESS',
}

export interface LoadBookingDetailsRequestAction extends BaseAction {
  type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_REQUEST;
}

export interface LoadBookingDetailsFailAction extends BaseAction {
  type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_FAIL;
  payload: IErrorDto;
}

export interface LoadBookingDetailsSuccessAction extends BaseAction {
  type: BookingDetailsActionType.LOAD_BOOKING_DETAILS_SUCCESS;
  payload: IBookingExtended;
}

export type BookingDetailsAction =
  | LoadBookingDetailsRequestAction
  | LoadBookingDetailsFailAction
  | LoadBookingDetailsSuccessAction;
