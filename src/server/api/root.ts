import { createTRPCRouter } from "~/server/api/trpc";
import { selectionRouter } from "~/server/api/routers/selections/selections";
// import userRouter from '~/server/api/routers/users/user-route';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // users: userRouter,
  selections: selectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
