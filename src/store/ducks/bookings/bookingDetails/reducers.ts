import { BookingDetailsAction, BookingDetailsActionType } from './types';
import { BookingDetailsState } from './models/BookingDetailsState';

const initialState: BookingDetailsState = {
  booking: null,
  error: null,
  loading: false,
  success: null,
};

const bookingDetailsReducer = (
  state: BookingDetailsState = initialState,
  action: BookingDetailsAction,
): BookingDetailsState => {
  switch (action.type) {
    case BookingDetailsActionType.LOAD_BOOKING_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case BookingDetailsActionType.LOAD_BOOKING_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case BookingDetailsActionType.LOAD_BOOKING_DETAILS_SUCCESS:
      return {
        ...state,
        booking: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default bookingDetailsReducer;
