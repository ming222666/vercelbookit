import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { checkRoomBookingAvailability } from '../../../controllers/bookingControllers';

const handler = nc({ onError, onNoMatch });

handler.get(checkRoomBookingAvailability);

export default handler;
