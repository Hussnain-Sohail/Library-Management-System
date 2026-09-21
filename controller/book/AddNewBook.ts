import express from "express";
import type { Request, Response } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Book from "../../model/BookSchema.ts";
import User from "../../model/UserSchema.ts";

const book = zod.object({
    bookName: zod.string(),
    bookPrice: zod.number().min(1),
    totalAvailable: zod.number().min(1),
    Genre: zod.string(),
    imageURL: zod.string(),
    otherInfo: zod.string().optional(),
    userPassword: zod.string(),
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!,
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
            res.status(400).json({ message: "Access forbidden" });
            return;
        }

        const correctPassword = await bcrypt.compare(validBoook.data.userPassword, user.userPassword!);
        if (!correctPassword) {
            res.status(403).json({ message: "Invalid Password" });
            return;
        }

        const uploadedImage = await cloudinary.uploader.upload(validBoook.data.imageURL);
        if (!uploadedImage) {
            res.status(500).json({ message: "Server error. Could not upload Image" });
            return;
        }

        const newBook = new Book({
            bookName: validBoook.data.bookName,
            bookPrice: validBoook.data.bookPrice,
            totalAvailable: validBoook.data.totalAvailable,
            Genre: validBoook.data.Genre,
            otherInfo: validBoook.data.otherInfo ?? "No more relevant information available",
            imageSecureURL: uploadedImage.secure_url,
            imagePublicID: uploadedImage.public_id,
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