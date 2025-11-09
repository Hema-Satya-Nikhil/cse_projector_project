import express from 'express';
import {
  getBookings,
  getBooking,
  createBooking,
  cancelBooking
} from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBooking);

router.put('/:id/cancel', protect, cancelBooking);

export default router;
