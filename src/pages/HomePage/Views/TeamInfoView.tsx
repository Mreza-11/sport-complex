import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { selectCurrentUser } from "../../../store/authSlice";
import { getRoleData, getUserByUserId } from "../../../utils/helpers";
import { Player, Coach, User } from "../../../types";

interface TeamInfoViewProps {
  players: Player[];
  coaches: Coach[];
  users: User[];
}
const TeamInfoView: React.FC<TeamInfoViewProps> = ({
  players,
  coaches,
  users,
}) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as User | null;

  const roleData = getRoleData(
    currentUser.id,
    currentUser.role,
    coaches,
    players
  );

  return (
    <div className="h-5/6 w-screen p-4">
      {currentUser.role === "coach" && roleData ? (
        <div>
          <h1 className="text-2xl font-bold">
            Team: {(roleData as Coach).teamName}
          </h1>
          <h2 className="text-xl mt-4">Coach: {currentUser.fName}</h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Players:</h3>
            <ul className="list-disc list-inside">
              {(roleData as Coach).teamPlayerIds.map((playerId) => {
                const player = players.find((p) => p.id === playerId);
                return player ? (
                  <li key={player.id}>
                    {getUserByUserId(users, player.userId)?.fName}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      ) : currentUser.role === "player" && roleData ? (
        <div>
          <h1 className="text-2xl font-bold">Player: {currentUser.fName}</h1>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Favorite Coaches:</h3>
            <ul className="list-disc list-inside">
              {(roleData as Player).favoriteCoachIds.map((coachId) => {
                const coach = coaches.find((c) => c.id === coachId);
                return coach ? <li key={coach.id}>{coach.teamName}</li> : null;
              })}
            </ul>
          </div>
          {(roleData as Player).coachId && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Current Coach:</h3>
              <div>{(roleData as Player).coachId}</div>
            </div>
          )}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default TeamInfoView;
