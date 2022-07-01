import { combineReducers } from 'redux';

import rooms from './rooms';
import roomCreateUpdate from './roomCreateUpdate';
import roomDelete from './roomDelete';

const reducer = combineReducers({
  rooms,
  roomCreateUpdate,
  roomDelete,
});

export default reducer;
