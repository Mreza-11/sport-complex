import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("./db.json");

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(dbPath));

// Create a new user
router.post("/", (req, res) => {
  const { username, password } = req.body;

  const data = readData();

  const user = data.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ baseData: user });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

export default router;
