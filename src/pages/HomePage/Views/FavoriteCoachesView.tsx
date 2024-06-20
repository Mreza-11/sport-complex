import React from "react";
import { Player, Coach, User } from "../../../types";

interface FavoriteCoachesViewProps {
  players: Player[];
  coaches: Coach[];
  users: User[];
}

const FavoriteCoachesView: React.FC<FavoriteCoachesViewProps> = ({
  players,
  coaches,
  users,
}) => {
  const getUserById = (userId: string | undefined): User | undefined => {
    return users.find((c) => c.id === userId);
  };

  const getCoachNameById = (coachId: string) => {
    const coach = coaches.find((c) => c.id === coachId);
    const user = getUserById(coach?.userId);
    return user ? `${user.fName} ${user.lName}` : "Unknown Coach";
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-h-full overflow-y-auto w-4/6">
      <h2 className="text-lg font-bold mb-4">Favorite Coaches</h2>
      <ul className="space-y-4">
        {players.map((player) => {
          const user = getUserById(player.userId);
          return (
            <li key={player.userId} className="p-4 bg-gray-100 rounded shadow">
              <div className="flex items-center space-x-2">
                <span className="font-bold">
                  {user ? `${user.fName} ${user.lName}` : "Unknown Player"}
                </span>
                <span className="text-sm text-gray-600">({player.userId})</span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                Favorite Coaches:{" "}
                {player.favoriteCoachIds.length > 0
                  ? player.favoriteCoachIds
                      .map((coachId) => getCoachNameById(coachId))
                      .join(", ")
                  : "None"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoriteCoachesView;
