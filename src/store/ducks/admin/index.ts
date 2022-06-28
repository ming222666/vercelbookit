import { combineReducers } from 'redux';

import rooms from './rooms';
import roomUpdate from './roomUpdate';
// ...

const reducer = combineReducers({
  rooms,
  roomUpdate,
  // ...
});

export default reducer;
