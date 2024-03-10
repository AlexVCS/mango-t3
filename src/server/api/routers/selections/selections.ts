import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
            contains: input.search,
          },
          is_trending: false,
        },
        include: {
          RegularThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),

  getTrending: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search,
          },
          is_trending: true,
        },
        include: {
          TrendingThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),

  getMovies: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search,
          },
          category: "Movie",
        },
        include: {
          RegularThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),
  getSeries: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search,
          },
          category: "TV Series",
        },
        include: {
          RegularThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),
  getBookmarkedMovies: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search,
          },
          category: "Movie",
          is_bookmarked: true,
        },
        include: {
          RegularThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),
  getBookmarkedSeries: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const selections = await ctx.db.selection.findMany({
        where: {
          title: {
            mode: "insensitive",
            contains: input.search,
          },
          category: "TV Series",
          is_bookmarked: true,
        },
        include: {
          RegularThumb: true,
        },
      });
      return {
        status: "success",
        results: selections.length,
        data: selections,
      };
    }),
});
