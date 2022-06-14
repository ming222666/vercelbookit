import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

export enum BookedDatesActionType {
  LOAD_BOOKED_DATES_REQUEST = 'bookedDates/LOAD_BOOKED_DATES_REQUEST',
  LOAD_BOOKED_DATES_FAIL = 'bookedDates/LOAD_BOOKED_DATES_FAIL',
  LOAD_BOOKED_DATES_SUCCESS = 'bookedDates/LOAD_BOOKED_DATES_SUCCESS',
}

export interface LoadBookedDatesRequestAction extends BaseAction {
  type: BookedDatesActionType.LOAD_BOOKED_DATES_REQUEST;
}

export interface LoadBookedDatesFailAction extends BaseAction {
  type: BookedDatesActionType.LOAD_BOOKED_DATES_FAIL;
  payload: IErrorDto;
}

export interface LoadBookedDatesSuccessAction extends BaseAction {
  type: BookedDatesActionType.LOAD_BOOKED_DATES_SUCCESS;
  payload: { roomId: string; dates: number[] };
}

export type BookedDatesAction = LoadBookedDatesRequestAction | LoadBookedDatesFailAction | LoadBookedDatesSuccessAction;
