import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../db/db';
import User from '../db/models/User';

// Get session user _id => /api/isAuth
export const getSessionUserId = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await db.connect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _id = (req as any).user._id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await User.findById(_id);

  const updatedAt = user.updatedAt;

  await db.disconnect();

  res.status(200).send({ _id, updatedAt });
};
