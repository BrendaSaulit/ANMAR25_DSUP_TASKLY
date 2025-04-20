import { PrismaClient } from '@prisma/client';
import { Category } from '../enums/TaskCategory';
import { Priority } from '../enums/TaskPriority';
import { Status } from '../enums/TaskStatus';


const prisma = new PrismaClient();

export class TaskRepository {
  static async create(data: { title: string; priority: Priority; category: Category; status: Status }) {
    return await prisma.task.create({ data });
  }
}


