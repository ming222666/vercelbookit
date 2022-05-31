import { RoomDetailsAction, RoomDetailsActionType } from './types';
import { RoomDetailsState } from './models/RoomDetailsState';

const initialRoomDetailsState: RoomDetailsState = {
  room: null,
  error: null,
};

const roomDetailsReducer = (
  state: RoomDetailsState = initialRoomDetailsState,
  action: RoomDetailsAction,
): RoomDetailsState => {
  switch (action.type) {
    case RoomDetailsActionType.ROOM_DETAILS_SUCCESS:
      return {
        ...state,
        room: action.payload,
        error: null,
      };
    case RoomDetailsActionType.ROOM_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RoomDetailsActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default roomDetailsReducer;
