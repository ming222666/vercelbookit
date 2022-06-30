import { AuthAction, AuthActionType } from './types';
import { AuthState } from './models/AuthState';

const initialState: AuthState = {
  /**
   * user here refers to logined user. It is here so Header can
   * pick up stuff e.g. user name and to display, such as "Greeting! John".
   * user is refreshed if logined user successfully updates
   * his/her profile at My Profile page, so that Header will update
   * greetings accordingly.
   */
  user: null,
  error: null,
  /**
   * Set initialState.loading to true, so that
   * ssr does not render [Login] button at Header.
   * O/w, there will be flickering between logined username (rendered client-side)
   * and [Login] button, when going to a different page that is ssr.
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
