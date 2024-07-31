// services/sublevelService.ts
import Level from '../models/lessonsModel';

export const findSublevelsByLevelId = async (levelId: string) => {
  const level = await Level.findById(levelId);
  if (!level) throw new Error('Level not found');
  return level.sublevels;
};

export const createNewSublevel = async (levelId: string, data: any) => {
  const level = await Level.findById(levelId);
  if (!level) throw new Error('Level not found');
  level.sublevels.push(data);
  await level.save();
  return level;
};
