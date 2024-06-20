import React from "react";
import { Coach } from "../../types";

interface CoachesComponentProps {
  coaches: Coach[];
  handleRemoveCoach: (id: string) => void;
  handleDisplayDetails: (coach: Coach) => void;
}

const CoachesComponent: React.FC<CoachesComponentProps> = ({
  coaches,
  handleRemoveCoach,
  handleDisplayDetails,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Coaches</h2>
    <ul className="space-y-2">
      {coaches.map((coach) => (
        <li
          key={coach.id}
          className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-sm"
        >
          <span className="font-medium">{coach.id}</span>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => handleRemoveCoach(coach.id)}
            >
              Remove
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleDisplayDetails(coach)}
            >
              Display details
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CoachesComponent;
