import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  static async create(req: Request, res: Response) {
    const task = await TaskService.create(req.body);
    try{
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
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
    const { page = '1', limit = '5', query } = req.query;

    try {
        const tasks = await TaskService.getAll(
          Number(page),
          Number(limit),
          query ? String(query) : undefined
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

  static async getByStatus(req: Request, res: Response) {
    const status = req.params.status.toUpperCase();
    const { page = '1', limit = '5' } = req.query;

  try {
    const result = await TaskService.getByStatus(
      status,
      Number(page),
      Number(limit)
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
   }
  }

  static async update(req: Request, res: Response){
    const id = Number(req.params.id);
    const data = req.body;

    try {
        const task = await TaskService.update(id, data);
        res.status(200).json(task);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
  
}