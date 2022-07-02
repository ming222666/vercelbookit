import { combineReducers } from 'redux';

import rooms from './rooms';
import roomCreateUpdate from './roomCreateUpdate';
import roomDelete from './roomDelete';
import bookings from './bookings';
import bookingDelete from './bookingDelete';
import users from './users';
import userUpdate from './userUpdate';
import userDelete from './userDelete';
import userDetails from './userDetails';

const reducer = combineReducers({
  rooms,
  roomCreateUpdate,
  roomDelete,
  bookings,
  bookingDelete,
  users,
  userUpdate,
  userDelete,
  userDetails,
});

export default reducer;
