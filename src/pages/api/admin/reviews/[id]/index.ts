import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../../middlewares/auth';
import { deleteReview } from '../../../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.delete(deleteReview);

export default handler;
