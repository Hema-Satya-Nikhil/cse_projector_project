import express from 'express';
import {
  getProjectors,
  getProjector,
  createProjector,
  updateProjector,
  deleteProjector,
  checkOutProjector,
  checkInProjector
} from '../controllers/projector.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getProjectors)
  .post(protect, authorize('admin'), createProjector);

router.route('/:id')
  .get(protect, getProjector)
  .put(protect, authorize('admin'), updateProjector)
  .delete(protect, authorize('admin'), deleteProjector);

router.post('/:id/checkout', protect, checkOutProjector);
router.post('/:id/checkin', protect, checkInProjector);

export default router;
