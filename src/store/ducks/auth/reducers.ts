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
    case AuthActionType.LOAD_USER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case AuthActionType.LOAD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case AuthActionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default authReducer;
