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
    const validStatuses = Object.values(Status);

    if (!validStatuses.includes(status.toUpperCase() as Status)) {
      throw new Error("Invalid status");
    }

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
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }
    const updatedTask = await TaskRepository.update(id, data);

    return {
      data: updatedTask,
    };
  }

  static async getByCategory(category: string, page: number, limit: number) {
    const validCategories = Object.values(Category);

    if (!validCategories.includes(category.toUpperCase() as Category)) {
      throw new Error("Invalid category");
    }

    const skip = (page - 1) * limit;

    const [tasks, count] = await Promise.all([
      TaskRepository.findByCategory(category, skip, limit),
      TaskRepository.countByCategory(category),
    ]);

    const totalPages = Math.ceil(count / limit);

    return {
      count,
      page,
      pages: totalPages,
      data: tasks,
    };
  }
}
