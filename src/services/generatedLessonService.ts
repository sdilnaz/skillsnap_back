// services/generatedLessonService.ts
import GeneratedLesson, { ILesson } from '../models/generatedLessonModel';

class GeneratedLessonService {
  async getLessonsByUserId(userId: string): Promise<ILesson[]> {
    return GeneratedLesson.find({ userId }).exec();
  }

  async getLessonById(lessonId: string): Promise<ILesson | null> {
    return GeneratedLesson.findById(lessonId).exec();
  }
}

export const generatedLessonService = new GeneratedLessonService();
