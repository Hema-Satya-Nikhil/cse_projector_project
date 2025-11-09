import { useState, useEffect } from 'react';
import { Download, Calendar, Filter, FileText, Clock, User } from 'lucide-react';
import { activityAPI, projectorAPI } from '../utils/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProjectorLogs = () => {
  const [activities, setActivities] = useState([]);
  const [projectors, setProjectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjector, setSelectedProjector] = useState('all');
  const [dateRange, setDateRange] = useState('week'); // week, month, all
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [activities, selectedProjector, dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [activitiesRes, projectorsRes] = await Promise.all([
        activityAPI.getRecent(1000),
        projectorAPI.getAll()
      ]);

      setActivities(activitiesRes.data.activities || []);
      setProjectors(projectorsRes.data.projectors || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load projector logs');
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = [...activities];

    // Filter by projector
    if (selectedProjector !== 'all') {
      filtered = filtered.filter(
        (activity) => activity.projector?._id === selectedProjector
      );
    }

    // Filter by date range
    const now = new Date();
    if (dateRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (activity) => new Date(activity.createdAt) >= weekAgo
      );
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (activity) => new Date(activity.createdAt) >= monthAgo
      );
    }

    setFilteredActivities(filtered);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return { dateStr, timeStr };
  };

  const getActionBadge = (action) => {
    const badges = {
      'check-out': 'bg-blue-100 text-blue-800',
      'check-in': 'bg-green-100 text-green-800',
      'created': 'bg-purple-100 text-purple-800',
      'updated': 'bg-yellow-100 text-yellow-800',
      'deleted': 'bg-red-100 text-red-800',
      'booked': 'bg-indigo-100 text-indigo-800'
    };
    return badges[action] || 'bg-gray-100 text-gray-800';
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('CSE Projector Management - Activity Logs', 14, 20);
    
    // Date range
    doc.setFontSize(11);
    const rangeText = dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 30 Days' : 'All Time';
    doc.text(`Report Period: ${rangeText}`, 14, 28);
    doc.text(`Generated: ${new Date().toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short',
      hour12: true 
    })}`, 14, 34);
    
    // Projector filter
    const projectorName = selectedProjector === 'all' 
      ? 'All Projectors' 
      : projectors.find(p => p._id === selectedProjector)?.name || 'Unknown';
    doc.text(`Projector: ${projectorName}`, 14, 40);
    
    // Table
    const tableData = filteredActivities.map((activity) => {
      const { dateStr, timeStr } = formatDateTime(activity.createdAt);
      return [
        dateStr,
        timeStr,
        activity.projector?.name || 'N/A',
        activity.user?.name || 'N/A',
        activity.action,
        activity.notes || '-'
      ];
    });

    doc.autoTable({
      startY: 48,
      head: [['Date', 'Time', 'Projector', 'User', 'Action', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 22 },
        2: { cellWidth: 35 },
        3: { cellWidth: 30 },
        4: { cellWidth: 22 },
        5: { cellWidth: 'auto' }
      }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(9);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Save
    const fileName = `Projector_Logs_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    toast.success('PDF exported successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projector logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projector Past Logs</h1>
        <p className="text-gray-600">
          View detailed history and download reports of all projector activities
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Projector Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Filter by Projector
              </label>
              <select
                value={selectedProjector}
                onChange={(e) => setSelectedProjector(e.target.value)}
                className="input"
              >
                <option value="all">All Projectors</option>
                {projectors.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.name} - {proj.brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Time Period
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="input"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={exportToPDF}
              className="btn btn-primary flex items-center space-x-2"
              disabled={filteredActivities.length === 0}
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Activities</p>
              <p className="text-2xl font-bold text-blue-900">{filteredActivities.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Check-Outs</p>
              <p className="text-2xl font-bold text-green-900">
                {filteredActivities.filter((a) => a.action === 'check-out').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Check-Ins</p>
              <p className="text-2xl font-bold text-purple-900">
                {filteredActivities.filter((a) => a.action === 'check-in').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="card bg-indigo-50 border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-medium">Bookings</p>
              <p className="text-2xl font-bold text-indigo-900">
                {filteredActivities.filter((a) => a.action === 'booked').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No activities found for the selected filters</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes/Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity) => {
                  const { dateStr, timeStr } = formatDateTime(activity.createdAt);
                  return (
                    <tr key={activity._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="font-medium text-gray-900">{dateStr}</div>
                            <div className="text-gray-500">{timeStr}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {activity.projector?.name || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.projector?.brand}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {activity.user?.name || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {activity.user?.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionBadge(
                            activity.action
                          )}`}
                        >
                          {activity.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md">
                          {activity.notes || '-'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectorLogs;
