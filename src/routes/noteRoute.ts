import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { NoteController } from "../controllers/NoteController";

const router = Router();

router.post("/tasks/:taskId/notes", ValidationMiddleware.validateNote, NoteController.create);
router.delete("/notes/:id", NoteController.delete);
router.get("/notes/:id", NoteController.getById);
router.get("/tasks/:taskId/notes", NoteController.getAll);
router.put("/notes/:id", ValidationMiddleware.validateNote, NoteController.update);

export default router;
