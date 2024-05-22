import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const coaches = [
  { id: "1", name: "Pep Guardiola", teamName: "Manchester City" },
  { id: "2", name: "Jurgen Klopp", teamName: "Liverpool" },
  { id: "3", name: "Jose Mourinho", teamName: "Roma" },
  { id: "4", name: "Zinedine Zidane", teamName: "Real Madrid" },
  { id: "5", name: "Carlo Ancelotti", teamName: "Everton" },
];

const players = [
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Pele",
  "Diego Maradona",
  "Johan Cruyff",
  "Franz Beckenbauer",
  "Michel Platini",
  "Zico",
  "Garrincha",
  "Romario",
  "Ronaldo",
  "Ronaldinho",
  "Kaka",
  "Thierry Henry",
  "Zinedine Zidane",
  "George Best",
  "Bobby Charlton",
  "Alfredo Di Stefano",
  "Ferenc Puskas",
  "Paolo Maldini",
  "Franco Baresi",
  "Francesco Totti",
  "Andrea Pirlo",
  "Gianluigi Buffon",
  "Roberto Baggio",
  "Rivaldo",
  "Luis Figo",
  "David Beckham",
  "Wayne Rooney",
  "Iker Casillas",
];

const initializeData = async () => {
  for (const coach of coaches) {
    const coachRef = doc(db, "coaches", coach.id);
    await setDoc(coachRef, {
      name: coach.name,
      teamName: coach.teamName,
      team: [],
      requests: [],
    });
  }

  for (let i = 0; i < players.length; i++) {
    const playerRef = doc(db, "players", `player${i + 1}`);
    await setDoc(playerRef, {
      name: players[i],
      team: coaches[Math.floor(i / 6)].teamName,
      sessions: [],
      favoriteCoaches: [],
      isFreeAgent: false,
    });
  }

  console.log("Initial data has been created");
};

initializeData();
