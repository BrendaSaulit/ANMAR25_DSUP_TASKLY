import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  static async createTask(req: Request, res: Response) {
    const task = await TaskService.create(req.body);
    res.status(201).json(task);
  }
}