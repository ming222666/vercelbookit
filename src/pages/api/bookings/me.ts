import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { myBookings } from '../../../controllers/bookingControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(myBookings);

export default handler;
