import { AdminRoomsAction, AdminRoomsActionType } from './types';
import { AdminRoomsState } from './models/AdminRoomsState';

const initialState: AdminRoomsState = {
  rooms: [],
  error: null,
  loading: false,
  success: null,
};

const adminRoomsReducer = (state: AdminRoomsState = initialState, action: AdminRoomsAction): AdminRoomsState => {
  switch (action.type) {
    case AdminRoomsActionType.ADMIN_ROOMS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case AdminRoomsActionType.ADMIN_ROOMS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case AdminRoomsActionType.ADMIN_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case AdminRoomsActionType.ADMIN_ROOMS_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case AdminRoomsActionType.ADMIN_ROOMS_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default adminRoomsReducer;
