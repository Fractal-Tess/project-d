import { z } from 'zod';

// The schema which should be followed when adapting the login/register forms
type Schema = Record<
  string,
  {
    type: 'email' | 'password' | 'text';
    validator: z.ZodTypeAny;
    placeholder?: string;
  }
>;

// Helper for creating validators
function createValidatorFromSchema<T extends Schema>(schema: T) {
  const validationSchema = Object.entries(schema).reduce(
    (accumulator, [key, { validator }]) => ({
      ...accumulator,
      [key]: validator
    }),
    {}
  ) as Record<keyof T, T[keyof T]['validator']>;
  return z.object(validationSchema);
}

// Registration schema
export const registerSchema = {
  email: {
    type: 'email',
    validator: z
      .string()
      .email({ message: 'Please enter a valid email address' }),
    placeholder: 'example@mail.com'
  },
  username: {
    type: 'text',
    validator: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters long.' })
      .max(50, { message: 'Username must be at most 50 characters long.' }),
    placeholder: 'John Doe'
  },
  password: {
    type: 'password',
    validator: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(50, { message: 'Password must be at most 50 characters long.' }),
    placeholder: '********'
  }
} satisfies Schema;

export const registerValidator = createValidatorFromSchema(registerSchema);

export const loginSchema = {
  email: {
    type: 'email',
    validator: z
      .string()
      .email({ message: 'Please enter a valid email address' }),

    placeholder: 'example@mail.com'
  },
  password: {
    type: 'password',
    validator: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(50, { message: 'Password must be at most 50 characters long.' }),
    placeholder: '********'
  }
} satisfies Schema;

export const loginValidator = createValidatorFromSchema(loginSchema);
