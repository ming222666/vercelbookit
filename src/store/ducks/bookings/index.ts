import { combineReducers } from 'redux';

import bookedDates from './bookedDates';

const reducer = combineReducers({
  bookedDates,
});

export default reducer;
