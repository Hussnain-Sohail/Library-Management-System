import express from "express"
import type { Request, Response } from "express"
import zod from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import User from "../model/UserSchema.ts"
import type { IUser } from "../model/UserSchema.ts"

const data = zod.object({
    userName: zod.string(),
    userAge: zod.number().min(18),
    userPassword: zod.string(),
});

async function SignUp(req: Request, res: Response): Promise<void> {
    try {
        const valid_data = data.safeParse(req.body);
        if (!valid_data.success) {
            res.status(400).json({ message: valid_data.error.issues[0]?.message ?? "Invalid Input" });
            return;
        }

        const userAlreadyExists = await User.findOne({ userName: valid_data.data.userName });
        if (userAlreadyExists !== null) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(valid_data.data.userPassword, 10);

        const newUser = new User({
            userName: valid_data.data.userName,
            userAge: valid_data.data.userAge,
            userPassword: hashedPassword,
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { userID: newUser._id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '60s' },
        );

        const refreshToken = jwt.sign(
            { userID: newUser._id },
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

export default SignUp