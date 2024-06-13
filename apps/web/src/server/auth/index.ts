import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import argon2 from 'argon2';

import { env } from '$/env';
import { db } from '$/server/db';
import {
  accounts,
  sessions,
  users,
  verificationTokens
} from '$/server/db/schema';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      id: 'credentials-login',
      credentials: {
        email: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        console.log('Login', credentials);
        if (!credentials) return null;
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email),
          with: {
            accounts: true
          }
        });
        if (!dbUser) {
          console.log('User with this email does not exist in the database');
          return null;
        }

        const account = dbUser.accounts.find(
          account => account.provider === 'credentials'
        );

        if (!account) {
          console.log('User with this email does not use credentials to login');
          return null;
        }

        const passwordVerification = await argon2.verify(
          account.password!,
          credentials.password
        );
        if (!passwordVerification) {
          console.log("The password doesn't match");
          return null;
        }

        return {
          id: dbUser.id,
          email: dbUser.email,
          image: dbUser.image,
          name: dbUser.name
        };
      }
    }),

    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      id: 'credentials-register',
      credentials: {
        email: { label: 'Email', type: 'email' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        console.log('Register', credentials);
        if (!credentials) return null;
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email),
          with: {
            accounts: true
          }
        });
        if (dbUser) {
          console.log('A user with this email already exists');
          return null;
        }

        const passwordHash = await argon2.hash(credentials.password);
        const id = crypto.randomUUID();
        const userInsertResult = await db.insert(users).values({
          id,
          email: credentials.email,
          name: credentials.username
        });

        await db.insert(accounts).values({
          userId: id,
          type: 'email',
          provider: 'credentials',
          providerAccountId: '',
          password: passwordHash
        });

        console.log('User inserted', userInsertResult);

        // TODO: Send a verification email

        return {
          id,
          email: credentials.email,
          name: credentials.username
        };
      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error'
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
