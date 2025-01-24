import React from 'react';

interface ReservationContainerProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function ReservationContainer({children, onClose}: ReservationContainerProps) {
  const handleContainerClick = (e: React.MouseEvent) => {
    onClose?.();
    e.stopPropagation();
  };

  return (
    <div onClick={handleContainerClick} className="absolute inset-0 z-50 flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
