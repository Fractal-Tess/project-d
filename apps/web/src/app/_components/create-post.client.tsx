'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@ui/components/ui/button';

import { api } from '$/trpc/react';
import { Input } from '@ui/components/ui/input';

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState('');

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName('');
    }
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder="Title"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
