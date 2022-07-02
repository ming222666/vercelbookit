import { AdminUsersAction, AdminUsersActionType } from './types';
import { AdminUsersState } from './models/AdminUsersState';

const initialState: AdminUsersState = {
  users: [],
  error: null,
  loading: false,
  success: null,
};

const adminUsersReducer = (state: AdminUsersState = initialState, action: AdminUsersAction): AdminUsersState => {
  switch (action.type) {
    case AdminUsersActionType.ADMIN_USERS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case AdminUsersActionType.ADMIN_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case AdminUsersActionType.ADMIN_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case AdminUsersActionType.ADMIN_USERS_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case AdminUsersActionType.ADMIN_USERS_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default adminUsersReducer;
