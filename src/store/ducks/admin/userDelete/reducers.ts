import { UserDeleteAction, UserDeleteActionType } from './types';
import { UserDeleteState } from './models/UserDeleteState';

const initialState: UserDeleteState = {
  error: null,
  loading: false,
  success: null,
};

const userDeleteReducer = (state: UserDeleteState = initialState, action: UserDeleteAction): UserDeleteState => {
  switch (action.type) {
    case UserDeleteActionType.USER_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case UserDeleteActionType.USER_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case UserDeleteActionType.USER_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case UserDeleteActionType.USER_DELETE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case UserDeleteActionType.USER_DELETE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case UserDeleteActionType.USER_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default userDeleteReducer;
