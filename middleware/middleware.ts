import express from "express"
import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"

async function middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const accessToken: string | undefined = req.headers.authorization;
        if (accessToken === undefined) {
            res.status(403).json({ message: "Access denied" });
            return;
        }

        const token: string | undefined = accessToken.split(' ')[1];
        if (token === undefined) {
            res.status(403).json({ message: "Access denied" });
            return;
        }

        const validToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
        ) as JwtPayload;

        if (!validToken) {
            res.status(403).json({ message: "Access denied" });
            return;
        } else
            next();

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default middleware