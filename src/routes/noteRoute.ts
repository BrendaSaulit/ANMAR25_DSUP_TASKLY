import { Router } from 'express';
import { NoteController } from '../controllers/NoteController';

const router = Router();

router.post('/notes', NoteController.createNote);

export default router;