import { Coach, Player, User } from "../types";

export const shuffleArray = (array: any[]): { shuffledArray: any[] } => {
  const shuffledArray = array;
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return { shuffledArray };
};

export const getUserByUserId = (
  users: User[],
  userId: string
): User | undefined => {
  return users.find((u) => u.id == userId);
};

export const getRoleData = (
  userId: string,
  role: string,
  coaches: Coach[],
  players: Player[]
): Player | undefined | Coach => {
  return role == "coach"
    ? coaches.find((c) => c.userId == userId)
    : players.find((c) => c.userId == userId);
};
