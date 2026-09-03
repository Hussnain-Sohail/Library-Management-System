import express from "express"
import type { Request, Response } from "express"
import zod from "zod"
import redis from "redis"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { client } from "../server/RedisClient.ts"
import type { IUser } from "../model/UserSchema.ts"
import User from "../model/UserSchema.ts"

const data = zod.object({
    userName: zod.string(),
    userPassword: zod.string(),
});

async function LogIn(req: Request, res: Response): Promise<void> {
    try {

        const validData = data.safeParse(req.body);
        if (!validData.success) {
            res.status(400).json({ message: validData.error.issues[0]?.message ?? "Invalid input" });
            return;
        }

        const key: Promise<string | null> = client.get(validData.data.userName);
        if (key !== null) {
            const totalAttempts: number = Number(key);
            if (totalAttempts >= 3) {
                res.status(403).json({ message: "To many requests. Your'e requests have been blocked\n. Please wait 30 seconds to try again" });
                return;
            }
        }


        client.set(validData.data.userName, 0, { NX: true, EX: 30 });

        const findUser: IUser | null = await User.findOne({ userName: validData.data.userName });

        if (findUser == null) {
            client.incr(validData.data.userName);
            res.status(400).json({ message: "User not found" });
            return;
        }

        const correctPassword: boolean = await bcrypt.compare(validData.data.userPassword, findUser.userPassword);
        if (!correctPassword) {
            client.incr(validData.data.userName);
            res.status(403).json({ message: "Incorrect Password" });
            return;
        }

        const accessToken = jwt.sign(
            { userID: findUser._id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '60s' },
        );

        const refreshToken = jwt.sign(
            { userID: findUser._id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '5m' },
        );

        res.cookie("resfreshToken", refreshToken, { httpOnly: true, maxAge: 5 * 60 });

        res.status(200).json({ message: "Account created successfully", accessToken: accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default LogIn