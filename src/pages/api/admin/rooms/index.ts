import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../middlewares/auth';
import { allAdminRooms, newRoom } from '../../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.get(allAdminRooms);
handler.post(newRoom);

export default handler;
