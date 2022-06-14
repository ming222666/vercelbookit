import { BookedDatesAction, BookedDatesActionType } from './types';
import { BookedDatesState } from './models/BookedDatesState';

const initialState: BookedDatesState = {
  roomId: '',
  dates: [],
  error: null,
  loading: false,
  success: null,
};

const bookedDatesReducer = (state: BookedDatesState = initialState, action: BookedDatesAction): BookedDatesState => {
  switch (action.type) {
    case BookedDatesActionType.LOAD_BOOKED_DATES_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case BookedDatesActionType.LOAD_BOOKED_DATES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case BookedDatesActionType.LOAD_BOOKED_DATES_SUCCESS:
      return {
        ...state,
        roomId: action.payload.roomId,
        dates: action.payload.dates,
        error: null,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default bookedDatesReducer;
