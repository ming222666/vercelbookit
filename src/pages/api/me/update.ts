import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { updateProfile } from '../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.put(updateProfile);

export default handler;
