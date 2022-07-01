import { RoomDeleteAction, RoomDeleteActionType } from './types';
import { RoomDeleteState } from './models/RoomDeleteState';

const initialState: RoomDeleteState = {
  error: null,
  loading: false,
  success: null,
};

const roomDeleteReducer = (state: RoomDeleteState = initialState, action: RoomDeleteAction): RoomDeleteState => {
  switch (action.type) {
    case RoomDeleteActionType.ROOM_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomDeleteActionType.ROOM_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case RoomDeleteActionType.ROOM_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case RoomDeleteActionType.ROOM_DELETE_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case RoomDeleteActionType.ROOM_DELETE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case RoomDeleteActionType.ROOM_DELETE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default roomDeleteReducer;
