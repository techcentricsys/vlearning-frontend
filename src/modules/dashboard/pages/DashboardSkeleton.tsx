import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full space-y-6 animate-pulse">
      <div className="h-28 bg-surface-container-high rounded-xl w-full"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-36 bg-surface-container-high rounded-xl"></div>
        ))}
      </div>
      <div className="h-16 bg-surface-container-high rounded-xl w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-surface-container-high rounded-xl"></div>
        <div className="h-80 bg-surface-container-high rounded-xl"></div>
      </div>
    </div>
  );
};