import { combineReducers } from 'redux';

import bookedDates from './bookedDates';
import roomBookingAvailability from './roomBookingAvailability';

const reducer = combineReducers({
  bookedDates,
  roomBookingAvailability,
});

export default reducer;
