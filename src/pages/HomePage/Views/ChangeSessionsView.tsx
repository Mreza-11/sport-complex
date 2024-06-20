import React, { useState } from "react";
import { User } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { selectCurrentUser } from "../../../store/authSlice";

import LoadingComponent from "../../../components/LoadingComponent";

const ChangeSessionsView: React.FC = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as User | null;

  const [currentSessionIds, setCurrentSessionIds] = useState(
    currentUser?.availableSessionIds || []
  );

  const handleSaveSessions = async () => {
    if (!currentUser) return;

    console.log("Sessions updated successfully");
  };
  const toggleSessionId = (sessionId: string) => {
    setCurrentSessionIds((prevSessionIds) =>
      prevSessionIds.includes(sessionId)
        ? prevSessionIds.filter((id) => id !== sessionId)
        : [...prevSessionIds, sessionId]
    );
  };
  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">انتخاب جلسات</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>روز</th>
            <th>صبح</th>
            <th>عصر</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td
                className={`p-2 ${
                  currentSessionIds.includes(`${day}-Morning`)
                    ? "bg-green-300"
                    : "bg-white"
                }`}
                onClick={() => toggleSessionId(`${day}-Morning`)}
                style={{ cursor: "pointer" }}
              >
                Morning
              </td>
              <td
                className={`p-2 ${
                  currentSessionIds.includes(`${day}-Afternoon`)
                    ? "bg-green-300"
                    : "bg-white"
                }`}
                onClick={() => toggleSessionId(`${day}-Afternoon`)}
                style={{ cursor: "pointer" }}
              >
                Afternoon
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSaveSessions}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default ChangeSessionsView;
