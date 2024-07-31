// services/levelService.ts
import Level from '../models/lessonsModel';

export const findAllLevels = async () => {
  return await Level.find();
};

export const findLevelById = async (id: string) => {
  return await Level.findById(id);
};

export const createNewLevel = async (data: any) => {
  const level = new Level(data);
  return await level.save();
};
