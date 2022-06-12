import nc from 'next-connect';

import { onError, onNoMatch } from '../../../utils/onError';
import { forgotPassword } from '../../../controllers/passwordControllers';

const handler = nc({ onError, onNoMatch });

handler.post(forgotPassword);

export default handler;
