import { Request, Response } from 'express';
import { NoteService } from '../services/NoteService';

export class NoteController {
  static async create(req: Request, res: Response) {
    const { taskId } = req.params;
    const { note } = req.body;

    const newNote = await NoteService.create({ note, task_id: Number(taskId) });
    res.status(201).json(newNote);
  }

  static async delete(req: Request, res: Response) {
      const id = Number(req.params.id);
  
      try {
        await NoteService.delete(id);
        res.status(204).send(); // 204 = No Content
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }
}