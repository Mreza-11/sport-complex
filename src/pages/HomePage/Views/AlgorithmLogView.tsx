import React, { useEffect, useState } from "react";

interface AlgorithmLogViewProps {
  logs: string[];
}

const AlgorithmLogView: React.FC<AlgorithmLogViewProps> = ({ logs }) => {
  const [currentLogs, setCurrentLogs] = useState(logs);
  useEffect(() => {
    setCurrentLogs(logs);
  }, [logs]);
  return (
    <div className="p-4 bg-white rounded shadow-md max-h-full overflow-y-auto w-4/6">
      <h2 className="text-lg font-bold mb-4">Algorithm Log</h2>
      <ul className="space-y-2">
        {currentLogs.map((log, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlgorithmLogView;
