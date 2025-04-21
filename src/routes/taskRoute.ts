import { Router } from 'express';
import { ValidationMiddleware } from '../middlewares/ValidationMiddleware';
import { TaskController } from '../controllers/TaskController';

const router = Router();


router.post('/tasks', ValidationMiddleware.validateTask, TaskController.create);
router.delete('/tasks/:id', TaskController.delete);
router.get('/tasks', TaskController.get);


export default router;