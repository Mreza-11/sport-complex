import React, { useState } from "react";
import { User, Session, Player } from "../../../types";

interface WeeklyTableViewProps {
  players: Player[];
  users: User[];
  sessions: Session[];
  nodeColors: string[];
}

const WeeklyTableView: React.FC<WeeklyTableViewProps> = ({
  players,
  users,
  sessions,
  nodeColors,
}) => {
  const getPlayer = (id: string): Player | undefined => {
    return players.find((p) => p.userId == id);
  };
  const getParticipantDetails = (
    ids: string[],
    role: string
  ): { name: string; color: string }[] => {
    return users
      .filter(
        (participant) =>
          ids.includes(participant.id) && participant.role === role
      )
      .map((user) => {
        let userColor = "";
        const userCoachId = getPlayer(user.id)?.coachId;
        if (user.role == "coach") userColor = nodeColors[parseInt(user.id)];
        else
          userColor =
            userCoachId === null || userCoachId === undefined
              ? "#808080"
              : nodeColors[parseInt(userCoachId)];
        return { name: user.fName, color: userColor };
      });
  };
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleMouseEnter = (name: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleMouseLeave = (name: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleClick = (name: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-5/6 bg-gray-800 p-2 flex flex-col justify-around h-full">
      <table className="min-w-full bg-white border-collapse block md:table w-full">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
            {daysOfWeek.map((day) => (
              <th
                className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
                key={day}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {["Morning", "Afternoon"].map((timeOfDay, index) => (
            <tr
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
              key={index}
            >
              <td className="p-1 md:border md:border-grey-500 text-left block md:table-cell">
                {timeOfDay}
              </td>
              {daysOfWeek.map((day) => {
                const isMorning = timeOfDay === "Morning";
                const session = sessions.find(
                  (s) => s.day === day && s.isMorning === isMorning
                );
                const playerNames = getParticipantDetails(
                  session?.availablePlayerIds || [],
                  "player"
                );
                const coachNames = getParticipantDetails(
                  session?.availableCoachIds || [],
                  "coach"
                );

                const totalParticipants =
                  (session?.availablePlayerIds.length || 0) +
                  (session?.availableCoachIds.length || 0);
                const textSizeClass =
                  totalParticipants > 7
                    ? totalParticipants > 10
                      ? "text-xs"
                      : "text-sm"
                    : "text-base";

                return (
                  <td
                    className={`p-2 md:border md:border-grey-500 text-left block md:table-cell  ${textSizeClass}`}
                    key={day}
                  >
                    <div>
                      <strong>Players:</strong>
                      <ul>
                        {playerNames.map((name, index) => (
                          <li
                            key={index}
                            style={{
                              color: selectedItems[name.name]
                                ? name.color
                                : "black",
                              backgroundColor: selectedItems[name.name]
                                ? "transparent"
                                : name.color,
                              cursor: "pointer",
                              transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={() => handleMouseEnter(name.name)}
                            onMouseLeave={() => handleMouseLeave(name.name)}
                            onClick={() => handleClick(name.name)}
                          >
                            {name.name}
                          </li>
                        ))}
                      </ul>
                      <strong>Coaches:</strong>
                      <ul>
                        {coachNames.map((name, index) => (
                          <li
                            key={index}
                            style={{
                              color: selectedItems[name.name]
                                ? name.color
                                : "black",
                              backgroundColor: selectedItems[name.name]
                                ? "transparent"
                                : name.color,
                              cursor: "pointer",
                              transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={() => handleMouseEnter(name.name)}
                            onMouseLeave={() => handleMouseLeave(name.name)}
                            onClick={() => handleClick(name.name)}
                          >
                            {name.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTableView;
