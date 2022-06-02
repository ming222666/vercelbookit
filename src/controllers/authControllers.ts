import type { /* NextApiRequest */ NextApiResponse } from 'next';

import db from '../db/db';
import { IUserDto /* , IErrormsgStatusDto */ } from '../db/interfaces';
import User from '../db/models/User';
// import APIFeatures from '../utils/apiFeatures';
import IWithBodyNextApiRequest from './interfaces';

type UserNextApiRequest = IWithBodyNextApiRequest<IUserDto>;

// Register user => /api/auth/register
const registerUser = async (req: UserNextApiRequest, res: NextApiResponse<IUserDto>): Promise<void> => {
  await db.connect();

  const { name, email, password } = req.body;

  const user: IUserDto = await User.create({
    name,
    email,
    password,
    avator: {
      public_id: 'PUBLIC_ID',
      url: 'URL',
    },
  });

  await db.disconnect();
  res.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    avator: user.avator,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    resetPasswordToken: user.resetPasswordToken,
    resetPasswordExpire: user.resetPasswordExpire,
  });
};

export { registerUser };
