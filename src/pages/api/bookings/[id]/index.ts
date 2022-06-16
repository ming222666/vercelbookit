import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { isAuth } from '../../../../middlewares/auth';
import { getBookingDetails } from '../../../../controllers/bookingControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(getBookingDetails);

export default handler;
