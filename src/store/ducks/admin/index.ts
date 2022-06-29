import { combineReducers } from 'redux';

import rooms from './rooms';
import roomCreateUpdate from './roomCreateUpdate';
// ...

const reducer = combineReducers({
  rooms,
  roomCreateUpdate,
  // ...
});

export default reducer;
