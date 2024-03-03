import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const selectionRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx }) => {
      return ctx.db.selection.findMany();
    }),
});
