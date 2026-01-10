import { Request, Response } from "express";

import { User, Score } from "../db";
import db from "../db";

export const getScores = (req: Request, res: Response) => {
    const { userId } = req.body;

    const amount = parseInt(req.query.amount as string) || 10;

    if (amount < 1 || amount > 100) {
        return res.status(400).json({ error: "Amount must be between 1 and 100" });
    }

    try {
        const userStmt = db.prepare("SELECT * FROM users WHERE id = ?");
        const user = userStmt.get(userId) as User;

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const stmt = db.prepare("SELECT score FROM scores WHERE user_id = ? ORDER BY score DESC LIMIT ?");
        const scores = stmt.all(user.id, amount) as Score[];

        res.json(scores);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getTopScores = (req: Request, res: Response) => {
    const amount = parseInt(req.query.amount as string) || 10;

    if (amount < 1 || amount > 100) {
        return res.status(400).json({ error: "Amount must be between 1 and 100" });
    }

    try {
        const stmt = db.prepare(`
            SELECT u.username, s.user_id, s.score
            FROM (
                SELECT
                    *,
                    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY score DESC) as rn
                FROM
                    scores
            ) s
            JOIN users u ON s.user_id = u.id
            WHERE
                rn = 1
            ORDER BY s.score DESC
            LIMIT ?;
            `);
        const scores = stmt.all(amount) as Score[];

        res.json(scores);
    } catch (err) {
        console.log(err);
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
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}