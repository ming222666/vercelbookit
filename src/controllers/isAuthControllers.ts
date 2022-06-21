import type { NextApiRequest, NextApiResponse } from 'next';

// Get session user _id => /api/isAuth
export const getSessionUserId = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (req as any).user._id;
  res.status(200).send(userId);
};
