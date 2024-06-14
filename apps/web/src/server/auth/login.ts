import { db } from '../db/index';
import argon2 from 'argon2';
import { type User } from 'next-auth';
import { type InputCredentials, type ProviderCredentials } from '$/utils';
import { type schema, validator } from '$/schema/login';

// Credentials for the provider
export const credentials = {} as ProviderCredentials<typeof schema>;

// TODO: Handle all invalid states
export async function authorize(
  inputCredentials: InputCredentials<typeof schema>
): Promise<User | null> {
  const { error, data, success } =
    await validator.safeParseAsync(inputCredentials);

  if (!success) {
    console.log('Credentials are invalid', error);
    return null;
  }

  const dbUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, data.email),
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
    data.password
  );
  if (!passwordVerification) {
    console.log("The password doesn't match");
    return null;
  }

  const user = {
    id: dbUser.id,
    email: dbUser.email,
    image: dbUser.image,
    name: dbUser.name
  };

  console.log('User is authenticated', user);
  return user;
}
