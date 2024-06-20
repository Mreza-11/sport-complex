import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/users.js";
import playerRoutes from "./src/routes/players.js";
import coachRoutes from "./src/routes/coaches.js";
import sessionRoutes from "./src/routes/sessions.js";
import loginRoutes from "./src/routes/login.js";

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: "*", // Adjust this to your specific origin as needed
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Define your routes here
app.use("/users", userRoutes);
app.use("/players", playerRoutes);
app.use("/coaches", coachRoutes);
app.use("/sessions", sessionRoutes);
app.use("/login", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
