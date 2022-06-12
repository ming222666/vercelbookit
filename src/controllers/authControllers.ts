import type { NextApiRequest, NextApiResponse } from 'next';

import { v2 as cloudinary } from 'cloudinary';
import { HydratedDocument } from 'mongoose';
import absoluteUrl from 'next-absolute-url';

import db from '../db/db';
import { IUserDto, IErrorDto } from '../db/interfaces';
import User from '../db/models/User';
import IWithBodyNextApiRequest from './interfaces/IWithBodyNextApiRequest';
import IUserFormData from './interfaces/IUserFormData';
import sendEmail from '../utils/sendEmail';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UserNextApiRequest = IWithBodyNextApiRequest<IUserFormData>;
type ForgotPasswordNextApiRequest = IWithBodyNextApiRequest<{ email: string }>;

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
    resetPasswordToken: user.resetPasswordToken,
    resetPasswordExpire: user.resetPasswordExpire,
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

  if (req.body.password) user.password = req.body.password;

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
    resetPasswordToken: user.resetPasswordToken,
    resetPasswordExpire: user.resetPasswordExpire,
  });
};

// Forgot password   =>   /api/password/forgot
const forgotPassword = async (
  req: ForgotPasswordNextApiRequest,
  res: NextApiResponse<{ status: number } | IErrorDto>,
): Promise<void> => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    await db.disconnect();
    res.status(404).json({
      errormsg: 'User not found with this email',
      status: 404,
    });
    return;
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  await db.disconnect();

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'BookIT Password Recovery',
      message,
    });

    res.status(200).send({
      status: 200,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    await db.disconnect();

    // const err: IErrorDto = {
    //   errormsg: 'xxxxInternal Server Error',
    //   status: 500,
    //   internalServerErrorText: (error as Error).message,
    //   exceptionErrorText: '',
    // };
    const err: IErrorDto = {
      errormsg: (error as Error).message,
      status: 500,
    };
    res.status(500).send(err);
  }
};

export { registerUser, currentUserProfile, updateProfile, forgotPassword };
