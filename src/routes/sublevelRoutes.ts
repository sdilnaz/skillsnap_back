// routes/sublevelRoutes.ts
import express from 'express';
import { getSublevelsByLevelId, createSublevel } from '../controllers/sublevelController';

const router = express.Router({ mergeParams: true });

router.get('/', getSublevelsByLevelId);
router.post('/', createSublevel);

export default router;
