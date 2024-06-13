'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { loginSchema, loginValidator } from '$/server/auth/validators';
import { Button } from '@ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/components/ui/form';
import { Input } from '@ui/components/ui/input';

export default function ProfileForm() {
  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof loginValidator>) {
    const res = await signIn('credentials-login', {
      ...values
    });
    //TODO: Handle errors and show them to the user
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.entries(loginSchema).map(
          ([key, { type, placeholder }], idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={key as keyof typeof loginSchema}
              render={({
                field
              }: {
                field: { name: string; value: string };
              }) => (
                <FormItem className="min-w-[300px]">
                  <FormLabel className="capitalize">{key}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder ?? ''}
                      {...field}
                      type={type}
                    />
                  </FormControl>
                  <FormMessage className="flex w-full flex-wrap" />
                </FormItem>
              )}
            />
          )
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
