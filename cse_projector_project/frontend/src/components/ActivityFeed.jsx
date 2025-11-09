import { Clock, User, Monitor, Activity as ActivityIcon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const ActivityFeed = ({ activities }) => {
  const getActionIcon = (action) => {
    const icons = {
      'check-out': '📤',
      'check-in': '📥',
      'booked': '📅',
      'cancelled': '❌',
      'created': '➕',
      'updated': '✏️',
    };
    return icons[action] || '•';
  };

  const getActionColor = (action) => {
    const colors = {
      'check-out': 'text-red-600 bg-red-50',
      'check-in': 'text-green-600 bg-green-50',
      'booked': 'text-yellow-600 bg-yellow-50',
      'cancelled': 'text-gray-600 bg-gray-50',
      'created': 'text-blue-600 bg-blue-50',
      'updated': 'text-purple-600 bg-purple-50',
    };
    return colors[action] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="card sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <ActivityIcon className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </h2>
        <span className="text-sm text-gray-500">{activities.length} events</span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <ActivityIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">No activity yet</p>
            <p className="text-gray-500 text-xs mt-1">
              Be the first to check out a projector
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="border-l-4 border-gray-200 pl-3 pb-3 hover:border-primary transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded text-xs ${getActionColor(activity.action)}`}>
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user?.name || 'Unknown User'}
                  </p>
                  <p className="text-xs text-gray-600 capitalize">
                    {activity.action.replace('-', ' ')} • {activity.projector?.name}
                  </p>
                  {activity.notes && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      "{activity.notes}"
                    </p>
                  )}
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
