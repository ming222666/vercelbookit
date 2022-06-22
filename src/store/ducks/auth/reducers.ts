import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';

const initialState: AuthState = {
  user: null,
  error: null,
  /**
   * Set initialState.loading to true, so that
   * [Login] button is not rendered on Header opening,
   * thus preventing momentary flickering of [Login].
   */
  loading: true,
  success: null,
  userUpdate: { error: null, loading: false, success: null },
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
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
    case AuthActionType.RESET_USER:
      return { ...initialState, loading: false };

    case AuthActionType.UPDATE_USER_REQUEST:
      return {
        ...state,
        userUpdate: {
          ...state.userUpdate,
          error: null,
          loading: true,
          success: null,
        },
      };
    case AuthActionType.UPDATE_USER_FAIL:
      return {
        ...state,
        userUpdate: {
          ...state.userUpdate,
          error: action.payload,
          loading: false,
          success: null,
        },
      };
    case AuthActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userUpdate: {
          ...state.userUpdate,
          error: null,
          loading: false,
          success: true,
        },
      };
    case AuthActionType.UPDATE_USER_RESET_FAIL:
      return {
        ...state,
        userUpdate: {
          ...state.userUpdate,
          error: null,
          loading: false,
          success: null,
        },
      };
    case AuthActionType.UPDATE_USER_RESET_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userUpdate: {
          ...state.userUpdate,
          error: null,
          loading: false,
          success: null,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
