import { ExceptionErrorAction, ExceptionErrorActionType } from './types';

// Clear Errors
export const clearError = (): ExceptionErrorAction => ({ type: ExceptionErrorActionType.CLEAR_ERROR });
