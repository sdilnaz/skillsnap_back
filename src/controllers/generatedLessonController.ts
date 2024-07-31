// controllers/generatedLesson-controllers.ts
import { Request, Response } from 'express';
import { generatedLessonService } from '../services/generatedLessonService';

class GeneratedLessonController {
  async getLessonsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const lessons = await generatedLessonService.getLessonsByUserId(userId);
      res.status(200).json(lessons);
    } catch (error) {
      console.error('Error fetching lessons by user ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getLessonById(req: Request, res: Response): Promise<void> {
    try {
      const { lessonId } = req.params;
      const lesson = await generatedLessonService.getLessonById(lessonId);
      if (!lesson) {
        res.status(404).json({ error: 'Lesson not found' });
        return;
      }
      res.status(200).json(lesson);
    } catch (error) {
      console.error('Error fetching lesson by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const generatedLessonController = new GeneratedLessonController();
