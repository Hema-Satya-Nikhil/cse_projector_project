import { useState } from 'react';
import { Monitor, User, Clock, MapPin, LogOut, LogIn, Calendar, ChevronDown, ChevronUp, History } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const ProjectorCard = ({ projector, onCheckOut, onCheckIn, onBook }) => {
  const { user } = useAuth();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [username, setUsername] = useState('');
  const [action, setAction] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const getStatusBadge = (status) => {
    const badges = {
      'available': { class: 'badge-available', text: 'Available', icon: '🟢' },
      'in-use': { class: 'badge-checked-out', text: 'In Use', icon: '🔴' },
      'booked': { class: 'badge-booked', text: 'Booked', icon: '🟡' },
      'maintenance': { class: 'badge-maintenance', text: 'Maintenance', icon: '🔧' },
    };
    const badge = badges[status] || badges['available'];
    return (
      <span className={`badge ${badge.class}`}>
        {badge.icon} {badge.text}
      </span>
    );
  };

  const handleActionClick = (actionType) => {
    setAction(actionType);
    setShowNoteInput(true);
  };

  const handleConfirm = () => {
    if (action === 'checkout') {
      onCheckOut(projector._id, note, username);
    } else if (action === 'checkin') {
      onCheckIn(projector._id, note);
    }
    setShowNoteInput(false);
    setNote('');
    setUsername('');
    setAction('');
  };

  const handleCancel = () => {
    setShowNoteInput(false);
    setNote('');
    setUsername('');
    setAction('');
  };

  const canCheckOut = projector.status === 'available';
  const canCheckIn = projector.status === 'in-use' && 
                     projector.currentUser?.email === user?.email;

  return (
    <div className="card hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Projector Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{projector.name}</h3>
                <p className="text-sm text-gray-600">{projector.brand} {projector.model}</p>
              </div>
            </div>
            {getStatusBadge(projector.status)}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            {projector.specifications && (
              <div className="text-gray-600">
                <p><strong>Resolution:</strong> {projector.specifications.resolution}</p>
                <p><strong>Brightness:</strong> {projector.specifications.brightness}</p>
              </div>
            )}

            {projector.currentUser && (
              <div className="flex items-center space-x-2 text-gray-700 bg-red-50 p-2 rounded">
                <User className="h-4 w-4 text-red-600" />
                <span><strong>Current User:</strong> {projector.currentUser.name} ({projector.currentUser.email})</span>
              </div>
            )}

            {projector.lastUsedBy && !projector.currentUser && (
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span><strong>Last Used By:</strong> {projector.lastUsedBy.name}</span>
              </div>
            )}

            {projector.location && (
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{projector.location}</span>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary-dark transition"
            >
              <History className="h-4 w-4" />
              <span>History {projector.history?.length > 0 ? `(${projector.history.length})` : ''}</span>
              {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {showHistory && projector.history && projector.history.length > 0 && (
              <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded">
                {projector.history.map((entry, idx) => (
                  <div key={idx} className="text-xs border-l-2 border-primary pl-2">
                    <p className="font-semibold text-gray-900 capitalize">
                      {entry.action} - {entry.status}
                    </p>
                    <p className="text-gray-600">{entry.user}</p>
                    {entry.notes && <p className="text-gray-600 italic">{entry.notes}</p>}
                    <p className="text-gray-500">
                      {format(new Date(entry.timestamp), 'MMM dd, yyyy h:mm a')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex md:flex-col gap-2">
          {!showNoteInput ? (
            <>
              {canCheckOut && (
                <button
                  onClick={() => handleActionClick('checkout')}
                  className="btn btn-primary flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Mark In Use</span>
                </button>
              )}

              {canCheckIn && (
                <button
                  onClick={() => handleActionClick('checkin')}
                  className="btn bg-green-600 text-white hover:bg-green-700 flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Mark Available</span>
                </button>
              )}

              {projector.status === 'available' && (
                <button
                  onClick={() => onBook(projector)}
                  className="btn btn-secondary flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book</span>
                </button>
              )}
            </>
          ) : (
            <div className="space-y-2 min-w-[200px]">
              {action === 'checkout' && (
                <input
                  type="text"
                  placeholder="Your name *"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input text-sm"
                  required
                  autoFocus
                />
              )}
              <input
                type="text"
                placeholder="Purpose/Notes (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  disabled={action === 'checkout' && !username.trim()}
                  className="btn btn-primary text-sm flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary text-sm flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectorCard;
