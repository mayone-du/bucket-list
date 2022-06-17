import * as trpc from "@trpc/server";
import type { Context } from "src/context";
import { z } from "zod";

export const appRouter = trpc
  .router<Context>()
  .query("getUserById", {
    input: z.string(),
    resolve: async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst();
      return user?.id;
      return input;
      // return (ctx as ).user.id;
    },
  })
  .mutation("createUser", {
    // validate input with Zod
    input: z.object({
      name: z.string().min(3),
      bio: z.string().max(142).optional(),
    }),
    resolve: async ({ input, ctx }) => {
      // return await ctx.prisma.user.create({
      //   data: {
      //     name: "testUser",
      //     email: "test@email.com",
      //   },
      // });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
