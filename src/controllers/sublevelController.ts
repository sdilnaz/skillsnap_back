// controllers/sublevelController.ts
import { Request, Response } from 'express';
import Level from '../models/lessonsModel';

export const getSublevelsByLevelId = async (req: Request, res: Response) => {
  try {
    const level = await Level.findById(req.params.levelId);
    if (!level) return res.status(404).json({ message: 'Level not found' });
    res.status(200).json(level.sublevels);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSublevel = async (req: Request, res: Response) => {
  try {
    const level = await Level.findById(req.params.levelId);
    if (!level) return res.status(404).json({ message: 'Level not found' });
    level.sublevels.push(req.body);
    await level.save();
    res.status(201).json(level);
  } catch (error : any) {
    res.status(400).json({ message: error.message });
  }
};
