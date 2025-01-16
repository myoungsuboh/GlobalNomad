'use client';
import React from 'react';

interface ButtonType {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({className = '', type = 'button', children, onClick}: ButtonType) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
