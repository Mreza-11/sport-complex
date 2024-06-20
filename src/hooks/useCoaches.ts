import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Coach } from "../types";

const fetchCoaches = async () => {
  const response = await axios.get("http://localhost:3000/coaches");
  return response.data === undefined ? [] : response.data;
};

const createCoach = async (coach: Coach) => {
  const response = await axios.post("http://localhost:3000/coaches", coach);
  return response.data;
};

const updateCoach = async (coach: Coach) => {
  await axios.put(`http://localhost:3000/coaches/${coach.id}`, coach);
};

const updateAllCoachesIndividually = async (coaches: Coach[]) => {
  const maxRetries = 6;

  for (const coach of coaches) {
    let success = false;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await updateCoach(coach);
        success = true;
        break;
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error(
            `Failed to update coach ${coach.id} after ${maxRetries} attempts`
          );
        }
      }
    }
    if (!success) {
      throw new Error(`Failed to update coach ${coach.id}`);
    }
  }
};

const removeAllCoaches = async () => {
  await axios.delete("http://localhost:3000/coaches");
};

export const useCoaches = () => {
  return useQuery<Coach[]>("coaches", fetchCoaches);
};

export const useCreateCoach = () => {
  const queryClient = useQueryClient();
  return useMutation(createCoach, {
    onSuccess: () => {
      queryClient.invalidateQueries("coaches");
    },
  });
};

export const useUpdateCoach = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCoach, {
    onSuccess: () => {
      queryClient.invalidateQueries("coaches");
    },
  });
};

export const useUpdateAllCoachesIndividually = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAllCoachesIndividually, {
    onSuccess: () => {
      queryClient.invalidateQueries("coaches");
    },
  });
};

export const useRemoveAllCoaches = () => {
  const queryClient = useQueryClient();
  return useMutation(removeAllCoaches, {
    onSuccess: () => {
      queryClient.invalidateQueries("coaches");
    },
  });
};

const removeCoach = async (id: string) => {
  await axios.delete(`http://localhost:3000/coaches/${id}`);
};

export const useRemoveCoach = () => {
  const queryClient = useQueryClient();
  return useMutation(removeCoach, {
    onSuccess: () => {
      queryClient.invalidateQueries("coaches");
    },
  });
};
