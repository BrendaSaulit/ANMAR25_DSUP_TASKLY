import { PrismaClient } from "@prisma/client";
import { Category } from "../enums/TaskCategory";
import { Priority } from "../enums/TaskPriority";
import { Status } from "../enums/TaskStatus";

const prisma = new PrismaClient();

export class TaskRepository {
  static async create(data: {
    title: string;
    priority: Priority;
    category: Category;
    status: Status;
  }) {
    return await prisma.task.create({ data });
  }

  static async delete(id: number) {
    await prisma.note.deleteMany({
      where: { task_id: id },
    });

    return await prisma.task.delete({
      where: { id },
    });
  }

  static async findById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        notes: true,
      },
    });
  }

  static async findAll(skip: number, limit: number, query?: string) {
    const whereCondition = query
      ? {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              notes: {
                some: {
                  note: {
                    contains: query,
                  },
                },
              },
            },
          ],
        }
      : {};

    return await prisma.task.findMany({
      where: whereCondition,
      skip,
      take: limit,
      include: {
        notes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  static async countAll(query?: string) {
    const whereCondition = query
      ? {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              notes: {
                some: {
                  note: {
                    contains: query,
                  },
                },
              },
            },
          ],
        }
      : {};

    const tasks = await prisma.task.findMany({
      where: whereCondition,
      select: { id: true },
    });

    return tasks.length;
  }

  static async findByStatus(status: string, skip: number, limit: number) {
  
    return await prisma.task.findMany({
      where: {
        status: status.toUpperCase() as "TODO" | "IN_PROGRESS" | "DONE",
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        notes: true,
      },
    });
  }

  static async countByStatus(status: string) {

    return await prisma.task.count({
      where: {
        status: status.toUpperCase() as "TODO" | "IN_PROGRESS" | "DONE",
      },
    });
  }

  static async update(id: number, data: any) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  static async findByCategory(category: string, skip: number, limit: number) {

    return await prisma.task.findMany({
      where: {
        category: category.toUpperCase() as "WORK" | "STUDY" | "PERSONAL" | "OTHER",
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        notes: true,
      },
    });
  }

  static async countByCategory(category: string) {
    
    return await prisma.task.count({
      where: {
        category: category.toUpperCase() as  "WORK" | "STUDY" | "PERSONAL" | "OTHER",
      },
    });
  }
}
