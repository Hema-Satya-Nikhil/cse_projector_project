import { useState, useEffect } from 'react';
import { Monitor, Clock, User, Search, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { projectorAPI, activityAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ProjectorCard from '../components/ProjectorCard';
import ActivityFeed from '../components/ActivityFeed';
import BookingModal from '../components/BookingModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [projectors, setProjectors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProjector, setSelectedProjector] = useState(null);

  useEffect(() => {
    fetchData();
    
    // Refresh every 10 seconds
    const interval = setInterval(() => {
      fetchData(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [projectorsRes, activitiesRes] = await Promise.all([
        projectorAPI.getAll(),
        activityAPI.getRecent(50)
      ]);

      const mappedProjectors = (projectorsRes.data?.data || []).map((projector) => ({
        ...projector,
        status: projector.status === 'checked-out' ? 'in-use' : projector.status
      }));

      const mappedActivities = (activitiesRes.data?.data || []).map((activity) => ({
        ...activity,
        status: activity.status === 'checked-out' ? 'in-use' : activity.status
      }));

      setProjectors(mappedProjectors);
      setActivities(mappedActivities);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!silent) {
        toast.error('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (projectorId, notes, username) => {
    try {
      await projectorAPI.checkOut(projectorId, { notes, username });
      toast.success('Projector marked as in use successfully');
      fetchData(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to check out projector');
    }
  };

  const handleCheckIn = async (projectorId, notes) => {
    try {
      await projectorAPI.checkIn(projectorId, notes);
      toast.success('Projector checked in successfully');
      fetchData(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to check in projector');
    }
  };

  const handleBookClick = (projector) => {
    setSelectedProjector(projector);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    setSelectedProjector(null);
    fetchData(true);
  };

  const filteredProjectors = projectors.filter((projector) => {
    const matchesSearch = projector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projector.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || projector.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projectors.length,
    available: projectors.filter(p => p.status === 'available').length,
    checkedOut: projectors.filter(p => p.status === 'in-use' || p.status === 'checked-out').length,
    booked: projectors.filter(p => p.status === 'booked').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projector Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and track all department projectors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Projectors</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <Monitor className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Available</p>
              <p className="text-3xl font-bold text-green-900">{stats.available}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">In Use</p>
              <p className="text-3xl font-bold text-red-900">{stats.checkedOut}</p>
            </div>
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Booked</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.booked}</p>
            </div>
            <Calendar className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projectors Section */}
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input sm:w-48"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          {/* Projectors Grid */}
          <div className="space-y-4">
            {filteredProjectors.length === 0 ? (
              <div className="card text-center py-12">
                <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No projectors found</p>
              </div>
            ) : (
              filteredProjectors.map((projector) => (
                <ProjectorCard
                  key={projector._id}
                  projector={projector}
                  onCheckOut={handleCheckOut}
                  onCheckIn={handleCheckIn}
                  onBook={handleBookClick}
                />
              ))
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          projector={selectedProjector}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedProjector(null);
          }}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
