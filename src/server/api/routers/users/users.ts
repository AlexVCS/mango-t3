import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx }) => {
      return ctx.db.user.findMany();
    }),
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id },
      });
    }),
  createUser: publicProcedure
    .input(
      z.object({ clerkId: z.string(), name: z.string(), email: z.string() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          clerk_id: input.clerkId,
          name: input.name,
          email: input.email,
        },
      });
    }),
});