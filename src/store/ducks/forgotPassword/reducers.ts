import { ForgotPasswordAction, ForgotPasswordActionType } from './types';
import { ForgotPasswordState } from './models/ForgotPasswordState';

const initialForgotPasswordState: ForgotPasswordState = {
  error: null,
  loading: false,
  success: null,
};

const forgotPasswordReducer = (
  state: ForgotPasswordState = initialForgotPasswordState,
  action: ForgotPasswordAction,
): ForgotPasswordState => {
  switch (action.type) {
    case ForgotPasswordActionType.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case ForgotPasswordActionType.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case ForgotPasswordActionType.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
