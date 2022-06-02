import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { registerUser } from '../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });

handler.post(registerUser);

export default handler;
