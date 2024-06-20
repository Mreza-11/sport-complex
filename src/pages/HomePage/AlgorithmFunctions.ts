import { Coach, Player, User } from "../../types";
import { getUserByUserId } from "../../utils/helpers";
import {
  isFavoriteCoach,
  isSessionIdConsistent,
  resetPlayerAssignments,
} from "./helperFunctions";

export const performDFS = (
  previousPlayers: Player[],
  previousCoaches: Coach[],
  users: User[],
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay = 0,
  logCallback: (log: string) => void
) => {
  logCallback("Starting DFS algorithm...");
  const { players, coaches } = resetPlayerAssignments(
    previousPlayers,
    previousCoaches
  );

  let steps = 0;
  const stack: Player[] = [...players];
  const visited = new Set<string>();
  let success = false;

  const stepExecution = async () => {
    while (stack.length) {
      const player = stack.pop();
      logCallback(`Player ${player?.id} popped from stack.`);
      if (!player || visited.has(player.id)) continue;
      visited.add(player.id);
      steps++;

      for (const coach of coaches) {
        if (
          isFavoriteCoach(player, coach) &&
          isSessionIdConsistent(player, coach, users) &&
          coach.teamPlayerIds.length < 6
        ) {
          player.coachId = coach.id;
          coach.teamPlayerIds.push(player.id);
          success = true;
          logCallback(`Assigned player ${player.id} to coach ${coach.id}.`);
          break;
        }
      }

      if (!player.coachId) {
        logCallback(`Failed to assign player ${player.id}.`);
        success = false; // Player could not be assigned
      }

      stack.push(...players.filter((p) => !visited.has(p.id)));

      if (stepCallback) {
        stepCallback(players, coaches);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    players.forEach((p) => {
      if (p.coachId === null) success = false;
    });
    logCallback(`DFS algorithm completed with ${steps} steps.`);
    return { steps, success, updatedPlayers: players };
  };

  return stepExecution();
};

export const performBT = (
  previousPlayers: Player[],
  previousCoaches: Coach[],
  users: User[],
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay = 0,
  logCallback: (log: string) => void
) => {
  logCallback("Starting Backtracking algorithm...");
  const { players, coaches } = resetPlayerAssignments(
    previousPlayers,
    previousCoaches
  );
  const steps = { count: 0 };

  const stepExecution = async () => {
    let success = await asyncBacktracking(
      players,
      coaches,
      users,
      0,
      steps,
      stepCallback,
      delay,
      logCallback
    );
    players.forEach((p) => {
      if (p.coachId === null) success = false;
    });

    logCallback(`Backtracking algorithm completed with ${steps.count} steps.`);
    return { steps: steps.count, success, updatedPlayers: players };
  };

  return stepExecution();
};

const asyncBacktracking = async (
  players: Player[],
  coaches: Coach[],
  users: User[],
  index: number,
  steps: { count: number },
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay: number,
  logCallback: (log: string) => void
): Promise<boolean> => {
  if (index === players.length) return true;

  const player = players[index];
  const playerName = getUserByUserId(users, player.userId)?.fName;
  logCallback(`Trying to assign player ${playerName} (ID: ${player.id})`);

  for (const coach of coaches) {
    //checking conflicts
    const coachName = getUserByUserId(users, coach.userId)?.fName;
    const isFav = isFavoriteCoach(player, coach);
    const isConsistent = isSessionIdConsistent(player, coach, users);
    const isCoachFull = coach.teamPlayerIds.length < 6;

    logCallback(
      `${coachName} is ${!isFav ? `not` : ""} ${playerName}'s favorite coach.`
    );
    logCallback(
      `${coachName}'s available sessions is ${
        !isConsistent ? `not` : ""
      } ${playerName}'s available sessions' superset.`
    );
    logCallback(
      `${coachName}'s team is ${!isCoachFull ? `not` : ""} full. it has ${
        coach.teamPlayerIds.length
      } players`
    );

    if (isFav && isConsistent && isCoachFull) {
      player.coachId = coach.id;
      coach.teamPlayerIds.push(player.id);
      steps.count++;
      logCallback(
        `Assigned player ${playerName} (ID: ${player.id}) to coach ${coachName} (ID: ${coach.id})`
      );

      if (stepCallback) {
        stepCallback(players, coaches);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      if (
        await asyncBacktracking(
          players,
          coaches,
          users,
          index + 1,
          steps,
          stepCallback,
          delay,
          logCallback
        )
      )
        return true;

      player.coachId = null;
      coach.teamPlayerIds.pop();
      logCallback(
        `Backtracking: unassigned player ${playerName} (ID: ${player.id}) from coach ${coachName} (ID: ${coach.id})`
      );
    }
  }

  steps.count++;
  return false;
};

export const performBTMRV = (
  previousPlayers: Player[],
  previousCoaches: Coach[],
  users: User[],
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay = 0,
  logCallback: (log: string) => void
) => {
  logCallback("Starting Backtracking + MRV algorithm...");
  const { players, coaches } = resetPlayerAssignments(
    previousPlayers,
    previousCoaches
  );
  const steps = { count: 0 };

  const stepExecution = async () => {
    let success = await asyncMRV(
      players,
      coaches,
      users,
      0,
      steps,
      stepCallback,
      delay,
      logCallback
    );
    players.forEach((p) => {
      if (p.coachId === null) success = false;
    });
    logCallback(
      `Backtracking + MRV algorithm completed with ${steps.count} steps.`
    );
    return { steps: steps.count, success, updatedPlayers: players };
  };

  return stepExecution();
};

const asyncMRV = async (
  players: Player[],
  coaches: Coach[],
  users: User[],
  index: number,
  steps: { count: number },
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay: number,
  logCallback: (log: string) => void
): Promise<boolean> => {
  if (index === players.length) return true;

  const player = players[index];
  const playerName = getUserByUserId(users, player.userId)?.fName;
  logCallback(
    `Trying to assign player ${playerName} (ID: ${player.id}) using MRV`
  );

  const sortedCoaches = player.favoriteCoachIds
    .map((coachId) => coaches.find((c) => c?.id === coachId))
    .filter(
      (coach): coach is Coach =>
        !!coach &&
        isSessionIdConsistent(player, coach, users) &&
        coach.teamPlayerIds.length < 6
    )
    .sort((a, b) => a.teamPlayerIds.length - b.teamPlayerIds.length);

  for (const coach of sortedCoaches) {
    const coachName = getUserByUserId(users, coach.userId)?.fName;
    player.coachId = coach.id;
    coach.teamPlayerIds.push(player.id);
    steps.count++;
    logCallback(
      `Assigned player ${playerName} (ID: ${player.id}) to coach ${coachName} (ID: ${coach.id}) using MRV`
    );

    if (stepCallback) {
      stepCallback(players, coaches);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (
      await asyncMRV(
        players,
        coaches,
        users,
        index + 1,
        steps,
        stepCallback,
        delay,
        logCallback
      )
    )
      return true;

    player.coachId = null;
    coach.teamPlayerIds.pop();
    logCallback(
      `Backtracking: unassigned player ${playerName} (ID: ${player.id}) from coach ${coachName} (ID: ${coach.id}) using MRV`
    );
  }

  steps.count++;
  return false;
};

export const performBTMRVLCV = (
  previousPlayers: Player[],
  previousCoaches: Coach[],
  users: User[],
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay = 0,
  logCallback: (log: string) => void
) => {
  logCallback("Starting Backtracking + MRV + LCV algorithm...");
  const { players, coaches } = resetPlayerAssignments(
    previousPlayers,
    previousCoaches
  );
  const steps = { count: 0 };

  const stepExecution = async () => {
    let success = await asyncMRVLCV(
      players,
      coaches,
      users,
      0,
      steps,
      stepCallback,
      delay,
      logCallback
    );
    players.forEach((p) => {
      if (p.coachId === null) success = false;
    });
    logCallback(
      `Backtracking + MRV + LCV algorithm completed with ${steps.count} steps.`
    );
    return { steps: steps.count, success, updatedPlayers: players };
  };

  return stepExecution();
};

const asyncMRVLCV = async (
  players: Player[],
  coaches: Coach[],
  users: User[],
  index: number,
  steps: { count: number },
  stepCallback: (players: Player[], coaches: Coach[]) => void,
  delay: number,
  logCallback: (log: string) => void
): Promise<boolean> => {
  if (index === players.length) return true;

  const player = players[index];
  const playerName = getUserByUserId(users, player.userId)?.fName;
  logCallback(
    `Trying to assign player ${playerName} (ID: ${player.id}) using MRV + LCV`
  );

  const sortedCoaches = player.favoriteCoachIds
    .map((coachId) => coaches.find((c) => c?.id === coachId))
    .filter(
      (coach): coach is Coach =>
        !!coach &&
        isSessionIdConsistent(player, coach, users) &&
        coach.teamPlayerIds.length < 6
    )
    .sort(
      (a, b) =>
        players.filter((p) => p.favoriteCoachIds.includes(a.id)).length -
        players.filter((p) => p.favoriteCoachIds.includes(b.id)).length
    );

  for (const coach of sortedCoaches) {
    //Checking Conflicts
    const coachName = getUserByUserId(users, coach.userId)?.fName;
    player.coachId = coach.id;
    coach.teamPlayerIds.push(player.id);
    steps.count++;
    logCallback(
      `Assigned player ${playerName} (ID: ${player.id}) to coach ${coachName} (ID: ${coach.id}) using MRV + LCV`
    );

    if (stepCallback) {
      stepCallback(players, coaches);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (
      await asyncMRVLCV(
        players,
        coaches,
        users,
        index + 1,
        steps,
        stepCallback,
        delay,
        logCallback
      )
    )
      return true;

    player.coachId = null;
    coach.teamPlayerIds.pop();
    logCallback(
      `Backtracking: unassigned player ${playerName} (ID: ${player.id}) from coach ${coachName} (ID: ${coach.id}) using MRV + LCV`
    );
  }

  steps.count++;
  return false;
};
