import { BaseAction } from '../../../BaseAction';
import { IErrorDto } from '../../../../db/interfaces';

/**
 * Review Delete
 */
export enum ReviewDeleteActionType {
  REVIEW_DELETE_REQUEST = 'reviewDelete/REVIEW_DELETE_REQUEST',
  REVIEW_DELETE_FAIL = 'reviewDelete/REVIEW_DELETE_FAIL',
  REVIEW_DELETE_SUCCESS = 'reviewDelete/REVIEW_DELETE_SUCCESS',
  REVIEW_DELETE_RESET_FAIL = 'reviewDelete/REVIEW_DELETE_RESET_FAIL',
  REVIEW_DELETE_RESET_SUCCESS = 'reviewDelete/REVIEW_DELETE_RESET_SUCCESS',
  REVIEW_DELETE_RESET = 'reviewDelete/REVIEW_DELETE_RESET',
}

export interface ReviewDeleteRequestAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_REQUEST;
}

export interface ReviewDeleteFailAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_FAIL;
  payload: IErrorDto;
}

export interface ReviewDeleteSuccessAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_SUCCESS;
}

export interface ReviewDeleteResetFailAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_RESET_FAIL;
}

export interface ReviewDeleteResetSuccessAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_RESET_SUCCESS;
}

export interface ReviewDeleteResetAction extends BaseAction {
  type: ReviewDeleteActionType.REVIEW_DELETE_RESET;
}

export type ReviewDeleteAction =
  | ReviewDeleteRequestAction
  | ReviewDeleteFailAction
  | ReviewDeleteSuccessAction
  | ReviewDeleteResetFailAction
  | ReviewDeleteResetSuccessAction
  | ReviewDeleteResetAction;
