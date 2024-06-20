import React from "react";
import { Player } from "../../types";

interface PlayersComponentProps {
  players: Player[];
  handleRemovePlayer: (id: string) => void;
  handleDisplayDetails: (player: Player) => void;
}

const PlayersComponent: React.FC<PlayersComponentProps> = ({
  players,
  handleRemovePlayer,
  handleDisplayDetails,
}) => (
  <div className="overflow-y-scroll">
    <h2 className="text-xl font-semibold mb-4">Players</h2>
    <ul className="space-y-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-medium">{player.id}</span>
            <span>{player.coachId}</span>
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => handleRemovePlayer(player.id)}
            >
              Remove
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleDisplayDetails(player)}
            >
              More Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default PlayersComponent;
