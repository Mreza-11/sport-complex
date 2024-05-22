import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Session } from "../types";

const ChangeSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(
    Array(7).fill({ day: "", morning: false, afternoon: false })
  );
  const { currentUser } = useAuth();

  const handleSessionChange = (
    dayIndex: number,
    session: "morning" | "afternoon"
  ) => {
    const newSessions = [...sessions];
    newSessions[dayIndex][session] = !newSessions[dayIndex][session];
    setSessions(newSessions);
  };

  const handleSaveSessions = async () => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { sessions });
    console.log("Sessions updated successfully");
  };

  return (
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
          {[
            "شنبه",
            "یکشنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنج‌شنبه",
            "جمعه",
          ].map((day, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td
                className={`p-2 cursor-pointer ${
                  sessions[index].morning ? "bg-blue-200" : "bg-gray-100"
                }`}
                onClick={() => handleSessionChange(index, "morning")}
              ></td>
              <td
                className={`p-2 cursor-pointer ${
                  sessions[index].afternoon ? "bg-blue-200" : "bg-gray-100"
                }`}
                onClick={() => handleSessionChange(index, "afternoon")}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSaveSessions}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        ذخیره جلسات
      </button>
    </div>
  );
};

export default ChangeSessions;
