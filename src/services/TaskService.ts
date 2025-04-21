import { TaskRepository } from "../repositories/TaskRepository";
import { Category } from "../enums/TaskCategory";
import { Priority } from "../enums/TaskPriority";
import { Status } from "../enums/TaskStatus";

export class TaskService {
  static async create(data: {
    title: string;
    priority: Priority;
    category: Category;
    status: Status;
  }) {
    return await TaskRepository.create(data);
  }

  static async delete(id: number) {
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return await TaskRepository.delete(id);
  }

  static async getAll(page: number, limit: number, query?: string) {
    const skip = (page - 1) * limit;

    const [allTasks, count] = await Promise.all([
      TaskRepository.findAll(skip, limit, query),
      TaskRepository.countAll(query),
    ]);

    const totalPages = Math.ceil(count / limit);

    if (count === 0) {
      return {
        count: 0,
        page,
        pages: 0,
        data: [],
      };
    }

    return {
      count,
      page,
      pages: totalPages,
      data: allTasks,
    };
  }

  static async getById(id: number) {
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return {
      data: task,
    };
  }

  static async getByStatus(status: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [tasks, count] = await Promise.all([
      TaskRepository.findByStatus(status, skip, limit),
      TaskRepository.countByStatus(status),
    ]);

    const totalPages = Math.ceil(count / limit);

    return {
      count,
      page,
      pages: totalPages,
      data: tasks,
    };
  }

  static async update(id: number, data: any) {
    const updatedTask = await TaskRepository.update(id, data);

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return {
      data: updatedTask,
    };
  }
}
