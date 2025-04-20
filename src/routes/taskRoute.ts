import { Router } from 'express';
import { ValidationMiddleware } from '../middlewares/ValidationMiddleware';
import { TaskController } from '../controllers/TaskController';

const router = Router();


router.post('/tasks', ValidationMiddleware.validateTask, TaskController.createTask);

export default router;