export interface User {
  id: string;
  role: string; // coach or player admin
  fName: string;
  lName: string;
  city: string;
  age: number;
  height: number;
  weight: number;
  username: string;
  password: string;
  availableSessionIds: string[];
}
export interface Player {
  id: string;
  userId: string; // foreign Key to user
  favoriteCoachIds: string[];
  isFreeAgent: boolean;
  coachId: string | null;
}
export interface Coach {
  id: string;
  userId: string;
  teamName: string;
  teamPlayerIds: string[];
  requestIds: string[];
}

export interface Session {
  id: string;
  day: string;
  isMorning: boolean;
  availablePlayerIds: string[];
  availableCoachIds: string[];
  requestIds: string[];
  isFull: boolean;
}

export interface GraphNode {
  id: string; //userId
  type: string;
  color: string;
  x: number;
  y: number;
}

export interface GraphLink {
  source: string; //userId
  target: string; //userId
  color: string; // if(role == "coach") nodeColors[userId] else nodeColors[coachId]
  description: string; //conflict reason
}

export interface RootState {
  users: User[];
  players: Player[];
  coaches: Coach[];
  sessions: Session[];
}

export interface LoginProps {
  username: string;
  password: string;
}
export interface BasicInfoFormProps {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  handleNextStep: () => void;
}
export interface ChooseSessionsFormProps {
  selectedSessions: string[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<string[]>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}
export interface CoachTeamFormProps {
  teamName: string;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}
export interface SelectFavoriteCoachesFormProps {
  favoriteCoaches: string[];
  setFavoriteCoaches: React.Dispatch<React.SetStateAction<string[]>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}
export interface RoleSelectionFormProps {
  role: "player" | "coach";
  setRole: React.Dispatch<React.SetStateAction<"player" | "coach">>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}
