// Users Routes
import { Router } from "express";
import {
  findUserById,
  showAllSessions,
  showAllUsers,
} from "../models/userModel.js";
import { auth } from "../middleware/auth.js";
import { findLinksByUserId } from "../models/linkModel.js";

const usersRoutes = Router();

// Todo: remove this fucntions they are only for testing
usersRoutes.get("/", async (req, res) => {
  res.json(await showAllUsers());
});
usersRoutes.get("/sessions", async (req, res) => {
  res.json(await showAllSessions());
});

// Get User by ID
usersRoutes.get("/:id", auth, async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const user = req.user;
  if (user.id != id) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const links = await findLinksByUserId(user.id);
  res.json({
    user,
    links,
  });
});
export default usersRoutes;
