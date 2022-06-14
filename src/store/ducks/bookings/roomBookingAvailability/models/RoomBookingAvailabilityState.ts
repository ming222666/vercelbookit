import { IErrorDto } from '../../../../../db/interfaces';

export type RoomBookingAvailabilityState = {
  roomId: string;
  isAvailable: boolean | null;
  loading: boolean;
  error: IErrorDto | null;
  success: true | null;
};
