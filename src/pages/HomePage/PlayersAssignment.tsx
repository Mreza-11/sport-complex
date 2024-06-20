import React, { useEffect, useState } from "react";
import {
  performDFS,
  performBT,
  performBTMRV,
  performBTMRVLCV,
} from "./AlgorithmFunctions";
import {
  Player,
  Coach,
  GraphNode,
  GraphLink,
  User,
  Session,
} from "../../types";
import Controls from "./Controls";

//views
import GraphView from "./Views/GraphView";
import WeeklyTableView from "./Views/WeeklyTableView"; // Import the new component

import { toast } from "react-toastify";

import {
  createGraph,
  resetPlayerAssignments,
  shuffleFavoriteCoaches as shuffleFavoriteCoachesHelper,
  shuffleSessionIds as shuffleSessionIdsHelper,
  updateSessions,
} from "./helperFunctions";
import useColors from "../../hooks/useColors";

import FavoriteCoachesView from "./Views/FavoriteCoachesView";
import AlgorithmLogView from "./Views/AlgorithmLogView";
import TeamInfo from "./Views/TeamInfoView";
import ViewPanel from "./ViewPanel";
import ChangeSessionsView from "./Views/ChangeSessionsView";
import ChangeCoachesView from "./Views/ChangeCoachesView";

interface PlayersAssignmentProps {
  players: Player[] | undefined;
  coaches: Coach[] | undefined;
  users: User[] | undefined;
  sessions: Session[] | undefined;
}
const PlayersAssignment: React.FC<PlayersAssignmentProps> = ({
  players: initialPlayers,
  coaches: initialCoaches,
  users: initialUsers,
  sessions: initialSessions,
}) => {
  //Local States
  const [players, setPlayers] = useState<Player[]>(
    initialPlayers === undefined ? [] : initialPlayers
  );
  const [coaches, setCoaches] = useState<Coach[]>(
    initialCoaches === undefined ? [] : initialCoaches
  );
  const [users, setUsers] = useState<User[]>(
    initialUsers === undefined ? [] : initialUsers
  );
  const [sessions, setSessions] = useState<Session[]>(
    initialSessions === undefined ? [] : initialSessions
  );

  // Add state for algorithm logs
  const [algorithmLogs, setAlgorithmLogs] = useState<string[]>([]);
  // Add state for showing steps
  const [showSteps, setShowSteps] = useState(false);
  // Add state for current view
  const [view, setView] = useState("graph");

  const [graphData, setGraphData] = useState<{
    nodes: GraphNode[];
    links: GraphLink[];
  }>({ nodes: [], links: [] });

  const { linkColors, nodeColors, shuffleColors } = useColors(); // Use the color hook

  const updateGraph = (players: Player[], coaches: Coach[]) => {
    const { nodes, links } = createGraph(
      players,
      coaches,
      users,
      nodeColors,
      linkColors
    );
    setGraphData({ nodes, links });
  };
  useEffect(() => {
    updateGraph(players, coaches);
  }, [coaches, players, nodeColors]);
  const handleAlgorithm = async (algorithm: string) => {
    let steps = 0;
    let success = false;
    let updatedPlayers: Player[] = [];
    const delay = showSteps ? 2000 : 0;

    setAlgorithmLogs([]); // Clear logs before starting the algorithm

    const logStep = (message: string) => {
      setAlgorithmLogs((prevLogs) => [...prevLogs, message]);
    };

    switch (algorithm) {
      case "DFS":
        ({ steps, success, updatedPlayers } = await performDFS(
          players,
          coaches,
          users,
          showSteps
            ? (players, coaches) => {
                updateGraph(players, coaches);
                logStep(`Step ${steps}: Updated graph with current state`);
              }
            : () => {},
          delay,
          logStep
        ));
        break;
      case "BT":
        ({ steps, success, updatedPlayers } = await performBT(
          players,
          coaches,
          users,
          showSteps
            ? (players, coaches) => {
                updateGraph(players, coaches);
                logStep(`Step ${steps}: Updated graph with current state`);
              }
            : () => {},
          delay,
          logStep
        ));
        break;
      case "BT + MRV":
        ({ steps, success, updatedPlayers } = await performBTMRV(
          players,
          coaches,
          users,
          showSteps
            ? (players, coaches) => {
                updateGraph(players, coaches);
                logStep(`Step ${steps}: Updated graph with current state`);
              }
            : () => {},
          delay,
          logStep
        ));
        break;
      case "BT + MRV + LCV":
        ({ steps, success, updatedPlayers } = await performBTMRVLCV(
          players,
          coaches,
          users,
          showSteps
            ? (players, coaches) => {
                updateGraph(players, coaches);
                logStep(`Step ${steps}: Updated graph with current state`);
              }
            : () => {},
          delay,
          logStep
        ));
        break;
      default:
        toast.error("Unknown algorithm");
        return;
    }

    if (success) {
      toast.success(`Algorithm ${algorithm} completed in ${steps} steps.`);
      setPlayers(updatedPlayers);
      updateGraph(updatedPlayers, coaches);
    } else {
      toast.error(
        `Algorithm ${algorithm} failed to find a solution in ${steps} steps.`
      );
    }
  };

  const shuffleFavoriteCoaches = () => {
    const { updatedPlayers, updatedCoaches } = shuffleFavoriteCoachesHelper(
      players,
      coaches
    );
    setPlayers(updatedPlayers);
    setCoaches(updatedCoaches);
    updateGraph(updatedPlayers, updatedCoaches);
  };
  const shuffleSessionIds = () => {
    const updatedUsers = shuffleSessionIdsHelper(users);
    const { players: newPlayers, coaches: newCoaches } = resetPlayerAssignments(
      players,
      coaches
    );
    const newSessions = sessions.map((s) => {
      const newAvailableCoaches: string[] = [];
      const newAvailablePlayers: string[] = [];
      updatedUsers.forEach((user) => {
        if (user.availableSessionIds.includes(s.id))
          if (user.role == "coach") newAvailableCoaches.push(user.id);
          else newAvailablePlayers.push(user.id);
      });
      return {
        ...s,
        availableCoachIds: newAvailableCoaches,
        availablePlayerIds: newAvailablePlayers,
      };
    });

    setUsers(updatedUsers);
    setSessions(newSessions);
    setPlayers(newPlayers);
    setCoaches(newCoaches);
    const updatedSessions = updateSessions(updatedUsers, sessions); // Update sessions
    setSessions(updatedSessions);
    updateGraph(newPlayers, newCoaches);
  };
  const handleReset = () => {
    const { players: newPlayers, coaches: newCoaches } = resetPlayerAssignments(
      players,
      coaches
    );
    setPlayers(newPlayers);
    setCoaches(newCoaches);
    updateGraph(newPlayers, newCoaches);
  };

  const setNewView = (newView: string) => {
    setView(newView);
  };
  return (
    <div className="flex flex-row justify-start h-5/6 w-full">
      <Controls
        postToDatabase={() => {}}
        handleAlgorithm={handleAlgorithm}
        shuffleFavoriteCoaches={shuffleFavoriteCoaches}
        shuffleSessionIds={shuffleSessionIds}
        handleReset={handleReset}
        showSteps={showSteps}
        setShowSteps={setShowSteps}
      />
      {view === "graph" && (
        <GraphView nodes={graphData.nodes} links={graphData.links} />
      )}{" "}
      {view === "assignment" && (
        <WeeklyTableView
          users={users}
          sessions={sessions}
          nodeColors={nodeColors}
          players={players}
        />
      )}
      {view === "favoriteCoaches" && (
        <FavoriteCoachesView
          players={players}
          coaches={coaches}
          users={users}
        />
      )}
      {view === "algorithmLog" && <AlgorithmLogView logs={algorithmLogs} />}
      {view === "teamInfo" && (
        <TeamInfo players={players} coaches={coaches} users={users} />
      )}
      {view === "changeSessions" && <ChangeSessionsView />}
      {view === "changeCoaches" && <ChangeCoachesView />}
      <ViewPanel shuffleColors={shuffleColors} setNewView={setNewView} />
    </div>
  );
};

export default PlayersAssignment;
