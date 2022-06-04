import type { /* NextApiRequest */ NextApiResponse } from 'next';

import { v2 as cloudinary } from 'cloudinary';

import db from '../db/db';
import { IUserDto, IErrorDto } from '../db/interfaces';
import User from '../db/models/User';
// import APIFeatures from '../utils/apiFeatures';
import IWithBodyNextApiRequest from './interfaces/IWithBodyNextApiRequest';
import IRegisterUserRequest from './interfaces/IRegisterUserRequest';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UserNextApiRequest = IWithBodyNextApiRequest<IRegisterUserRequest>;

// Register user => /api/auth/register
const registerUser = async (req: UserNextApiRequest, res: NextApiResponse<IUserDto | IErrorDto>): Promise<void> => {
  if (!req.body.avatar) {
    res.status(400).json({ errormsg: 'Avatar is required', status: 404 });
    return;
  }

  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });

  await db.connect();

  const { name, email, password } = req.body;

  const user: IUserDto = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  await db.disconnect();
  res.status(201).send({
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

export { registerUser };
