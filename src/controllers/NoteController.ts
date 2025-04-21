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
        res.status(204).send();
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }

    static async getById(req: Request, res: Response){
        const id = Number(req.params.id);
    
        try {
            const note = await NoteService.getById(id);
            res.status(200).json(note);
          } catch (error: any) {
            res.status(500).json({ error: error.message });
          }
      }
}