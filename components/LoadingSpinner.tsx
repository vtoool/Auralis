import React from 'react';
import { UniversalLogoIcon } from './Logo';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background">
      <div className="animate-subtle-pulse">
        <UniversalLogoIcon className="h-20 w-20" />
      </div>
      <p className="mt-6 text-sm text-text-secondary tracking-widest uppercase animate-pulse">Loading</p>
    </div>
  );
};

export default LoadingSpinner;
