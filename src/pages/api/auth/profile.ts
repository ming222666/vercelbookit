import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { getUserProfile } from '../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(getUserProfile);

export default handler;
