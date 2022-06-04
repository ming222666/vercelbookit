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
    case AuthActionType.AUTH_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
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
    default:
      return state;
  }
};

export default authReducer;
