import type { NextApiRequest, NextApiResponse } from 'next';

import { v2 as cloudinary } from 'cloudinary';
import { HydratedDocument } from 'mongoose';

import db from '../db/db';
import { IUserDto, IErrorDto } from '../db/interfaces';
import User from '../db/models/User';
import { IWithBodyNextApiRequest } from './interfaces';
import { IUserFormData } from './interfaces';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UserNextApiRequest = IWithBodyNextApiRequest<IUserFormData>;

// Register user => /api/auth/register
const registerUser = async (
  req: UserNextApiRequest,
  res: NextApiResponse<{ status: number } | IErrorDto>,
): Promise<void> => {
  if (!req.body.avatar) {
    res.status(400).json({ errormsg: 'Avatar is required', status: 400 });
    return;
  }

  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });

  await db.connect();

  const { name, email, password } = req.body;

  await User.create({
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
    status: 201,
  });
};

// Get current user profile => /api/auth/profile
const currentUserProfile = async (req: NextApiRequest, res: NextApiResponse<IUserDto | IErrorDto>): Promise<void> => {
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
  });
};

// Update current user profile => /api/me/update
const updateProfile = async (req: UserNextApiRequest, res: NextApiResponse<IUserDto | IErrorDto>): Promise<void> => {
  await db.connect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await User.findById<HydratedDocument<IUserDto>>((req as any).user._id);
  if (!user) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'User not found with this ID',
      status: 404,
    });
    return;
  }

  user.name = req.body.name;
  user.email = req.body.email;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (req.body.password) (user as any).password = req.body.password;

  // Update avatar
  if (req.body.avatar !== '') {
    const image_id = user.avatar.public_id;

    // Delete user previous image/avatar
    await cloudinary.uploader.destroy(image_id);

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // keep up updatedAt
  user.updatedAt = Date.now();

  await user.save();

  await db.disconnect();
  res.status(200).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

export { registerUser, currentUserProfile, updateProfile };
