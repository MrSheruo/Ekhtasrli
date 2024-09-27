// db/database.js
import Database from "better-sqlite3";

const db = new Database("./db/url_shortener.db");

// Enable foreign key constraints
db.exec("PRAGMA foreign_keys = ON");

export default db;
