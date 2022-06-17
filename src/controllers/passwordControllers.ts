import type { NextApiResponse } from 'next';

import absoluteUrl from 'next-absolute-url';
import crypto from 'crypto';

import db from '../db/db';
import { IErrorDto } from '../db/interfaces';
import User from '../db/models/User';
import { IWithBodyNextApiRequest } from './interfaces';
import sendEmail from '../utils/sendEmail';

type ForgotPasswordNextApiRequest = IWithBodyNextApiRequest<{ email: string }>;
type ResetPasswordNextApiRequest = IWithBodyNextApiRequest<{
  token: string;
  newPassword: string;
  confirmPassword: string;
}>;

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

    const err: IErrorDto = {
      errormsg: (error as Error).message,
      status: 500,
    };
    res.status(500).send(err);
  }
};

// Reset password   =>   /api/password/reset/:token
const resetPassword = async (
  req: ResetPasswordNextApiRequest,
  res: NextApiResponse<{ status: number } | IErrorDto>,
): Promise<void> => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token as string)
    .digest('hex');

  await db.connect();
  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    await db.disconnect();
    res.status(400).json({
      errormsg: 'Password reset token is invalid or has been expired',
      status: 400,
    });
    return;
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    await db.disconnect();
    res.status(400).json({
      errormsg: 'Passwords do not match',
      status: 400,
    });
    return;
  }

  // Setup the new password
  user.password = req.body.newPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  await db.disconnect();

  res.status(200).send({
    status: 200,
  });
};

export { forgotPassword, resetPassword };
