'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { schema, validator } from '$/schema/login';
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
import { useSearchParams } from 'next/navigation';

export default function ProfileForm() {
  const searchParams = useSearchParams();
  const callBackURL = searchParams.get('callbackUrl') ?? '/';

  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      email: 'vgfractal@gmail.com',
      password: '123123123'
    }
  });

  async function onSubmit(values: z.infer<typeof validator>) {
    const res = await signIn('credentials-login', {
      ...values,
      redirect: false,
      callbackUrl: callBackURL
    });

    if (!res?.error) window.location.href = callBackURL;
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-md border-2 border-black px-4 py-2 shadow-2xl dark:border-white">
      <Form {...form}>
        <Button onClick={() => signIn('discord')}>Discord</Button>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-4"
        >
          {Object.entries(schema).map(([key, { type, placeholder }], idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={key as keyof typeof schema}
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
          ))}
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
