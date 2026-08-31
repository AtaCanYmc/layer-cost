import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ClayCard: React.FC<ClayCardProps> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`clay-card p-4 sm:p-6 relative overflow-hidden transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
