import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchQuery } from "./selection-schema";

export const selectionRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx }) => {
      return ctx.db.selection.findMany();
    }),
  getRecommended: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search
          },
          is_trending: false
        },
        include: {
          RegularThumb: true
        }
      })
      return {
        status: 'success',
        results: selections.length,
        data: selections
      }
    })
});
