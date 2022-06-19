import { BaseAction } from '../../BaseAction';
import { IErrorDto } from '../../../db/interfaces';

export enum NewReviewActionType {
  NEW_REVIEW_REQUEST = 'reviewNew/NEW_REVIEW_REQUEST',
  NEW_REVIEW_FAIL = 'reviewNew/NEW_REVIEW_FAIL',
  NEW_REVIEW_SUCCESS = 'reviewNew/NEW_REVIEW_SUCCESS',
  NEW_REVIEW_RESET_SUCCESS = 'reviewNew/NEW_REVIEW_RESET_SUCCESS',
  NEW_REVIEW_RESET_FAIL = 'reviewNew/NEW_REVIEW_RESET_FAIL',
}

export interface NewReviewRequestAction extends BaseAction {
  type: NewReviewActionType.NEW_REVIEW_REQUEST;
}

export interface NewReviewSuccessAction extends BaseAction {
  type: NewReviewActionType.NEW_REVIEW_SUCCESS;
}

export interface NewReviewFailAction extends BaseAction {
  type: NewReviewActionType.NEW_REVIEW_FAIL;
  payload: IErrorDto;
}

export interface NewReviewResetSuccessAction extends BaseAction {
  type: NewReviewActionType.NEW_REVIEW_RESET_SUCCESS;
}

export interface NewReviewResetFailAction extends BaseAction {
  type: NewReviewActionType.NEW_REVIEW_RESET_FAIL;
}

export type NewReviewAction =
  | NewReviewRequestAction
  | NewReviewSuccessAction
  | NewReviewFailAction
  | NewReviewResetSuccessAction
  | NewReviewResetFailAction;
