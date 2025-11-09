import { useState, useEffect } from 'react';
import { Settings, Plus, BarChart3, Activity, Users } from 'lucide-react';
import { projectorAPI, activityAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import AddProjectorModal from '../components/AddProjectorModal';
import StatsCard from '../components/StatsCard';

const AdminPanel = () => {
  const { user } = useAuth();
  const [projectors, setProjectors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectorsRes, activitiesRes, statsRes] = await Promise.all([
        projectorAPI.getAll(),
        activityAPI.getRecent(100),
        activityAPI.getStats()
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
      setStats(statsRes.data?.data || null);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProjector = async (id) => {
    if (!confirm('Are you sure you want to delete this projector?')) {
      return;
    }

    try {
      // Only admin can delete
      if (user?.role !== 'admin') {
        toast.error('❌ Only admins can delete projectors');
        return;
      }
      
      await projectorAPI.delete(id);
      toast.success('Projector deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete projector');
    }
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchData();
  };

  // Check if user is admin
  if (user?.role !== 'admin') {
    toast.error('Access denied. Admin only.');
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const totalCheckouts = stats?.byAction?.find(s => s._id === 'check-out')?.count || 0;
  const totalCheckins = stats?.byAction?.find(s => s._id === 'check-in')?.count || 0;
  const totalBookings = stats?.byAction?.find(s => s._id === 'booked')?.count || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Settings className="h-8 w-8 text-primary" />
            <span>Admin Panel</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage projectors and view analytics</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Projector</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Activities"
          value={stats?.total || 0}
          icon={<Activity className="h-8 w-8 text-purple-500" />}
          bgColor="from-purple-50 to-purple-100"
          borderColor="border-purple-200"
        />
        <StatsCard
          title="Total In Use"
          value={totalCheckouts}
          icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
          bgColor="from-blue-50 to-blue-100"
          borderColor="border-blue-200"
        />
        <StatsCard
          title="Total Made Available"
          value={totalCheckins}
          icon={<BarChart3 className="h-8 w-8 text-green-500" />}
          bgColor="from-green-50 to-green-100"
          borderColor="border-green-200"
        />
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          icon={<Users className="h-8 w-8 text-yellow-500" />}
          bgColor="from-yellow-50 to-yellow-100"
          borderColor="border-yellow-200"
        />
      </div>

      {/* Projectors Table */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Projectors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand/Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectors.map((projector) => (
                <tr key={projector._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{projector.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {projector.brand} {projector.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      projector.status === 'available' ? 'badge-available' :
                      projector.status === 'in-use' ? 'badge-checked-out' :
                      'badge-booked'
                    }`}>
                      {projector.status === 'in-use' ? 'In Use' : 
                       projector.status.charAt(0).toUpperCase() + projector.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {projector.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleDeleteProjector(projector._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.slice(0, 20).map((activity) => (
                <tr key={activity._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm capitalize">{activity.action}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {activity.projector?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {activity.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(activity.createdAt).toLocaleString('en-US', { 
                      month: '2-digit',
                      day: '2-digit', 
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Projector Modal */}
      {showAddModal && (
        <AddProjectorModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};

export default AdminPanel;
