export interface User {
  id: string;
  fname: string;
  lname: string;
  city: string;
  age: number;
  height: number;
  weight: number;
  username: string;
  password: string;
  sessions: Session[];
}

export interface Coach extends User {
  team: Player[];
  requests: Request[];
}

export interface Player extends User {
  favoriteCoaches: Coach[];
  isFreeAgent: boolean;
}

export interface Session {
  day: string;
  morning: boolean;
  afternoon: boolean;
}

export interface Request {
  date: string;
  source: string; // Coach ID
  destination: string; // Coach ID
}
