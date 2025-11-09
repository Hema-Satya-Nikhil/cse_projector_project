import mongoose from 'mongoose';

const projectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Projector name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  serialNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'checked-out', 'booked', 'maintenance'],
    default: 'available'
  },
  currentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  lastUsedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUsedAt: {
    type: Date
  },
  checkedOutAt: {
    type: Date
  },
  location: {
    type: String,
    default: 'CSE Department Store'
  },
  specifications: {
    resolution: String,
    brightness: String,
    connectivity: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
projectorSchema.index({ status: 1 });
projectorSchema.index({ name: 1 });

const Projector = mongoose.model('Projector', projectorSchema);

export default Projector;
