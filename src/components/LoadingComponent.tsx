import React from "react";

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="spinner border-4 border-t-4 border-gray-200 h-12 w-12 rounded-full animate-spin border-t-blue-500"></div>
      <p className="mt-2 text-gray-500">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
