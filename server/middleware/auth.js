import jwt from "jsonwebtoken";
import db from "../db/database.js";

export const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If JWT verification fails, check for a session in the database
    const session = db
      .prepare("SELECT * FROM sessions WHERE token = ?")
      .get(token);
    if (session) {
      // Delete the session and attach user info to the request
      db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
      req.user = session;
      next();
    } else {
      // If no session is found, respond with an error
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};
