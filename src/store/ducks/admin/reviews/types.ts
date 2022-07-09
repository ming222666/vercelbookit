import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';
import { ReviewInfo } from './models/ReviewInfo';

export enum ReviewsActionType {
  REVIEWS_REQUEST = 'reviews/REVIEWS_REQUEST',
  REVIEWS_FAIL = 'reviews/REVIEWS_FAIL',
  REVIEWS_SUCCESS = 'reviews/REVIEWS_SUCCESS',

  REVIEWS_RESET_FAIL = 'reviews/REVIEWS_RESET_FAIL',
  REVIEWS_RESET_SUCCESS = 'reviews/REVIEWS_RESET_SUCCESS',
}

export interface ReviewsRequestAction extends BaseAction {
  type: ReviewsActionType.REVIEWS_REQUEST;
}

export interface ReviewsFailAction extends BaseAction {
  type: ReviewsActionType.REVIEWS_FAIL;
  payload: IErrorDto;
}

export interface ReviewsSuccessAction extends BaseAction {
  type: ReviewsActionType.REVIEWS_SUCCESS;
  payload: { reviews: ReviewInfo[]; roomId: string };
}

export interface ReviewsResetFailAction extends BaseAction {
  type: ReviewsActionType.REVIEWS_RESET_FAIL;
}

export interface ReviewsResetSuccessAction extends BaseAction {
  type: ReviewsActionType.REVIEWS_RESET_SUCCESS;
}

export type ReviewsAction =
  | ReviewsRequestAction
  | ReviewsFailAction
  | ReviewsSuccessAction
  | ReviewsResetFailAction
  | ReviewsResetSuccessAction;
