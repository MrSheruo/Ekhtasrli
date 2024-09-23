// routes/authRoutes.js

import express from "express";
import bcrypt from "bcrypt";
import {
  createSession,
  createUser,
  deleteSession,
  findUserByEmail,
} from "../models/userModel.js";
import { generateToken } from "../lib/token.js";
import db from "../db/database.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createUser(username, email, hashedPassword);

    // Generate token
    const token = generateToken({ id: userId, username, email });
    await createSession(token, userId);
    res.status(201).json({
      message: "User created successfully",
      user: { id: userId, username, email },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    await createSession(token, user.id);
    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

router.delete("/logout", auth, async (req, res) => {
  const token = req.headers["authorization"];
  const user = req.user;
  try {
    await deleteSession(token);
    res.json({
      message: "Logout successful",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during logout", error: error.message });
  }
});

export default router;
