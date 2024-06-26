import { z } from 'zod';
import { eq } from 'drizzle-orm';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '$/server/api/trpc';
import { posts } from '$/server/db/schema';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      limit: 5,
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        user: true
      }
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),

  deletePost: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    })
});
