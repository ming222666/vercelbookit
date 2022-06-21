import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { getSessionUserId } from '../../../controllers/isAuthControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(getSessionUserId);

export default handler;
