import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class NoteRepository {
  static async create(data: { note: string; task_id: number }) {
    return await prisma.note.create({ data });
  }

  static async delete(id: number) {
    return await prisma.note.delete({
      where: { id },
    });
  }

  static async findById(id: number) {
    return await prisma.note.findUnique({
      where: { id },
    });
  }

  static async findAll(taskId: number, skip: number, limit: number) {
    return await prisma.note.findMany({
      where: {
        task_id: taskId,
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
  }

  static async countAll(taskId: number) {
    return await prisma.note.count({
      where: {
        task_id: taskId,
      },
    });
  }

  static async update(id: number, data: any) {
    return await prisma.note.update({
      where: { id },
      data,
    });
  }
}
