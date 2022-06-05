import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../db/db';
import { IUserDto, IErrorDto } from '../db/interfaces';
import User from '../db/models/User';

// Get current user profile => /api/user/profile
const getUserProfile = async (req: NextApiRequest, res: NextApiResponse<IUserDto | IErrorDto>): Promise<void> => {
  await db.connect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: IUserDto = await User.findById((req as any).user._id).lean();
  if (!user) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'User not found with this ID',
      status: 404,
    });
    return;
  }
  await db.disconnect();
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    resetPasswordToken: user.resetPasswordToken,
    resetPasswordExpire: user.resetPasswordExpire,
  });
};

export { getUserProfile };
