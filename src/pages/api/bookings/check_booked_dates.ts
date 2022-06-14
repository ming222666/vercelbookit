import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { checkBookedDatesOfRoom } from '../../../controllers/bookingControllers';

const handler = nc({ onError, onNoMatch });

handler.get(checkBookedDatesOfRoom);

export default handler;
