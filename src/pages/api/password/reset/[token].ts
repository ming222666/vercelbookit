import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { resetPassword } from '../../../../controllers/passwordControllers';

const handler = nc({ onError, onNoMatch });

handler.put(resetPassword);

export default handler;
