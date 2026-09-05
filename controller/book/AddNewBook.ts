import express from "express";
import type { Request, Response } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import Book from "../../model/BookSchema.ts";
import User from "../../model/UserSchema.ts";

const book = zod.object({
    bookName: zod.string(),
    bookPrice: zod.number().min(1),
    totalAvailable: zod.number().min(1),
    userPassword: zod.string(),
});

async function AddNewBook(req: Request, res: Response): Promise<void> {
    try {
        const validBoook = book.safeParse(req.body);
        if (!validBoook.success) {
            res.status(400).json({ message: validBoook.error.issues[0]?.message ?? "Invalid data enetered" });
            return;
        }

        const userID: string = req.body.userID;
        const user = await User.findById(userID);
        if (user === null) {
            res.status(400).json({ message: "User not found" });
            return;
        } else if (user.userRole !== "admin") {
            res.status(400).json({ message: "User role is not admin. Access forbidden" });
            return;
        }

        const correctPassword = await bcrypt.compare(validBoook.data.userPassword, user.userPassword!);
        if (!correctPassword) {
            res.status(403).json({ message: "Invalid Password" });
            return;
        }

        const newBook = new Book({
            bookName: validBoook.data.bookName,
            bookPrice: validBoook.data.bookPrice,
            totalAvailable: validBoook.data.totalAvailable,
        });

        await newBook.save();
        res.status(200).json({ message: "Book addedd successfully" });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default AddNewBook;