
// controllers/lessonController.ts
import { Request, Response } from 'express';
import { findLessonsBySublevelId, createNewLesson, getLessonByIdNum } from '../services/lessonService';

export const getLessonsBySublevelId = async (req: Request, res: Response) => {
  try {
    const lessons = await findLessonsBySublevelId(req.params.levelId, req.params.sublevelId);
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const sublevel = await createNewLesson(req.params.levelId, req.params.sublevelId, req.body);
    res.status(201).json(sublevel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await getLessonByIdNum(req.params.levelId, req.params.sublevelId, req.params.lessonId);
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
