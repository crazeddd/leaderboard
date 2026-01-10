import sqlite3 from "better-sqlite3";

const path = "./app.db";
const db = new sqlite3(path);

console.log("Connected to SQLite database");

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Score {
  user_id: number;
  score: number;
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

db.exec(`CREATE TABLE IF NOT EXISTS scores (
        user_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

export default db;