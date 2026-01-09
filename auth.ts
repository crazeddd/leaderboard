import { verify } from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express"

const bearerAuth = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.get("Authorization") as string;

    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    const token = auth.slice(7);

    try {
        const payload = verify(
            token,
            process.env.JWT_SECRET as string
        );
        if (!payload || typeof payload === "string" || !payload.id) throw new Error();

        req.body.userId = payload.id;

        next();
    } catch (e) {
        return res.status(401).send({ error: "Invalid token" });
    }
};

export { bearerAuth };