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
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async get(req: Request, res: Response) {
    const { page = '1', limit = '5' } = req.query;

    try {
        const tasks = await TaskService.getAll(
          Number(page),
          Number(limit)
        );
    
        res.status(200).json(tasks);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
  }

  static async getById(req: Request, res: Response){
    const id = Number(req.params.id);

    try {
        const tasks = await TaskService.getById(id);
        res.status(200).json(tasks);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
  }
}