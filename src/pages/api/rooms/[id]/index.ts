import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../db/onError';
import { getSingleRoom, updateRoom } from '../../../../controllers/roomControllers';

const handler = nc({ onError, onNoMatch });

handler.get(getSingleRoom);
handler.put(updateRoom);

export default handler;
