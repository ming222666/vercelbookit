import { AdminBookingsAction, AdminBookingsActionType } from './types';
import { AdminBookingsState } from './models/AdminBookingsState';

const initialState: AdminBookingsState = {
  bookings: [],
  error: null,
  loading: false,
  success: null,
};

const adminBookingsReducer = (
  state: AdminBookingsState = initialState,
  action: AdminBookingsAction,
): AdminBookingsState => {
  switch (action.type) {
    case AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case AdminBookingsActionType.LOAD_ADMIN_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        error: null,
        loading: false,
        success: true,
      };
    case AdminBookingsActionType.RESET_ADMIN_BOOKINGS_FAIL:
      return {
        ...state,
        error: null,
      };
    case AdminBookingsActionType.RESET_ADMIN_BOOKINGS_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default adminBookingsReducer;
