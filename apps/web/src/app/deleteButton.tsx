"use client"


import { Button } from '@ui/components/ui/button'
import React from 'react'
import { api } from '$/trpc/server';

export default function DeleteButton({ id }: { id: string }) {

  async function deletePost(id: string) {
    await api.post.deletePost({ id })
  }

  return (
    <Button onClick={() => deletePost(id)}>X</Button>
  )
}

