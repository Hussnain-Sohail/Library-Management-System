import jwt, { type JwtPayload } from "jsonwebtoken"
import cookieParser from "cookie-parser"
import type { Request, Response } from "express"

async function NewAccessTokenProvider(req: Request, res: Response): Promise<void> {
    try {
        const refreshToken: string = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(403).json({ message: "Invalid no token" });
            return;
        }

        const validToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
        ) as JwtPayload & { userId: string };

        if (!validToken) {
            res.status(403).json({ message: "Invalid expired or tampered token" });
            return;
        }

        const newAccessToken = jwt.sign(
            { userId: validToken.userId },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '5m' },
        );

        res.status(200).json({ message: '', accessToken: newAccessToken });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default NewAccessTokenProvider;