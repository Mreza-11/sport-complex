import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("./db.json");

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get all coaches
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.coaches);
});

// Create a new coach
router.post("/", (req, res) => {
  const data = readData();
  const newCoach = { id: Date.now().toString(), ...req.body };
  data.coaches.push(newCoach);
  writeData(data);
  res.status(201).json(newCoach);
});

// Update a coach by ID
router.put("/:id", (req, res) => {
  const coachId = parseInt(req.params.id);
  const data = readData();
  const coachIndex = data.coaches.findIndex((coach) => coach.id == coachId);

  if (coachIndex !== -1) {
    data.coaches[coachIndex] = { ...data.coaches[coachIndex], ...req.body };
    writeData(data);
    res.json(data.coaches[coachIndex]);
  } else {
    res.status(404).json({ message: "Coach not found" });
  }
});
// Update all coaches
router.put("/", (req, res) => {
  const data = readData();
  data.coaches = data.coaches.map((user) => ({ ...user, ...req.body }));
  writeData(data);
  res.json(data.coaches);
});

// Remove all coaches
router.delete("/", (req, res) => {
  const data = readData();
  data.coaches = [];
  writeData(data);
  res.json({ message: "All coaches removed" });
});
export default router;
