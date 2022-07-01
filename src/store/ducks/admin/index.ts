import { combineReducers } from 'redux';

import rooms from './rooms';
import roomCreateUpdate from './roomCreateUpdate';
import roomDelete from './roomDelete';
import bookings from './bookings';
// import bookingDelete from './bookingDelete';

const reducer = combineReducers({
  rooms,
  roomCreateUpdate,
  roomDelete,
  bookings,
  // bookingDelete,
});

export default reducer;
