import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../../middlewares/auth';
import { updateRoom, deleteRoom } from '../../../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
