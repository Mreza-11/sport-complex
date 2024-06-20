// src/components/ErrorComponent.tsx
import React from "react";

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorComponent;
