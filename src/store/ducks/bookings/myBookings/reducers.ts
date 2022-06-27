import { MyBookingsAction, MyBookingsActionType } from './types';
import { MyBookingsState } from './models/MyBookingsState';

const initialState: MyBookingsState = {
  user: '',
  bookings: [],
  error: null,
  loading: false,
  success: null,
};

const myBookingsReducer = (state: MyBookingsState = initialState, action: MyBookingsAction): MyBookingsState => {
  switch (action.type) {
    case MyBookingsActionType.LOAD_MY_BOOKINGS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case MyBookingsActionType.LOAD_MY_BOOKINGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case MyBookingsActionType.LOAD_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        bookings: action.payload.bookings,
        error: null,
        loading: false,
        success: true,
      };
    case MyBookingsActionType.RESET_MY_BOOKINGS_FAIL:
      return {
        ...state,
        error: null,
        loading: false,
        success: null,
      };
    case MyBookingsActionType.RESET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: null,
      };
    default:
      return state;
  }
};

export default myBookingsReducer;
