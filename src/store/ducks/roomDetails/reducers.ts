import { RoomDetailsAction, RoomDetailsActionType } from './types';
import { RoomDetailsState } from './models/RoomDetailsState';

const initialRoomDetailsState: RoomDetailsState = {
  room: null,
  error: null,
  loading: false,
  success: null,
};

const roomDetailsReducer = (
  state: RoomDetailsState = initialRoomDetailsState,
  action: RoomDetailsAction,
): RoomDetailsState => {
  switch (action.type) {
    case RoomDetailsActionType.ROOM_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomDetailsActionType.ROOM_DETAILS_SUCCESS:
      return {
        ...state,
        room: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case RoomDetailsActionType.ROOM_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    default:
      return state;
  }
};

export default roomDetailsReducer;
