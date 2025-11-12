import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Notification } from '../types';

interface NotificationContextType {
  addNotification: (message: string, options?: { type?: Notification['type'], productName?: string, productImage?: string }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// UI component for a single notification item
interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(notification.id), 300); // Wait for animation to finish
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(notification.id), 300); // Match animation duration
  };
  
  const SuccessIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
  );

  return (
    <div
      className={`
        bg-card-background rounded-lg shadow-elegant-lg p-4 flex items-start space-x-4
        transition-all duration-300 ease-in-out transform
        animate-fade-in
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      role="alert"
    >
        {notification.productImage ? (
            <img src={notification.productImage} alt={notification.productName} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
        ) : (
            <div className="flex-shrink-0 pt-1">
                 <SuccessIcon />
            </div>
        )}

      <div className="flex-grow">
        <p className="font-semibold text-primary">{notification.productName || 'Success'}</p>
        <p className="text-sm text-text-secondary">{notification.message}</p>
      </div>
      <button onClick={handleDismiss} className="p-1 rounded-full text-text-secondary hover:bg-border-color flex-shrink-0">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};


// The provider that manages notification state
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, options: { type?: Notification['type'], productName?: string, productImage?: string } = {}) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type: options.type || 'success',
      productName: options.productName,
      productImage: options.productImage,
    };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {/* The container that renders all active notifications */}
      <div aria-live="assertive" className="fixed top-28 right-4 z-[200] w-full max-w-sm space-y-3 pointer-events-none">
        {notifications.map(notification => (
          <div key={notification.id} className="pointer-events-auto">
             <NotificationItem notification={notification} onDismiss={removeNotification} />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook to access the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
