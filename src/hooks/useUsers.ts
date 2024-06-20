import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../types";

const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
};

const createUser = async (user: User) => {
  const response = await axios.post("http://localhost:3000/users", user);
  return response.data;
};

const updateUser = async (user: User) => {
  await axios.put(`http://localhost:3000/users/${user.id}`, user);
};

const updateAllUsersIndividually = async (users: User[]) => {
  const maxRetries = 6;

  for (const user of users) {
    let success = false;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await updateUser(user);
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

const removeAllUsers = async () => {
  await axios.delete("http://localhost:3000/users");
};

export const useUsers = () => {
  return useQuery<User[]>("users", fetchUsers);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useUpdateAllUsersIndividually = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAllUsersIndividually, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useRemoveAllUsers = () => {
  const queryClient = useQueryClient();
  return useMutation(removeAllUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

const fetchUser = async (userId: string) => {
  const response = await axios.get(`http://localhost:3000/users/${userId}`);
  return response.data;
};

export const useUser = (userId: string) => {
  return useQuery<User>(["user", userId], () => fetchUser(userId), {
    enabled: !!userId,
  });
};
