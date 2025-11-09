import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  projector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projector',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required - please specify why you need the projector'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Validate that end time is after start time
bookingSchema.pre('save', function(next) {
  if (this.endTime <= this.startTime) {
    next(new Error('End time must be after start time'));
  }
  next();
});

// Index for faster queries
bookingSchema.index({ projector: 1, startTime: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
