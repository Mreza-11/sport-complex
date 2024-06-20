import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Session } from "../types";

const fetchSessions = async () => {
  const response = await axios.get("http://localhost:3000/sessions");
  return response.data;
};

const createSession = async (session: Session) => {
  const response = await axios.post("http://localhost:3000/sessions", session);
  return response.data;
};

const updateSession = async (session: Session) => {
  await axios.put(`http://localhost:3000/sessions/${session.id}`, session);
};

const updateAllSessionsIndividually = async (sessions: Session[]) => {
  const maxRetries = 6;

  for (const session of sessions) {
    let success = false;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await updateSession(session);
        success = true;
        break;
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error(
            `Failed to update session ${session.id} after ${maxRetries} attempts`
          );
        }
      }
    }
    if (!success) {
      throw new Error(`Failed to update session ${session.id}`);
    }
  }
};

const removeAllsessions = async () => {
  await axios.delete("http://localhost:3000/sessions");
};

export const useSessions = () => {
  return useQuery<Session[]>("sessions", fetchSessions);
};

export const useCreatesession = () => {
  const queryClient = useQueryClient();
  return useMutation(createSession, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
    },
  });
};

export const useUpdatesession = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSession, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
    },
  });
};

export const useUpdateAllsessionsIndividually = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAllSessionsIndividually, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
    },
  });
};

export const useRemoveAllsessions = () => {
  const queryClient = useQueryClient();
  return useMutation(removeAllsessions, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
    },
  });
};

const fetchsession = async (sessionId: string) => {
  const response = await axios.get(
    `http://localhost:3000/sessions/${sessionId}`
  );
  return response.data;
};

export const useSession = (sessionId: string) => {
  return useQuery<Session>(
    ["session", sessionId],
    () => fetchsession(sessionId),
    {
      enabled: !!sessionId,
    }
  );
};
