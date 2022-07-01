import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../../middlewares/auth';
import { deleteBooking } from '../../../../../controllers/bookingControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.delete(deleteBooking);

export default handler;
