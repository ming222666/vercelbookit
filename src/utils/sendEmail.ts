import nodemailer from 'nodemailer';

const sendEmail = async (options: { email: string; subject: string; message: string }): Promise<void> => {
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    service: 'gmail',
    secure: false, // use SSL
    // port: parseInt(process.env.SMTP_PORT as string),
    port: 25,
    auth: {
      // user: process.env.SMTP_USER,
      user: 'limtan649@gmail.com',
      // pass: process.env.SMTP_PASSWORD,
      pass: 'snnpaescnvqjkxhj',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} < ${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
