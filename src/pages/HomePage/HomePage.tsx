import React from "react";
import PlayersAssignment from "./PlayersAssignment";
import { usePlayers } from "../../hooks/usePlayers";
import { useCoaches } from "../../hooks/useCoaches";
import LoadingComponent from "../../components/LoadingComponent";
import { useUsers } from "../../hooks/useUsers";
import { useSessions } from "../../hooks/useSessions";

const HomePage: React.FC = () => {
  const { data: players, isLoading: playersIsLoading } = usePlayers();
  const { data: coaches, isLoading: coachesIsLoading } = useCoaches();
  const { data: users, isLoading: usersIsLoading } = useUsers();
  const { data: sessions, isLoading: sessionsIsLoading } = useSessions();

  return playersIsLoading ||
    coachesIsLoading ||
    usersIsLoading ||
    sessionsIsLoading ? (
    <LoadingComponent />
  ) : (
    <PlayersAssignment
      players={players}
      coaches={coaches}
      users={users}
      sessions={sessions}
    />
  );
};

export default HomePage;
