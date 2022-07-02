import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../../utils/onError';
import { isAuth, isAdmin } from '../../../../../middlewares/auth';
import { updateUser, deleteUser, userDetails } from '../../../../../controllers/authControllers';

const handler = nc({ onError, onNoMatch });
handler.use(isAuth, isAdmin);

handler.put(updateUser);
handler.delete(deleteUser);
handler.get(userDetails);

export default handler;
