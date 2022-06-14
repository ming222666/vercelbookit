import { RoomBookingAvailabilityAction, RoomBookingAvailabilityActionType } from './types';
import { RoomBookingAvailabilityState } from './models/RoomBookingAvailabilityState';

const initialState: RoomBookingAvailabilityState = {
  roomId: '',
  isAvailable: null,
  error: null,
  loading: false,
  success: null,
};

const roomBookingAvailabilityReducer = (
  state: RoomBookingAvailabilityState = initialState,
  action: RoomBookingAvailabilityAction,
): RoomBookingAvailabilityState => {
  switch (action.type) {
    case RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: null,
      };
    case RoomBookingAvailabilityActionType.LOAD_ROOM_BOOKING_AVAILABLILITY_SUCCESS:
      return {
        ...state,
        roomId: action.payload.roomId,
        isAvailable: action.payload.isAvailable,
        error: null,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default roomBookingAvailabilityReducer;
