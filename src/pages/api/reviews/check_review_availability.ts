import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { checkReviewAvailability } from '../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(checkReviewAvailability);

export default handler;
