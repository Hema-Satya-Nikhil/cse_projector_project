import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projector',
    required: true
  },
  action: {
    type: String,
    enum: ['check-out', 'check-in', 'booked', 'cancelled', 'created', 'updated'],
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for faster queries
activitySchema.index({ createdAt: -1 });
activitySchema.index({ user: 1 });
activitySchema.index({ projector: 1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
