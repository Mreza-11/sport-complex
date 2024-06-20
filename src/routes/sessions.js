import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("./db.json");

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(dbPath));
const writeData = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get all sessions
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.sessions);
});

// Get a session by ID
router.get("/:id", (req, res) => {
  const data = readData();
  const session = data.sessions.find((session) => session.id === req.params.id);
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

// Update a session by ID
router.patch("/:id", (req, res) => {
  const data = readData();
  const sessionIndex = data.sessions.findIndex(
    (session) => session.id === req.params.id
  );
  if (sessionIndex !== -1) {
    data.sessions[sessionIndex] = {
      ...data.sessions[sessionIndex],
      ...req.body,
    };
    writeData(data);
    res.json(data.sessions[sessionIndex]);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

export default router;
