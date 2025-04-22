import { Request, Response } from "express";
import { NoteService } from "../services/NoteService";

export class NoteController {
  static async create(req: Request, res: Response) {
    const { taskId } = req.params;
    const { note } = req.body;
    try {
      const newNote = await NoteService.create({
        note,
        task_id: Number(taskId),
      });
      res.status(201).json(newNote);
      return;
    } catch (error: any) {
      res.status(500).json({
        errors: ["an internal server error occurred"],
      });
      return;
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await NoteService.delete(id);
      res.status(204).json();
      return;
    } catch (error: any) {
      if (error.message === "Note not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({
        errors: ["an internal server error occurred"],
      });
      return;
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const note = await NoteService.getById(id);
      res.status(200).json(note);
      return;
    } catch (error: any) {
      if (error.message === "Note not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({
        errors: ["an internal server error occurred"],
      });
      return;
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
      return;
    } catch (error: any) {
      res.status(500).json({
        errors: ["an internal server error occurred"],
      });
      return;
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;

    try {
      const note = await NoteService.update(id, data);
      res.status(200).json(note);
      return;
    } catch (error: any) {
      if (error.message === "Note not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({
        errors: ["an internal server error occurred"],
      });
      return;
    }
  }
}
