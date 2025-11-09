import express from 'express';
import {
  getRecentActivities,
  getProjectorActivities,
  getUserActivities,
  getActivityStats
} from '../controllers/activity.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/recent', protect, getRecentActivities);
router.get('/stats', protect, authorize('admin'), getActivityStats);
router.get('/projector/:projectorId', protect, getProjectorActivities);
router.get('/user/:userId', protect, getUserActivities);

export default router;
