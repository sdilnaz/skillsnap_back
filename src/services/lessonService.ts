// services/lessonService.ts
import Level from '../models/lessonsModel';

export const findLessonsBySublevelId = async (levelId: string, sublevelId: string) => {
  const level = await Level.findById(levelId);
  if (!level) throw new Error('Level not found');
  const sublevel = level.sublevels.id(sublevelId);
  if (!sublevel) throw new Error('Sublevel not found');
  return sublevel.lessons;
};

export const createNewLesson = async (levelId: string, sublevelId: string, data: any) => {
  const level = await Level.findById(levelId);
  if (!level) throw new Error('Level not found');
  const sublevel = level.sublevels.id(sublevelId);
  if (!sublevel) throw new Error('Sublevel not found');
  sublevel.lessons.push(data);
  await level.save();
  return sublevel;
};




export const getLessonByIdNum = async (levelId: string, sublevelId: string, lessonId: string) => {
    const level = await Level.findById(levelId);
    if (!level) throw new Error('Level not found');
    const sublevel = level.sublevels.id(sublevelId);
    if (!sublevel) throw new Error('Sublevel not found');
    const lesson = sublevel.lessons.id(lessonId);
    if (!lesson) throw new Error('Lesson not found');
    return lesson;
  };
