import nc from 'next-connect';

import { onError, onNoMatch } from '../../../db/onError';
import { allRooms, newRoom } from '../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });

handler.get(allRooms);
handler.post(newRoom);

export default handler;
