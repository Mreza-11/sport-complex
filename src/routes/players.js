import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("./db.json");

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get all players
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.players);
});
router.get("/:id", (req, res) => {
  const playerId = parseInt(req.params.id);
  const data = readData();
  const player = data.players.find((player) => player.id == playerId);

  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});
// Create a new player
router.post("/", (req, res) => {
  const data = readData();
  const newPlayer = { id: Date.now().toString(), ...req.body }; // Generate a new ID
  data.players.push(newPlayer);
  writeData(data);
  res.status(201).json(newPlayer);
});

// Update a player by ID using PUT
router.put("/:id", (req, res) => {
  const playerId = parseInt(req.params.id);
  const data = readData();
  const playerIndex = data.players.findIndex((player) => player.id == playerId);
  if (playerIndex !== -1) {
    data.players[playerIndex] = { ...req.body, id: playerId }; // Ensure the ID remains the same
    writeData(data);
    res.json(data.players[playerIndex]);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});
// Update all players
router.put("/", (req, res) => {
  const data = readData();
  data.players = data.players.map((user) => ({ ...user, ...req.body }));
  writeData(data);
  res.json(data.players);
});

// Remove all players
router.delete("/", (req, res) => {
  const data = readData();
  data.players = [];
  writeData(data);
  res.json({ message: "All players removed" });
});
export default router;
