import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

const router = Router();

router.post('/tasks/:taskId/notes', NoteController.create);
router.delete('/notes/:id', NoteController.delete)
router.get('/notes/:id', NoteController.getById)
router.get('/tasks/:taskId/notes', NoteController.getAll)
router.put('/notes/:id', NoteController.update)

export default router;