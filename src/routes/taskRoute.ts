import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { TaskController } from "../controllers/TaskController";

const router = Router();

router.post("/tasks", ValidationMiddleware.validateTask, TaskController.create);
router.delete("/tasks/:id", TaskController.delete);
router.get("/tasks", TaskController.get);
router.get("/tasks/:id", TaskController.getById);
router.get("/tasks/status/:status", TaskController.getByStatus);
router.put("/tasks/:id", ValidationMiddleware.validateTask, TaskController.update);
router.get("/tasks/category/:category", TaskController.getByCategory);

export default router;
