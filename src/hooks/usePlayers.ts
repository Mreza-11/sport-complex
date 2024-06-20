import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Player } from "../types";

const fetchPlayers = async () => {
  const response = await axios.get("http://localhost:3000/players");
  return response.data === undefined ? [] : response.data;
};

const createPlayer = async (player: Player) => {
  const response = await axios.post("http://localhost:3000/players", player);
  return response.data;
};

const updatePlayer = async (player: Player) => {
  await axios.put(`http://localhost:3000/players/${player.id}`, player);
};

const updateAllPlayersIndividually = async (players: Player[]) => {
  const maxRetries = 6;

  for (const user of players) {
    let success = false;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await updatePlayer(user);
        success = true;
        break;
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error(
            `Failed to update user ${user.id} after ${maxRetries} attempts`
          );
        }
      }
    }
    if (!success) {
      throw new Error(`Failed to update user ${user.id}`);
    }
  }
};

const removeAllPlayers = async () => {
  await axios.delete("http://localhost:3000/players");
};

export const usePlayers = () => {
  return useQuery<Player[]>("players", fetchPlayers);
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(createPlayer, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePlayer, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};

export const useUpdateAllPlayersIndividually = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAllPlayersIndividually, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};

export const useRemoveAllPlayers = () => {
  const queryClient = useQueryClient();
  return useMutation(removeAllPlayers, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};

const removePlayer = async (id: string) => {
  await axios.delete(`http://localhost:3000/players/${id}`);
};

export const useRemovePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation(removePlayer, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
};
