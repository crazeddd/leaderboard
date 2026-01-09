import { Request, Response } from "express";

import { User, Score } from "../db";
import db from "../db";

export const getScores = (req: Request, res: Response) => {
    const { userId } = req.body;

    const amount = parseInt(req.query.amount as string) || 10;
    try {
        const userStmt = db.prepare("SELECT * FROM users WHERE id = ?");
        const user = userStmt.get(userId) as User;

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const stmt = db.prepare(`SELECT username, score FROM scores WHERE user_id = ? ORDER BY score DESC LIMIT ${amount}`);
        const scores = stmt.all(user.id) as Score[];
        res.json({ scores });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getTopScores = (req: Request, res: Response) => {
    const amount = parseInt(req.query.amount as string) || 10;

    try {
        const stmt = db.prepare(`SELECT username, score FROM scores ORDER BY score DESC LIMIT ${amount}`);
        const scores = stmt.all() as Score[];
        res.json({ scores });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const submitScore = (req: Request, res: Response) => {
    const { userId, score } = req.body;

    try {
        const userStmt = db.prepare("SELECT * FROM users WHERE id = ?");
        const user = userStmt.get(userId) as User;
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const scoreStmt = db.prepare("INSERT INTO scores (user_id, score) VALUES (?, ?)");
        scoreStmt.run(user.id, score);

        res.status(201).json({ message: "Score submitted" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}