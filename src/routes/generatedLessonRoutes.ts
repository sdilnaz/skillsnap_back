// routes/generatedLessonRoutes.ts
import express from 'express';
import { generatedLessonController } from '../controllers/generatedLessonController';

const router = express.Router();

router.get('/user/:userId', generatedLessonController.getLessonsByUserId);
router.get('/:lessonId', generatedLessonController.getLessonById);

export default router;
