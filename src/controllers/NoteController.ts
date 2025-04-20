import { Request, Response } from 'express';
import { NoteService } from '../services/NoteService';

export class NoteController {
  static async create(req: Request, res: Response) {
    const { taskId } = req.params;
    const { note } = req.body;

    const newNote = await NoteService.create({ note, task_id: Number(taskId) });
    res.status(201).json(newNote);
  }
}