import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { isAuth } from '../../../middlewares/auth';
import { createRoomReview } from '../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.put(createRoomReview);

export default handler;
