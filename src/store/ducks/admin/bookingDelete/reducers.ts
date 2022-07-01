import { BookingDeleteAction, BookingDeleteActionType } from './types';
import { BookingDeleteState } from './models/BookingDeleteState';

const initialState: BookingDeleteState = {
  error: null,
  loading: false,
  success: null,
};

const bookingDeleteReducer = (
  state: BookingDeleteState = initialState,
  action: BookingDeleteAction,
): BookingDeleteState => {
  switch (action.type) {
    case BookingDeleteActionType.BOOKING_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case BookingDeleteActionType.BOOKING_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case BookingDeleteActionType.BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case BookingDeleteActionType.BOOKING_DELETE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case BookingDeleteActionType.BOOKING_DELETE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case BookingDeleteActionType.BOOKING_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default bookingDeleteReducer;
