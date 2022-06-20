import { BaseAction } from '../../BaseAction';
import { IErrorDto } from '../../../db/interfaces';

export enum ReviewAvailabilityActionType {
  REVIEW_AVAILABLILITY_REQUEST = 'reviewAvailability/REVIEW_AVAILABLILITY_REQUEST',
  REVIEW_AVAILABLILITY_FAIL = 'reviewAvailability/REVIEW_AVAILABLILITY_FAIL',
  REVIEW_AVAILABLILITY_RESET_FAIL = 'reviewAvailability/REVIEW_AVAILABLILITY_RESET_FAIL',
}

export interface ReviewAvailabilityRequestAction extends BaseAction {
  type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_REQUEST;
  payload: boolean;
}

export interface ReviewAvailabilityFailAction extends BaseAction {
  type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_FAIL;
  payload: IErrorDto;
}

export interface ReviewAvailabilityResetFailAction extends BaseAction {
  type: ReviewAvailabilityActionType.REVIEW_AVAILABLILITY_RESET_FAIL;
}

export type ReviewAvailabilityAction =
  | ReviewAvailabilityRequestAction
  | ReviewAvailabilityFailAction
  | ReviewAvailabilityResetFailAction;
