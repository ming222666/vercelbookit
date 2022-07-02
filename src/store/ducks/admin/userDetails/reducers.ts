import { UserDetailsAction, UserDetailsActionType } from './types';
import { UserDetailsState } from './models/UserDetailsState';

const initialState: UserDetailsState = {
  user: null,
  error: null,
  loading: false,
  success: null,
};

const userDetailsReducer = (state: UserDetailsState = initialState, action: UserDetailsAction): UserDetailsState => {
  switch (action.type) {
    case UserDetailsActionType.USER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case UserDetailsActionType.USER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case UserDetailsActionType.USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case UserDetailsActionType.USER_DETAILS_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case UserDetailsActionType.USER_DETAILS_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
