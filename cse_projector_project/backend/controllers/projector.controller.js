import Projector from '../models/Projector.model.js';
import Activity from '../models/Activity.model.js';
import * as emailService from '../services/email.service.js';

// @desc    Get all projectors
// @route   GET /api/projectors
// @access  Private
export const getProjectors = async (req, res) => {
  try {
    const projectors = await Projector.find({ isActive: true })
      .populate('currentUser', 'name email designation')
      .populate('lastUsedBy', 'name email designation')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: projectors.length,
      data: projectors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single projector
// @route   GET /api/projectors/:id
// @access  Private
export const getProjector = async (req, res) => {
  try {
    const projector = await Projector.findById(req.params.id)
      .populate('currentUser', 'name email designation')
      .populate('lastUsedBy', 'name email designation');

    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    res.status(200).json({
      success: true,
      data: projector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create projector
// @route   POST /api/projectors
// @access  Private (Admin only)
export const createProjector = async (req, res) => {
  try {
    const projector = await Projector.create(req.body);

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: projector._id,
      action: 'created',
      notes: `Created projector: ${projector.name}`
    });

    res.status(201).json({
      success: true,
      message: 'Projector created successfully',
      data: projector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update projector
// @route   PUT /api/projectors/:id
// @access  Private (Admin only)
export const updateProjector = async (req, res) => {
  try {
    const projector = await Projector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: projector._id,
      action: 'updated',
      notes: `Updated projector: ${projector.name}`
    });

    res.status(200).json({
      success: true,
      message: 'Projector updated successfully',
      data: projector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete projector (soft delete)
// @route   DELETE /api/projectors/:id
// @access  Private (Admin only)
export const deleteProjector = async (req, res) => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    if (!req.user || req.user.email.toLowerCase() !== adminEmail) {
      return res.status(403).json({
        success: false,
        message: 'Only the configured administrator can delete projector records'
      });
    }

    const projector = await Projector.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Projector deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check out projector
// @route   POST /api/projectors/:id/checkout
// @access  Private
export const checkOutProjector = async (req, res) => {
  try {
    const projector = await Projector.findById(req.params.id);

    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    if (projector.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: `Projector is currently ${projector.status}`
      });
    }

    // Update projector status
    projector.status = 'checked-out';
    projector.currentUser = req.user.id;
    projector.checkedOutAt = new Date();
    await projector.save();

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: projector._id,
      action: 'check-out',
      notes: req.body.notes || `Checked out ${projector.name}`
    });

    // Populate user data
    await projector.populate('currentUser', 'name email designation');

    // Send check-out notification email
    try {
      // Correct notification: user has checked OUT the projector
      await emailService.sendCheckOutNotification(
        req.user.email,
        req.user.name,
        projector.name
      );
    } catch (emailError) {
      console.error('Failed to send check-out notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Projector checked out successfully',
      data: projector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check in projector
// @route   POST /api/projectors/:id/checkin
// @access  Private
export const checkInProjector = async (req, res) => {
  try {
    const projector = await Projector.findById(req.params.id);

    if (!projector) {
      return res.status(404).json({
        success: false,
        message: 'Projector not found'
      });
    }

    if (projector.status !== 'checked-out') {
      return res.status(400).json({
        success: false,
        message: 'Projector is not checked out'
      });
    }

    // Update projector status
    projector.status = 'available';
    projector.lastUsedBy = projector.currentUser;
    projector.lastUsedAt = new Date();
    projector.currentUser = null;
    projector.checkedOutAt = null;
    await projector.save();

    // Log activity
    await Activity.create({
      user: req.user.id,
      projector: projector._id,
      action: 'check-in',
      notes: req.body.notes || `Checked in ${projector.name}`
    });

    // Populate user data
    await projector.populate('lastUsedBy', 'name email designation');

    // Send check-in notification email
    try {
      // Correct notification: user has checked IN the projector
      await emailService.sendCheckInNotification(
        req.user.email,
        req.user.name,
        projector.name
      );
    } catch (emailError) {
      console.error('Failed to send check-in notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Projector checked in successfully',
      data: projector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
