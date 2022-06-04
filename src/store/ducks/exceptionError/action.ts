import { ExceptionErrorAction, ExceptionErrorActionType } from './types';

// Clear Errors
export const clearExceptionError = (): ExceptionErrorAction => ({ type: ExceptionErrorActionType.CLEAR_ERROR });
