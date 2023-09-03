import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const classRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.class.findMany({
      include: {
        todos: true,
      },
    });
  }),
  createClass: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.class.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
  deleteClass: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.class.delete({
        where: {
          id: input.classId,
        },
      });
    }),
  createTodo: protectedProcedure
    .input(
      z.object({
        classId: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          classId: input.classId,
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  deleteTodo: protectedProcedure
    .input(z.object({ todoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input.todoId,
        },
      });
    }),
});
