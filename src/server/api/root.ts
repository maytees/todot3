import { classRouter } from "~/server/api/routers/class";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  class: classRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
