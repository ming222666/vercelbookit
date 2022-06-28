import { RoomUpdateAction, RoomUpdateActionType } from './types';
import { RoomUpdateState } from './models/RoomUpdateState';

const initialState: RoomUpdateState = {
  room: null,
  error: null,
  loading: false,
  success: null,
};

const roomUpdateReducer = (state: RoomUpdateState = initialState, action: RoomUpdateAction): RoomUpdateState => {
  switch (action.type) {
    case RoomUpdateActionType.ROOM_UPDATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomUpdateActionType.ROOM_UPDATE_FAIL:
      return {
        ...state,
        room: action.payload.room,
        error: action.payload.error,
        loading: false,
        success: null,
      };
    case RoomUpdateActionType.ROOM_UPDATE_SUCCESS:
      return {
        ...state,
        room: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case RoomUpdateActionType.ROOM_UPDATE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case RoomUpdateActionType.ROOM_UPDATE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default roomUpdateReducer;
