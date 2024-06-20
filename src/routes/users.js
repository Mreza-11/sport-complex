import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("./db.json");

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get all users
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.users);
});
// Get a single user by ID
router.get("/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});
// Create a new user
router.post("/", (req, res) => {
  const data = readData();
  const newPlayer = { id: Date.now().toString(), ...req.body }; // Generate a new ID
  data.users.push(newPlayer);
  writeData(data);
  res.status(201).json(newPlayer);
});
// Remove all users
router.delete("/", (req, res) => {
  const data = readData();
  data.users = [];
  writeData(data);
  res.json({ message: "All users removed" });
});
// Remove 1 user
router.delete("/:id", (req, res) => {
  const data = readData();
  const userIndex = data.users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  const removedUser = data.users.splice(userIndex, 1);
  writeData(data);
  res.json({ message: "User removed", user: removedUser[0] });
});
// Update a single user
router.put("/:id", (req, res) => {
  const data = readData();
  const userIndex = data.users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  data.users[userIndex] = { ...data.users[userIndex], ...req.body };
  writeData(data);
  res.json(data.users[userIndex]);
});

// Update all users
router.put("/", (req, res) => {
  const data = readData();
  data.users = data.users.map((user) => ({ ...user, ...req.body }));
  writeData(data);
  res.json(data.users);
});

export default router;
