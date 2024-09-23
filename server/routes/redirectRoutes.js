// routes/redirectRoutes.js
import express from "express";
import { findLinkByShortCode } from "../models/linkModel.js";

const router = express.Router();

// Redirect Route
router.get("/:short_code", async (req, res) => {
  const { short_code } = req.params;
  const link = await findLinkByShortCode(short_code);
  if (link) {
    res.redirect(link.original_url);
  } else {
    res.status(404).json({ message: "Link not found" });
  }
});

export default router;
