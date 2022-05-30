import { BaseAction } from '../../BaseAction';

export enum ExceptionErrorActionType {
  SET_ERROR = 'exceptionError/SET_ERROR',
  CLEAR_ERROR = 'exceptionError/CLEAR_ERROR',
}

export interface ExceptionErrorSetErrorAction extends BaseAction {
  type: ExceptionErrorActionType.SET_ERROR;
  payload: string;
}

export interface ExceptionErrorClearErrorAction extends BaseAction {
  type: ExceptionErrorActionType.CLEAR_ERROR;
}

export type ExceptionErrorAction = ExceptionErrorSetErrorAction | ExceptionErrorClearErrorAction;
