// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/links", linkRoutes);
app.use("/", redirectRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
