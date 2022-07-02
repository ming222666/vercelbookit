import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../middlewares/auth';
import { allAdminUsers } from '../../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.get(allAdminUsers);

export default handler;
