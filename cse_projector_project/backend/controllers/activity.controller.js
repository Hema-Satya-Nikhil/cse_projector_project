import Activity from '../models/Activity.model.js';
import * as emailService from '../services/email.service.js';

// @desc    Get recent activities
// @route   GET /api/activities/recent
// @access  Private
export const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const activities = await Activity.find()
      .populate('user', 'name email designation')
      .populate('projector', 'name brand')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get activities for a specific projector
// @route   GET /api/activities/projector/:projectorId
// @access  Private
export const getProjectorActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ projector: req.params.projectorId })
      .populate('user', 'name email designation')
      .populate('projector', 'name brand')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get activities for a specific user
// @route   GET /api/activities/user/:userId
// @access  Private
export const getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .populate('user', 'name email designation')
      .populate('projector', 'name brand')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get activity statistics
// @route   GET /api/activities/stats
// @access  Private (Admin only)
export const getActivityStats = async (req, res) => {
  try {
    const totalActivities = await Activity.countDocuments();
    
    const actionStats = await Activity.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentStats = await Activity.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalActivities,
        byAction: actionStats,
        last7Days: recentStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
