import { RoomCreateAction, RoomCreateActionType } from './types';
import { RoomUpdateAction, RoomUpdateActionType } from './types';
import { RoomCreateUpdateState } from './models/RoomCreateUpdateState';

const initialState: RoomCreateUpdateState = {
  room: null,
  error: null,
  loading: false,
  success: null,
};

const roomCreateUpdateReducer = (
  state: RoomCreateUpdateState = initialState,
  action: RoomCreateAction | RoomUpdateAction,
): RoomCreateUpdateState => {
  switch (action.type) {
    case RoomCreateActionType.ROOM_CREATE_REQUEST:
    case RoomUpdateActionType.ROOM_UPDATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomCreateActionType.ROOM_CREATE_FAIL:
    case RoomUpdateActionType.ROOM_UPDATE_FAIL:
      return {
        ...state,
        room: action.payload.room,
        error: action.payload.error,
        loading: false,
        success: null,
      };
    case RoomCreateActionType.ROOM_CREATE_SUCCESS:
    case RoomUpdateActionType.ROOM_UPDATE_SUCCESS:
      return {
        ...state,
        room: action.payload,
        error: null,
        loading: false,
        success: true,
      };
    case RoomCreateActionType.ROOM_CREATE_RESET_FAIL:
    case RoomUpdateActionType.ROOM_UPDATE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case RoomCreateActionType.ROOM_CREATE_RESET_SUCCESS:
    case RoomUpdateActionType.ROOM_UPDATE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default roomCreateUpdateReducer;
