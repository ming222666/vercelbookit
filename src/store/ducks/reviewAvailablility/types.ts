import { BaseAction } from '../../BaseAction';
import { IErrorDto } from '../../../db/interfaces';

export enum ReviewAvailablilityActionType {
  REVIEW_AVAILABLILITY_REQUEST = 'reviewAvailablility/REVIEW_AVAILABLILITY_REQUEST',
  REVIEW_AVAILABLILITY_FAIL = 'reviewNew/REVIEW_AVAILABLILITY_FAIL',
}

export interface ReviewAvailablilityRequestAction extends BaseAction {
  type: ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_REQUEST;
  payload: boolean;
}

export interface ReviewAvailablilityFailAction extends BaseAction {
  type: ReviewAvailablilityActionType.REVIEW_AVAILABLILITY_FAIL;
  payload: IErrorDto;
}

export type ReviewAvailablilityAction = ReviewAvailablilityRequestAction | ReviewAvailablilityFailAction;
