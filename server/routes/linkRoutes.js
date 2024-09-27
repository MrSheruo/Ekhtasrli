// routes/linkRoutes.js
import express from "express";
import { nanoid } from "nanoid";
import { createLink, getAllLinks } from "../models/linkModel.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/all_links", async (req, res) => {
  const links = await getAllLinks();
  res.json(links);
});

router.post("/shorten", auth, async (req, res) => {
  const { original_url } = req.body;
  const short_code = nanoid(10);
  const user_id = req.user.id;

  const link = await createLink(original_url, short_code, user_id);
  res.status(201).json({ short_code, original_url, link });
});

export default router;
