import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '../../../db/db';
import User from '../../../db/models/User';
import comparePassword from '../../../utils/comparePassword';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  // https://stackoverflow.com/questions/65737233/next-auth-next-js
  // https://next-auth.js.org/configuration/options#cookies
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        ///////// const { email, password } = credentials;
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error('Please enter email or password');
        }

        await db.connect();

        // Find user in the database
        const user = await User.findOne({ email }).select('+password').lean();

        if (!user) {
          await db.disconnect();
          throw new Error('Invalid Email or Password');
        }

        // Check if password is correct or not
        const isPasswordMatched = await comparePassword(password, user.password);

        if (!isPasswordMatched) {
          await db.disconnect();
          throw new Error('Invalid Email or Password');
        }

        await db.disconnect();

        user._id = user._id.toString();

        user['password'] = null;

        return user;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).user = token.user;

      return Promise.resolve(session);
    },
  },
});
