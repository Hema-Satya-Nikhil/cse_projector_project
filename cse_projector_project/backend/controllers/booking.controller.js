import Booking from '../models/Booking.model.js';
import Projector from '../models/Projector.model.js';
import Activity from '../models/Activity.model.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
  try {
    const { status, projectorId, userId } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (projectorId) query.projector = projectorId;
    if (userId) query.user = userId;

    const bookings = await Booking.find(query)
      .populate('projector', 'name brand model')
      .populate('user', 'name email designation')
      .sort({ startTime: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('projector', 'name brand model')
      .populate('user', 'name email designation');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { projectorId, startTime, endTime, purpose, notes } = req.body;

    // Validate projector exists
    const projector = await Projector.findById(projectorId);
    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      projector: projectorId,
      status: { $in: ['pending', 'active'] },
      $or: [
        {
          startTime: { $lte: new Date(startTime) },
          endTime: { $gte: new Date(startTime) }
        },
        {
          startTime: { $lte: new Date(endTime) },
          endTime: { $gte: new Date(endTime) }
        },
        {
          startTime: { $gte: new Date(startTime) },
          endTime: { $lte: new Date(endTime) }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Projector is already booked for the selected time slot'
      });
    }

    // Create booking
    const booking = await Booking.create({
      projector: projectorId,
      user: req.user.id,
      startTime,
      endTime,
      purpose,
      notes
    });

    // Update projector status if booking is for now
    const now = new Date();
    if (new Date(startTime) <= now && new Date(endTime) >= now) {
      projector.status = 'booked';
      await projector.save();
    }

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: projectorId,
      action: 'booked',
      notes: `Booked ${projector.name} from ${new Date(startTime).toLocaleString()} to ${new Date(endTime).toLocaleString()}`
    });

    // Populate booking data
    await booking.populate('projector', 'name brand model');
    await booking.populate('user', 'name email designation');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: `Booking is already ${booking.status}`
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update projector status if it was booked
    const projector = await Projector.findById(booking.projector);
    if (projector.status === 'booked') {
      projector.status = 'available';
      await projector.save();
    }

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: booking.projector,
      action: 'cancelled',
      notes: req.body.notes || 'Booking cancelled'
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
