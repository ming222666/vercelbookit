import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';

const initialAuthState: AuthState = {
  user: null,
  error: null,
  loading: false,
  success: null,
};

const authReducer = (state: AuthState = initialAuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case AuthActionType.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case AuthActionType.REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case AuthActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
