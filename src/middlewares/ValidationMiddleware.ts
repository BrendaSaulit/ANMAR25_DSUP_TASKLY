import { Request, Response, NextFunction } from "express";
import { TaskSchema } from "../validators/TaskValidator";
import { NoteSchema } from "../validators/NoteValidator";

export class ValidationMiddleware {
  static validateTask(req: Request, res: Response, next: NextFunction) {
    const result = TaskSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    next();
  }

  static validateNote(req: Request, res: Response, next: NextFunction) {
    const result = NoteSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    next();
  }
}
