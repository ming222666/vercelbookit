import { IBookingExtended } from '../../../../../controllers/interfaces';
import { ILES } from '../../../../../db/interfaces';

export interface MyBookingsState extends ILES {
  user: string;
  bookings: IBookingExtended[];
}
