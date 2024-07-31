// routes/levelRoutes.ts
import express from 'express';
import { getAllLevels, getLevelById, createLevel } from '../controllers/levelController';

const router = express.Router();

router.get('/', getAllLevels);
router.get('/:id', getLevelById);
router.post('/', createLevel);

export default router;
