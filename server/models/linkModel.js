// models/linkModel.js
import db from "../lib/database.js";

// Create Links table
db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_code TEXT NOT NULL UNIQUE,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

export const createLink = async (original_url, short_code, user_id) => {
  const stmt = db.prepare(
    "INSERT INTO links (original_url, short_code, user_id) VALUES (?, ?, ?)"
  );
  const info = stmt.run(original_url, short_code, user_id);
  return info;
};

export const findLinkByShortCode = async (short_code) => {
  const stmt = db.prepare("SELECT * FROM links WHERE short_code = ?");
  return stmt.get(short_code);
};

export const findLinksByUserId = async (user_id) => {
  const stmt = db.prepare("SELECT * FROM links WHERE user_id = ?");
  return stmt.all(user_id);
};

export const getAllLinks = async () => {
  const stmt = db.prepare("SELECT * FROM links");
  return stmt.all();
};
