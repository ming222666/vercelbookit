import nc from 'next-connect';

import { onError, onNoMatch } from '../../../../utils/onError';
import { isAuth } from '../../../../middlewares/auth';
import { stripeCheckoutSession } from '../../../../controllers/paymentControllers';

const handler = nc({ onError, onNoMatch });

handler.use(isAuth);

handler.get(stripeCheckoutSession);

export default handler;
