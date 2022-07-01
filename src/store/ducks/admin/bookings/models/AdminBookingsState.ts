import { IBookingExtended } from '../../../../../controllers/interfaces';
import { ILES } from '../../../../../db/interfaces';

export interface AdminBookingsState extends ILES {
  bookings: IBookingExtended[];
}
