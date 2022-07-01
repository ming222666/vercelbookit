import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { IBookingExtended } from '../../../../controllers/interfaces';

export enum AdminBookingsActionType {
  LOAD_ADMIN_BOOKINGS_REQUEST = 'adminBookings/LOAD_ADMIN_BOOKINGS_REQUEST',
  LOAD_ADMIN_BOOKINGS_FAIL = 'adminBookings/LOAD_ADMIN_BOOKINGS_FAIL',
  LOAD_ADMIN_BOOKINGS_SUCCESS = 'adminBookings/LOAD_ADMIN_BOOKINGS_SUCCESS',

  RESET_ADMIN_BOOKINGS_FAIL = 'adminBookings/RESET_ADMIN_BOOKINGS_FAIL',
  RESET_ADMIN_BOOKINGS_SUCCESS = 'adminBookings/RESET_ADMIN_BOOKINGS_SUCCESS',
}

export interface LoadAdminBookingsRequestAction extends BaseAction {
  type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_REQUEST;
}

export interface LoadAdminBookingsFailAction extends BaseAction {
  type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_FAIL;
  payload: IErrorDto;
}

export interface LoadAdminBookingsSuccessAction extends BaseAction {
  type: AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_SUCCESS;
  payload: { bookings: IBookingExtended[] };
}

export interface ResetAdminBookingsFailAction extends BaseAction {
  type: AdminBookingsActionType.RESET_ADMIN_BOOKINGS_FAIL;
}

export interface ResetAdminBookingsSuccessAction extends BaseAction {
  type: AdminBookingsActionType.RESET_ADMIN_BOOKINGS_SUCCESS;
}

export type AdminBookingsAction =
  | LoadAdminBookingsRequestAction
  | LoadAdminBookingsFailAction
  | LoadAdminBookingsSuccessAction
  | ResetAdminBookingsFailAction
  | ResetAdminBookingsSuccessAction;
