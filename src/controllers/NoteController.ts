import { Request, Response } from "express";
import { NoteService } from "../services/NoteService";

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

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const note = await NoteService.getById(id);
      res.status(200).json(note);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const taskId = Number(req.params.taskId);
    const { page = "1", limit = "5" } = req.query;

    try {
      const notes = await NoteService.getAll(
        taskId,
        Number(page),
        Number(limit),
      );

      res.status(200).json(notes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;

    try {
      const note = await NoteService.update(id, data);
      res.status(200).json(note);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
