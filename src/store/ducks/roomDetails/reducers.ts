import { RoomDetailsAction, RoomDetailsActionType } from './types';
import { RoomDetailsState } from './models/RoomDetailsState';

const initialState: RoomDetailsState = {
  room: null,
  error: null,
  loading: false,
  success: null,
};

const roomDetailsReducer = (state: RoomDetailsState = initialState, action: RoomDetailsAction): RoomDetailsState => {
  switch (action.type) {
    case RoomDetailsActionType.ROOM_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomDetailsActionType.ROOM_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
    case RoomDetailsActionType.ROOM_DETAILS_RESET_FAIL:
      return {
        ...state,
        error: null,
      };
    case RoomDetailsActionType.ROOM_DETAILS_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};

export default roomDetailsReducer;
