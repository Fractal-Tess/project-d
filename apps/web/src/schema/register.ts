import { z } from 'zod';
import { type Schema, createValidatorFromSchema } from '$/utils';

// TODO: Consider constraints into ENV variables

// Register schema
export const schema = {
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

// Validator
export const validator = createValidatorFromSchema(schema);
