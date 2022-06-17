import nc from 'next-connect';

import { onError, onNoMatch } from '../../utils/onError';
import { webhookCheckout } from '../../controllers/paymentControllers';

const handler = nc({ onError, onNoMatch });

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
