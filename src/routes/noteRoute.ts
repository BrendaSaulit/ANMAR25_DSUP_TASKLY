import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

const router = Router();

router.post('/tasks/:taskId/notes', NoteController.create);

export default router;