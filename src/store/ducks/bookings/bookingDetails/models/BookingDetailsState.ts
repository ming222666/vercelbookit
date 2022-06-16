import { IBookingExtended } from '../../../../../controllers/interfaces';
import { ILES } from '../../../../../db/interfaces';

export interface BookingDetailsState extends ILES {
  booking: IBookingExtended | null;
}
