import { db } from '../db/index';
import argon2 from 'argon2';
import { type User } from 'next-auth';
import { type InputCredentials, type ProviderCredentials } from '$/utils';
import { type schema, validator } from '$/schema/register';
import { accounts, users } from '$/server/db/schema';
import { randomBytes } from 'crypto';

export const credentials = {} as ProviderCredentials<typeof schema>;

// TODO: Handle all invalid states
export async function authorize(
  inputCredentials: InputCredentials<typeof schema>
): Promise<User | null> {
  const { success, data, error } =
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
  if (dbUser) {
    console.log('A user with this email already exists');
    return null;
  }

  const passwordHash = await argon2.hash(data.password);
  const id = crypto.randomUUID();
  const userInsertResult = await db.insert(users).values({
    id,
    email: data.email,
    name: data.username
  });

  console.log('Before');
  await db.insert(accounts).values({
    userId: id,
    type: 'email',
    provider: 'credentials',
    providerAccountId: randomBytes(128).toString('hex'),
    password: passwordHash
  });
  console.log('After');

  console.log('User inserted', userInsertResult);

  // TODO: Send SMTP verification email

  return {
    id,
    email: data.email,
    name: data.username
  };
}
