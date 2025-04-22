import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const task = await TaskService.create(req.body);
       res.status(201).json(task);
       return;
    } catch (error: any) {
      res.status(500).json({
        errors: ["an internal server error occurred"],
       });
      return 
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await TaskService.delete(id);
       res.status(204).send();
       return;
    } catch (error: any) {
      if(error.message === "Task not found"){ 
     res.status(404).json({ error: error.message });
     return;
    }
    res.status(500).json({
      errors: ["an internal server error occurred"],
     });
     return;
    }
  }

  static async get(req: Request, res: Response) {
    const { page = "1", limit = "5", query } = req.query;

    try {
      const tasks = await TaskService.getAll(
        Number(page),
        Number(limit),
        query ? String(query) : undefined,
      );

      res.status(200).json(tasks);
      return;
    } catch (error: any) {
      res.status(500).json({
        errors: ["an internal server error occurred"],
       });
       return;
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const tasks = await TaskService.getById(id);
      res.status(200).json(tasks);
      return;
    } catch (error: any) {
      if(error.message === "Task not found"){ 
     res.status(404).json({ error: error.message });
     return;
    }
    res.status(500).json({
      errors: ["an internal server error occurred"],
     });
     return;
    }
  }

  static async getByStatus(req: Request, res: Response) {
    const status = req.params.status.toUpperCase();
    const { page = "1", limit = "5" } = req.query;

    try {
      const result = await TaskService.getByStatus(
        status,
        Number(page),
        Number(limit),
      );
      res.status(200).json(result);
      return;
    }catch (error: any) {
      if(error.message === "Invalid status"){ 
     res.status(400).json({ error: error.message });
     return;
      }
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
      const task = await TaskService.update(id, data);
      res.status(200).json(task);
      return;
    } catch (error: any) {
      if(error.message === "Task not found"){ 
     res.status(404).json({ error: error.message });
     return;
    }
    res.status(500).json({
      errors: ["an internal server error occurred"],
     });
     return;
    }
  }

  static async getByCategory(req: Request, res: Response) {
    const category = req.params.category.toUpperCase();
    const { page = "1", limit = "5" } = req.query;

    try {
      const result = await TaskService.getByCategory(
        category,
        Number(page),
        Number(limit),
      );
      res.status(200).json(result);
      return
    } catch (error: any) {
      if(error.message === "Invalid category"){ 
     res.status(400).json({ error: error.message });
     return;
      }
      res.status(500).json({
        errors: ["an internal server error occurred"],
       });
       return;
    }
  }
}
