import {
  Coach,
  GraphLink,
  GraphNode,
  Player,
  Session,
  User,
} from "../../types";

import { shuffleArray } from "../../utils/helpers";

export const isFavoriteCoach = (player: Player, coach: Coach): boolean => {
  return player.favoriteCoachIds.includes(coach.id);
};
export const isSessionIdConsistent = (
  player: Player,
  coach: Coach,
  users: User[]
): boolean => {
  const playerUser = users.find((user) => user.id === player.userId);
  const coachUser = users.find((user) => user.id === coach.userId);

  if (!playerUser || !coachUser) return false;

  return playerUser.availableSessionIds.every((sessionId) =>
    coachUser.availableSessionIds.includes(sessionId)
  );
};

export const resetPlayerAssignments = (
  players: Player[],
  coaches: Coach[]
): { players: Player[]; coaches: Coach[] } => {
  players.forEach((player) => {
    player.coachId = null;
  });

  coaches.forEach((coach) => {
    coach.teamPlayerIds = [];
  });
  return { coaches, players };
};

// بخش اول: تعریف توابع کمکی
const getUserById = (users: User[], userId: string) =>
  users.find((u: User) => u.id === userId);

// بخش دوم: تخصیص رنگ به مربیان و اضافه کردن آن‌ها به nodes
const assignColorsToCoaches = (
  coaches: Coach[],
  nodeColors: string[],
  nodes: GraphNode[],
  coachColors: { [key: string]: string }
) => {
  coaches.forEach((coach, index) => {
    const color = nodeColors[index % nodeColors.length];
    coachColors[coach.id] = color;
    nodes.push({ id: coach.userId, type: "coach", color, x: 0, y: 0 });
  });
};

// بخش سوم: اضافه کردن بازیکنان به nodes
const addPlayersToNodes = (
  players: Player[],
  nodes: GraphNode[],
  coachColors: { [key: string]: string }
) => {
  players.forEach((player) => {
    const color = player.coachId ? coachColors[player.coachId] : "#fff";
    nodes.push({ id: player.userId, type: "player", color, x: 0, y: 0 });
  });
};

// بخش چهارم: ایجاد لینک‌ها بین بازیکنان و مربیان
const createLinks = (
  players: Player[],
  coaches: Coach[],
  users: User[],
  linkColors: string[],
  links: GraphLink[]
) => {
  const notFavoriteLinkColor = linkColors[0];
  const sessionMismatchLinkColor = linkColors[1];
  const allMismatches = linkColors[2];

  players.forEach((player) => {
    const playerUser = getUserById(users, player.userId);
    coaches.forEach((coach) => {
      const coachUser = getUserById(users, coach.userId);

      if (playerUser && coachUser) {
        if (
          !isFavoriteCoach(player, coach) &&
          !isSessionIdConsistent(player, coach, users)
        ) {
          links.push({
            source: player.userId,
            target: coach.userId,
            color: allMismatches,
            description: `Coach ${coach.userId} is not player ${player.userId}'s favorite and ${playerUser.availableSessionIds} from ${player.userId} is not a subset of ${coachUser.availableSessionIds} from ${coach.userId}`,
          });
        } else {
          if (!isFavoriteCoach(player, coach)) {
            links.push({
              source: player.userId,
              target: coach.userId,
              color: notFavoriteLinkColor,
              description: `Coach ${coach.userId} is not player ${player.userId}'s favorite.`,
            });
          }
          if (!isSessionIdConsistent(player, coach, users)) {
            links.push({
              source: player.userId,
              target: coach.userId,
              color: sessionMismatchLinkColor,
              description: `${playerUser.availableSessionIds} from ${player.userId} is not a subset of ${coachUser.availableSessionIds} from ${coach.userId}`,
            });
          }
        }
      }
    });
  });
};

// تابع اصلی createGraph
export const createGraph = (
  players: Player[],
  coaches: Coach[],
  users: User[],
  nodeColors: string[],
  linkColors: string[]
): { nodes: GraphNode[]; links: GraphLink[] } => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const coachColors: { [key: string]: string } = {};

  assignColorsToCoaches(coaches, nodeColors, nodes, coachColors);
  addPlayersToNodes(players, nodes, coachColors);
  createLinks(players, coaches, users, linkColors, links);

  return { nodes, links };
};
export const shuffleFavoriteCoaches = (players: Player[], coaches: Coach[]) => {
  const coachIds = coaches.map((coach) => coach.id);
  const updatedPlayers = players.map((player) => {
    const { shuffledArray: shuffledCoachIds } = shuffleArray(coachIds);
    const shuffledFavorites = shuffledCoachIds.slice(0, 3);
    return {
      ...player,
      favoriteCoachIds: shuffledFavorites,
      coachId: null,
    };
  });
  const updatedCoaches = coaches.map((coach) => ({
    ...coach,
    teamPlayerIds: [],
  }));

  return { updatedPlayers, updatedCoaches };
};

export const shuffleSessionIds = (users: User[]) => {
  const allSessionIds = Array.from({ length: 14 }, (_, i) =>
    (i + 1).toString()
  );

  return users.map((user) => {
    const assignedSessionIds: string[] = [];

    if (user.role === "coach") {
      while (assignedSessionIds.length < 13) {
        const randomSessionId =
          allSessionIds[Math.floor(Math.random() * allSessionIds.length)];
        if (!assignedSessionIds.includes(randomSessionId)) {
          assignedSessionIds.push(randomSessionId);
        }
      }
    } else {
      while (assignedSessionIds.length < 2) {
        const randomSessionId =
          allSessionIds[Math.floor(Math.random() * allSessionIds.length)];
        if (!assignedSessionIds.includes(randomSessionId)) {
          assignedSessionIds.push(randomSessionId);
        }
      }
    }
    return {
      ...user,
      availableSessionIds: assignedSessionIds,
    };
  });
};

export const updateSessions = (users: User[], sessions: Session[]) => {
  const updatedSessions = sessions.map((session) => {
    const availablePlayerIds = users
      .filter((user) => user.availableSessionIds.includes(session.id))
      .map((user) => user.id);

    const availableCoachIds = users
      .filter((user) => user.availableSessionIds.includes(session.id))
      .map((user) => user.id);

    return {
      ...session,
      availablePlayerIds,
      availableCoachIds,
    };
  });

  return updatedSessions;
};
