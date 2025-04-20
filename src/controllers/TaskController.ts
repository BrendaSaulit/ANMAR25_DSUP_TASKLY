import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  static async create(req: Request, res: Response) {
    const task = await TaskService.create(req.body);
    res.status(201).json(task);
  }


  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await TaskService.delete(id);
      res.status(204).send(); // 204 = No Content
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

}