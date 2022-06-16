import { combineReducers } from 'redux';

import bookedDates from './bookedDates';
import roomBookingAvailability from './roomBookingAvailability';
import myBookings from './myBookings';
import bookingDetails from './bookingDetails';

const reducer = combineReducers({
  bookedDates,
  roomBookingAvailability,
  myBookings,
  bookingDetails,
});

export default reducer;
