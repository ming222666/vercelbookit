import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../middlewares/auth';
import { allAdminRooms } from '../../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.get(allAdminRooms);

export default handler;
