import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '../../../db/db';
import User from '../../../db/models/User';

export default NextAuth({
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
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
});
