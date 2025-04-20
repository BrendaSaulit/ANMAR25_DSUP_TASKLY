import { TaskRepository } from '../repositories/TaskRepository';
import { Category } from '../enums/TaskCategory';
import { Priority } from '../enums/TaskPriority';
import { Status } from '../enums/TaskStatus';



export class TaskService {
  static async create(data: { title: string; priority: Priority; category: Category; status: Status }) {
    return await TaskRepository.create(data);
  }

  static async delete(id: number) {
    const task = await TaskRepository.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    return await TaskRepository.delete(id);
  }

}
