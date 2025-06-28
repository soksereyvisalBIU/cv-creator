// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-10 h-10 bg-blue-600 text-white rounded-[50%] transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;