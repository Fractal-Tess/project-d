import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '$/env';
import { db } from '$/server/db';
import { accounts, users, verificationTokens } from '$/server/db/schema';
import * as register from './register';
import * as login from './login';

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
  debug: env.NODE_ENV === 'development',
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: {
        ...session.user
      }
    })
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  session: {
    strategy: 'jwt',
    // TODO: Make this into an environment variable
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      id: 'credentials-login',
      credentials: login.credentials,
      authorize: login.authorize
    }),

    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      id: 'credentials-register',
      credentials: register.credentials,
      authorize: register.authorize
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
    signOut: '/auth/signOut',
    error: '/auth/error'
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
export type Session = Awaited<ReturnType<typeof getServerAuthSession>>;
