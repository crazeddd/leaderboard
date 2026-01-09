import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { User } from "../db";
import db from "../db";

export const signup = (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const hashed = bcrypt.hashSync(password, 12);
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, hashed);

        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(400).json({ error: "Username already exists" });
    }
}

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
        const user = stmt.get(username) as User;

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: "30d" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}