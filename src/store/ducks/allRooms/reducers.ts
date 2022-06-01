import { AllRoomsAction, AllRoomsActionType } from './types';
import { AllRoomsState } from './models/AllRoomsState';

const initialAllRoomsState: AllRoomsState = {
  roomsCount: 0,
  resPerPage: 1,
  filteredRoomsCount: 0,
  rooms: [],
  error: null,
};

const allRoomsReducer = (state: AllRoomsState = initialAllRoomsState, action: AllRoomsAction): AllRoomsState => {
  switch (action.type) {
    case AllRoomsActionType.ALL_ROOMS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case AllRoomsActionType.ALL_ROOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AllRoomsActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default allRoomsReducer;
