import React from 'react';

interface NotificationPanelProps {
  notifications: { id: number; message: string; type?: 'critical' | 'info' }[];
  loading?: boolean;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, loading }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg z-50">
      <div className="p-4 border-b border-border font-semibold text-foreground">
        Notifications
      </div>
      <div className="max-h-64 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">No notifications.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 text-sm border-b border-border last:border-b-0 ${
                n.type === 'critical' ? 'bg-red-50 text-red-700' : ''
              }`}
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};