
import React, { useEffect } from 'react';

const ActionNotification = ({ actionQueue, setActionQueue }) => {
  useEffect(() => {
    if (actionQueue.length > 0) {
      // Remove the oldest notification after 5 seconds
      const timer = setTimeout(() => {
        setActionQueue(prevQueue => prevQueue.slice(1));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [actionQueue, setActionQueue]);

  if (actionQueue.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {actionQueue.map((action, index) => (
        <div 
          key={index} 
          className="bg-got-darkgray border-l-4 border-got-gold p-4 mb-2 shadow-lg animate-fade-in"
          style={{ 
            animation: 'slideIn 0.3s ease-out forwards',
            opacity: 0,
            transform: 'translateX(100%)',
          }}
        >
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medieval text-got-gold">{action.agent}</p>
              <p className="text-xs text-got-ivory">{action.action}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionNotification;
