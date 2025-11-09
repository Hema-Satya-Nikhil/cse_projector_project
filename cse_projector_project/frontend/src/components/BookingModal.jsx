import { useState } from 'react';
import { X, Calendar, Monitor } from 'lucide-react';
import { bookingAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { format, addHours } from 'date-fns';

const BookingModal = ({ projector, onClose, onSuccess }) => {
  const now = new Date();
  const defaultStart = format(addHours(now, 1), "yyyy-MM-dd'T'HH:mm");
  const defaultEnd = format(addHours(now, 3), "yyyy-MM-dd'T'HH:mm");

  const [formData, setFormData] = useState({
    startTime: defaultStart,
    endTime: defaultEnd,
    purpose: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    
    if (start >= end) {
      toast.error('End time must be after start time');
      return;
    }

    if (start < now) {
      toast.error('Start time cannot be in the past');
      return;
    }

    setLoading(true);

    try {
      await bookingAPI.create({
        projectorId: projector._id,
        ...formData,
      });

      toast.success('Projector booked successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Book Projector</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Projector Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-3">
            <Monitor className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">{projector.name}</p>
              <p className="text-sm text-gray-600">{projector.brand} {projector.model}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="datetime-local"
              name="startTime"
              required
              value={formData.startTime}
              onChange={handleChange}
              min={format(now, "yyyy-MM-dd'T'HH:mm")}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="datetime-local"
              name="endTime"
              required
              value={formData.endTime}
              onChange={handleChange}
              min={formData.startTime}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose *
            </label>
            <input
              type="text"
              name="purpose"
              required
              value={formData.purpose}
              onChange={handleChange}
              placeholder="e.g., Data Structures Lecture, Project Presentation"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Please specify the purpose for using the projector
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional notes (optional)"
              className="input resize-none"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <p className="font-medium">⏰ Booking Duration</p>
            <p className="text-xs mt-1">
              You can book the projector for your required time slot. Make sure to check it out when you arrive.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
