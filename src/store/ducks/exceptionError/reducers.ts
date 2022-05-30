import { ExceptionErrorAction, ExceptionErrorActionType } from './types';

const exceptionErrorReducer = (state = '', action: ExceptionErrorAction): string => {
  switch (action.type) {
    case ExceptionErrorActionType.SET_ERROR:
      return action.payload;
    case ExceptionErrorActionType.CLEAR_ERROR:
      return '';
    default:
      return state;
  }
};

export default exceptionErrorReducer;
