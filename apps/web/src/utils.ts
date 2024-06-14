import type { CredentialInput } from 'next-auth/providers/credentials';
import { z } from 'zod';

// The schema which should be followed when adapting the login/register forms
export type Schema = Record<
  string,
  {
    type: 'email' | 'password' | 'text';
    validator: z.ZodTypeAny;
    placeholder?: string;
  }
>;

export type ProviderCredentials<T> = {
  [K in keyof T]: CredentialInput;
};
export type InputCredentials<T> = { [K in keyof T]: string } | undefined;

// Helper for creating validators
export function createValidatorFromSchema<T extends Schema>(schema: T) {
  const validationSchema = Object.entries(schema).reduce(
    (accumulator, [key, { validator }]) => ({
      ...accumulator,
      [key]: validator
    }),
    {}
  ) as Record<keyof T, T[keyof T]['validator']>;
  return z.object(validationSchema);
}
