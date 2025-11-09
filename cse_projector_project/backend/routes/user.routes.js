import express from 'express';
import {
  getUsers,
  getCurrentUser,
  updateProfile
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateProfile);

export default router;
