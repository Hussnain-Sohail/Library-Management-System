import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookName: String,
    bookPrice: Number,
    totalAvailable: Number,
    Genre: String,
    otherInfo: String,
    imageSecureURL: String,
    imagePublicID: String,
});

export default mongoose.model("Book", BookSchema);