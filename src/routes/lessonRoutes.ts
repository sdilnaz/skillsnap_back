// routes/lessonRoutes.ts
import express from 'express';
import { getLessonsBySublevelId, createLesson, getLessonById } from '../controllers/lessonController';

const router = express.Router({ mergeParams: true });

router.get('/', getLessonsBySublevelId);
router.post('/', createLesson);
router.get('/:lessonId', getLessonById);


export default router;
