import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Coach, Request } from "../types";

const CoachRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [availableCoaches, setAvailableCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchAvailableCoaches = async () => {
  //       // Fetch coaches from Firestore (excluding current coach)
  //       const coachesSnapshot = await getDoc(collection(db, "coaches"));
  //       const coachesList: Coach[] = coachesSnapshot.docs
  //         .filter((doc) => doc.id !== currentUser?.uid)
  //         .map((doc) => ({ id: doc.id, ...doc.data() } as Coach));
  //       setAvailableCoaches(coachesList);
  //     };

  //     if (currentUser) {
  //       fetchAvailableCoaches();
  //     }
  //   }, [currentUser]);

  const handleSendRequest = async () => {
    if (!currentUser || !selectedCoach) return;

    const coachRef = doc(db, "coaches", currentUser.uid);
    const coachDoc = await getDoc(coachRef);
    const coachData = coachDoc.data() as Coach;

    if (coachData.requests.length >= 3) {
      console.error("Cannot send more than 3 requests");
      return;
    }

    coachData.requests.push({
      date: new Date().toISOString(),
      destination: selectedCoach,
      source: currentUser.uid,
    });

    await updateDoc(coachRef, { requests: coachData.requests });
    console.log("Request sent successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">درخواست بازی</h2>
      <select
        onChange={(e) => setSelectedCoach(e.target.value)}
        value={selectedCoach || ""}
      >
        <option value="">انتخاب مربی</option>
        {availableCoaches.map((coach) => (
          <option key={coach.id} value={coach.id}>
            {coach.fname}
          </option>
        ))}
      </select>
      <button
        onClick={handleSendRequest}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        ارسال درخواست
      </button>
      <h3 className="text-xl font-bold mt-4">درخواست‌های ارسال شده</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            {request.destination} - {request.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoachRequests;
