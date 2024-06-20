import React, { useState } from "react";
import PlayersComponent from "./PlayersComponent";
import CoachesComponent from "./CoachesComponent";
import FullDetailsComponent from "./FullDetailsComponent";
import { useCoaches, useRemoveCoach } from "../../hooks/useCoaches";
import { usePlayers, useRemovePlayer } from "../../hooks/usePlayers";
import { Coach, Player } from "../../types";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"players" | "coaches">("players");
  const [selectedUser, setSelectedUser] = useState<Player | Coach | null>(null);

  const {
    data: players,
    isLoading: playersLoading,
    isError: playersError,
    refetch: refetchPlayers,
  } = usePlayers();
  const {
    data: coaches,
    isLoading: coachesLoading,
    isError: coachesError,
    refetch: refetchCoaches,
  } = useCoaches();

  const removePlayerMutation = useRemovePlayer();
  const removeCoachMutation = useRemoveCoach();

  const handleRemovePlayer = async (id: string) => {
    try {
      await removePlayerMutation.mutateAsync(id);
      refetchPlayers();
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const handleRemoveCoach = async (id: string) => {
    try {
      await removeCoachMutation.mutateAsync(id);
      refetchCoaches(); // Refetch coaches after removing one
    } catch (error) {
      console.error("Error removing coach:", error);
    }
  };

  const handleDisplayDetails = (user: Player | Coach) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-5/6 w-screen">
      <div className="flex-1 p-4 border-r border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${
              activeTab === "players" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("players")}
          >
            Players
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "coaches" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("coaches")}
          >
            Coaches
          </button>
        </div>

        {activeTab === "players" && (
          <>
            {playersLoading && <LoadingComponent />}
            {playersError && (
              <ErrorComponent message="Error loading players." />
            )}
            {!playersLoading && !playersError && (
              <PlayersComponent
                players={players || []}
                handleRemovePlayer={handleRemovePlayer}
                handleDisplayDetails={handleDisplayDetails}
              />
            )}
          </>
        )}
        {activeTab === "coaches" && (
          <>
            {coachesLoading && <LoadingComponent />}
            {coachesError && (
              <ErrorComponent message="Error loading coaches." />
            )}
            {!coachesLoading && !coachesError && (
              <CoachesComponent
                coaches={coaches || []}
                handleRemoveCoach={handleRemoveCoach}
                handleDisplayDetails={handleDisplayDetails}
              />
            )}
          </>
        )}
      </div>
      <div className="flex-1 p-4">
        <FullDetailsComponent selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default AdminPanel;
