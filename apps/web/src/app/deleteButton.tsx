'use client';

import { Button } from '@ui/components/ui/button';
import React from 'react';
import { api } from '$/trpc/react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: number }) {
  const mutation = api.post.deletePost.useMutation();
  const router = useRouter();

  async function deletePost(id: number) {
    await mutation.mutateAsync({ id });

    router.refresh();
  }

  return (
    <Button onClick={() => deletePost(id)} disabled={mutation.isPending}>
      X
    </Button>
  );
}
