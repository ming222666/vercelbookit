import { UserUpdateAction, UserUpdateActionType } from './types';
import { UserUpdateState } from './models/UserUpdateState';

const initialState: UserUpdateState = {
  user: null,
  error: null,
  loading: false,
  success: null,
};

const userUpdateReducer = (state: UserUpdateState = initialState, action: UserUpdateAction): UserUpdateState => {
  switch (action.type) {
    case UserUpdateActionType.USER_UPDATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case UserUpdateActionType.USER_UPDATE_FAIL:
      return {
        ...state,
        user: action.payload.user,
        error: action.payload.error,
        loading: false,
        success: null,
      };
    case UserUpdateActionType.USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case UserUpdateActionType.USER_UPDATE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case UserUpdateActionType.USER_UPDATE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case UserUpdateActionType.USER_UPDATE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default userUpdateReducer;
