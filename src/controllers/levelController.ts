// controllers/levelController.ts
import { Request, Response } from 'express';
import Level from '../models/lessonsModel';

export const getAllLevels = async (req: Request, res: Response) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLevelById = async (req: Request, res: Response) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) return res.status(404).json({ message: 'Level not found' });
    res.status(200).json(level);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLevel = async (req: Request, res: Response) => {
  const level = new Level(req.body);
  try {
    const newLevel = await level.save();
    res.status(201).json(newLevel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteLevel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Level.findByIdAndDelete(id);
    res.status(200).json({ message: 'Level deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
