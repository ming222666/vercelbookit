import { PasswordAction, PasswordActionType } from './types';
import { PasswordState } from './models/PasswordState';

const initialPasswordState: PasswordState = {
  error: null,
  loading: false,
  success: null,
  actionType: 'FORGOT_PASSWORD|RESET_PASSWORD',
};

const passwordReducer = (state: PasswordState = initialPasswordState, action: PasswordAction): PasswordState => {
  switch (action.type) {
    case PasswordActionType.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
        actionType: 'FORGOT_PASSWORD',
      };
    case PasswordActionType.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
        actionType: 'RESET_PASSWORD',
      };
    case PasswordActionType.FORGOT_PASSWORD_SUCCESS:
    case PasswordActionType.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case PasswordActionType.FORGOT_PASSWORD_FAIL:
    case PasswordActionType.RESET_PASSWORD_FAIL:
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

export default passwordReducer;
