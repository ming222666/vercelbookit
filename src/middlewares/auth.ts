import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuth = async (req: NextApiRequest, res: NextApiResponse, next: any): Promise<void> => {
  const session = await getSession({ req });

  const status = 401;
  if (session) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = session.user;
    next();
  } else {
    res.status(status).send({ errormsg: 'Session not found', status });
  }
};
