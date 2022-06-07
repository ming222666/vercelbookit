import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { currentUserProfile } from '../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(currentUserProfile);

export default handler;
