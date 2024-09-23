// models/userModel.js
import db from "../db/database.js";

// Create Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

export const createUser = async (username, email, password) => {
  const stmt = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  );
  const info = stmt.run(username, email, password);
  return info.lastInsertRowid;
};

export const deleteUser = async (id) => {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  return stmt.run(id);
};

export const findUserByEmail = async (email) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
};

export const findUserById = async (id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(id);
  if (user) {
    // Remove the password from the user object
    const { password, ...userWithoutPassword } = user;

    // Get all links related to the user
    const linkStmt = db.prepare("SELECT * FROM links WHERE user_id = ?");
    const links = linkStmt.all(id);

    // Return user data without password and include their links
    return { ...userWithoutPassword, links };
  }
  return null;
};

export const showAllUsers = async () => {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all();
};

export const createSession = async (token, user_id) => {
  const stmt = db.prepare(
    "INSERT INTO sessions (token, user_id) VALUES (?, ?)"
  );
  return stmt.run(token, user_id);
};

export const deleteSession = async (token) => {
  const stmt = db.prepare("DELETE FROM sessions WHERE token = ?");
  return stmt.run(token);
};

export const showAllSessions = async () => {
  const stmt = db.prepare("SELECT * FROM sessions");
  return stmt.all();
};
